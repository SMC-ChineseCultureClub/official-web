# Instagram 嵌入 —— 技术参考

**状态：已使用**，嵌在 Join 区（`components/InstagramEmbed.tsx`）。
本文档记录它参照的 SMC CS Club（[smccs.club](https://smccs.club)）实现，以及我们在其基础上修掉的两个问题。

调研日期 2026-09-12，来源：`~/Documents/SMC/clubs/csClub/smcCSofficialwebsite/`，
并在 smccs.club 线上实地验证过。

---

## 结论速览

| 项 | 结果 |
|---|---|
| 技术 | Meta 官方 `embed.js`，客户端注入 |
| 费用 | 免费 |
| Token / API key | **不需要**，仓库里没有任何凭据 |
| 会过期吗 | 不会，无需定期刷新 |
| 静态导出兼容 | ✅ 完全兼容，无需服务端 / API route / 环境变量 |
| 体积 | 实测 34KB，`async` 加载，不阻塞渲染 |
| 渲染尺寸 | 实测 **540 × 581 px**，白底、3px 圆角 |
| 能改样式吗 | ❌ 跨域 iframe，一个像素都改不了 |

---

## 实现方式

单个自包含组件，没有任何框架耦合（CS Club 用的是 React 19 + Vite，
但组件本身只依赖 `useEffect` / `useRef` / `useState`）。

**核心逻辑：** 挂载时动态注入 `https://www.instagram.com/embed.js`，
加载完成后调用 `window.instgrm.Embeds.process()` 把页面上的
`<blockquote class="instagram-media">` 替换成真正的 iframe。

```jsx
'use client'   // ← Next.js App Router 需要加这行

useEffect(() => {
  let retryCount = 0
  let retryTimer

  const processEmbed = () => {
    if (window.instgrm) window.instgrm.Embeds.process()
  }

  // embed.js 有时不会一次成功，重试 3 次后降级
  const retryProcess = () => {
    retryTimer = setTimeout(() => {
      retryCount++
      if (embedRef.current?.querySelector('iframe')) return   // 成功了
      if (retryCount < 3) { processEmbed(); retryProcess() }
      else setEmbedFailed(true)
    }, 2000)
  }

  if (window.instgrm) { processEmbed(); retryProcess() }
  else {
    const script = document.createElement('script')
    script.src = 'https://www.instagram.com/embed.js'
    script.async = true
    script.onload  = () => { processEmbed(); retryProcess() }
    script.onerror = () => setEmbedFailed(true)
    document.body.appendChild(script)
  }

  return () => clearTimeout(retryTimer)
}, [])
```

**被替换的占位标签：**

```jsx
<blockquote
  className="instagram-media"
  data-instgrm-permalink="https://www.instagram.com/csclub.smc/"
  data-instgrm-version="14"
  style={{ background:'#FFF', border:0, borderRadius:'12px',
           margin:'0 auto', maxWidth:'540px', width:'100%', padding:0 }}
/>
```

**降级兜底**（`embedFailed` 为 true 时）：一个指向 IG 主页的纯文字链接。
容器上加 `min-height: 300px` 预留空间，减少布局抖动。

---

## 几个必须知道的坑

**1. `data-instgrm-permalink` 指向的是主页，不是单条帖子。**
Meta 官方文档只支持**单条 post / reel 的永久链接**，主页地址并不是文档化的用法。
代码里那圈重试 + 降级逻辑八成就是为此而写的。

不过 2026-09-12 我在 smccs.club 实地验证：**它确实能渲染**，
iframe 的 src 是 `https://www.instagram.com/csclub.smc/embed/?cr=1&v=14&...`。
所以这是一个**未公开但当前可用**的行为——Meta 哪天收掉就没了，别把它当稳定 API。

**2. 它不是 feed，只是一个卡片。**
581px 的高度换来的信息量约等于一张图。CS Club 那一节整体撑到 1020px。

**3. 样式完全无法控制。**
跨域 iframe，Meta 自己的白底、自己的字体、自己的圆角。
对本站（宣纸米色 + 水墨 + 衬线体）来说这会是全站唯一一块「不是自己设计的」区域。

**4. 常被拦截。**
Safari ITP、Firefox ETP、各类广告拦截插件都会拦 `embed.js`。
被拦的访客看到的是那行降级文字链接——**设计代价全付了，却不保证人人可见**。

**5. 换展示哪条帖子要改代码。**
permalink 硬编码在源码里，换一条就得改代码 + 重新部署。

---

## 决策经过（2026-09-12）

最初决定**不用**，理由有一条是错的：以为 embed 只显示一条帖子。
实际上一次新鲜请求会返回主页卡片 + **2×3 共 6 条最新帖子**（头像 88×88，缩略图 238×238），
hover 与点击跳转均正常。纠正后改为采用。

但对照实验同时发现：**同一链接几分钟内从 7 张图降到只剩头像**——Instagram 会对未登录请求限流。
所以实现上做了以下处理：

- **放在 Join 区内，不单独成节。** Join 的主按钮本身就指向 IG，嵌入只是锦上添花，价值不全押在 iframe 上。
- **懒加载。** 只有滚动接近时才加载 `embed.js`，没看到这里的访客不会被交给 Meta。

## 相比 CS Club 实现修掉的两个问题

**1. 重试逻辑的判定条件错了。**
原实现把「iframe 存在」当作成功。但限流时 Instagram 照样建 iframe，只是不送内容，
高度停在约 2px（实测持续 20 秒不变）——降级兜底因此永远不会触发，访客看到空框。
改为检查渲染高度（阈值 120px）。

**2. React 与 embed.js 抢 DOM。**
embed.js 会**替换**掉 `<blockquote>`，若该节点由 React 渲染，之后任何重渲染都会去协调一个已不存在的节点，
控制台实测报错 `NotFoundError: Failed to execute 'removeChild' on 'Node'`。
改为 React 只渲染一个空 div，由 effect 手动插入 blockquote——React 从不拥有该节点。
