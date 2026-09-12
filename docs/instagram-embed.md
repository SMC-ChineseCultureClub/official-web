# Instagram 嵌入 —— 技术参考

**状态：当前站点不使用。** 本文档记录 SMC CS Club（[smccs.club](https://smccs.club)）的实现方式，
以便将来需要时直接照抄，不用重新调研。

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

## 当初为什么没用（2026-09-12 决定）

不是技术做不到——上面证明了完全可行且免费。是三条设计理由：

1. 白色 iframe 和本站视觉体系冲突，且无法调整
2. 581px 高度只换来一张图的信息量，同样空间放三张自己的活动照片更值
3. 依赖未公开行为 + 常被拦截，可靠性不足以支撑它占据的版面

**替代方案：** 把 Instagram 做成 Join 区的主 CTA。
达成的目标一样（把人送到 IG），但零第三方脚本、零布局风险、零维护，
而且按钮能用自己的字体和印章红来设计。

## 将来什么情况下值得重新考虑

- 想展示的是**多条**内容，且愿意接受 Meta 的视觉风格
- 或 Meta 推出了可控样式的官方方案
- 或改用服务端 / 构建时抓取，把内容烘进静态产物，自己排版
  （需要 Graph API token，会过期，要维护——本站是纯静态导出，
  只能在构建时抓，意味着内容只在每次部署时更新）
