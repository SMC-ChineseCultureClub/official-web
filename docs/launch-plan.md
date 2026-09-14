# 上线待办 · CCC @ SMC 官网

> 目标：一周内上线。当前状态：dev 分支，站点结构完整，**内容 100% 为占位假数据**，仓库与域名均在个人名下。
> 最后更新：2026-09-09

---

## 0. 依赖关系（决定做事顺序）

```
拿到 club 官方账号 access
        │
        ├──► 注册官方 GitHub 账号/org ──► 迁移 repo ──┐
        ├──► 注册域名（需先在 board meeting 定名）──┤
        ├──► 注册托管平台（Vercel）─────────────────┼──► 部署 + DNS
        └──► 注册 GSC ──────────────────────────────┘        │
                                                             ▼
                                          提交 sitemap / 收录（需站点已上线）

并行、不依赖账号：
        · 替换真实信息（等 board 提供素材）
        · UI 确认/优化
        · SEO 代码层（robots、sitemap、OG、JSON-LD）
        · Instagram 链接与嵌入
```

**关键点：** 账号权限是所有对外事项的前置条件，但代码层的活（内容、UI、SEO 标记、Instagram）可以全部先做完，等账号到位后一次性部署。建议把拿 access 作为本周第一优先级去推。

---

## 1. 官方账号 access

要拿到（或至少获得下列各平台的账号权限）：

- [ ] Club 官方邮箱本身的 access（其余账号都以它注册/找回）
- [ ] GitHub（建议注册 **organization** 而非个人账号，见 §2）
- [ ] 域名注册商（Cloudflare Registrar / 备选见 §3）
- [ ] Vercel
- [ ] Google Search Console

**建议一并落实的运维约定**（社团账号的常见坑，届别交接时容易全部丢失）：

- 所有账号统一用 club 官方邮箱注册，**不要**绑定任何个人邮箱/手机
- 2FA 的恢复码放进一个共享密码库（Bitwarden 免费版即可），而不是某个人的手机
- GitHub 用 org + 至少 2 名 owner，避免单点
- 在 docs 里留一份「账号清单 + 谁有权限」，每届交接时更新（**注意：不要把密码本身写进这个 repo**）

---

## 2. 迁移 GitHub repo

当前：`https://github.com/Yinghao-Guan/ccc.git`（个人账号）。

- [ ] 用官方账号建 org（例如 `smc-ccc`），repo 迁到 org 下
- [ ] 迁移方式：GitHub 的 Transfer ownership（保留 issues/history/star），或新建 repo 后 push
- [ ] 迁移后更新本地 remote：`git remote set-url origin <新地址>`
- [ ] 检查 repo 是否设为 public（public 对社团项目更好，也方便未来招 dev）
- [ ] 保留个人 fork 作为备份

顺带清理：

- [ ] `public/CNAME`（内容为 `ccc.peterguan.com`）——这是 GitHub Pages 的产物，迁 Vercel 后应删除
- [ ] `app/layout.tsx:24` 的 `metadataBase` 指向个人域名，需改成新域名

---

## 3. 域名

### 3.1 已调研的候选（价格来自 Namecheap，你提供）

| 域名 | 可注册 | 首年 | 续费 | 备注 |
|---|---|---|---|---|
| `cccsmc.com` | ❌ | — | — | 2018 已被抢注 |
| `smcccc.com` | ✅ | ~$12 | ~$15 | 续费最稳，长期成本最低 |
| `cccsmc.club` | ✅ | ~$2 | ~$21 | 首年便宜，续费贵 |
| `smcccc.club` | ✅ | ~$2 | ~$21 | 同上 |
| `ccc.club` | ⚠️ | $6,500 | — | premium，实际不可行 |
| `ccc.om` | ❌ | — | — | 1989 已被抢注 |

### 3.2 待讨论的补充候选（**可用性与价格均未核实，开会前需查**）

拼写型（更易读、更好口头传播）：
- `smcchineseculture.com` / `.org`
- `chinesecultureclub.org`（若可用，`.org` 对学生社团的观感最正）
- `cccsmc.org` / `smcccc.org`
- `smcccc.net`

短域型：
- `cccsmc.us` / `smcccc.us`（美国 .us，通常便宜且续费稳定）
- `ccc-smc.com`

### 3.3 带去 board meeting 的讨论框架

不要只让大家挑「哪个好看」，把以下几点摆出来会更快达成一致：

1. **续费成本才是长期成本**：`.club` 首年 $2 但续费 ~$21/年，四年总成本约 $65；`smcccc.com` 四年约 $57 且更通用。社团预算是每年都要重新申请的，续费便宜 = 交接时不容易断掉。
2. **口头传播能力**：域名要能在 meeting 上、在 Instagram bio 里被念出来。`smcccc.com` 六个字母对不熟悉的人有点绕，拼写型域名在这点上更好。
3. **和 Instagram handle 的一致性**：现在是 `smc.ccc_`，域名尽量向它靠。
4. **先问一句 SMC**：Student Life 那边是否可能提供 `smc.edu` 下的子域名或至少在官方 club 页面上加外链？如果能拿到 `.edu` 关联，SEO 和可信度都是白赚的。这件事值得在买域名前问，因为可能改变结论。
5. **注册商**：Cloudflare Registrar 按成本价卖、无首年诱饵价、免费 DNS + WHOIS 隐私，长期最省心；缺点是不支持所有 TLD（`.club` 需确认）。Namecheap 作为兜底。

### 3.4 域名定下后

- [ ] 注册 + 开 WHOIS 隐私
- [ ] DNS 指向 Vercel
- [ ] 开启自动续费，并在 club 日历上加一条到期提醒（届别交接的最大风险点）
- [ ] 更新 `metadataBase`、sitemap、GSC property

---

## 4. 托管平台

### 4.1 现状与决策

项目是 Next.js 15 App Router + `output: 'export'`（`next.config.ts`），目前是纯静态导出。Vercel 免费版（Hobby）完全够用，且是 Next.js 的第一方平台。

- [ ] 官方账号注册 Vercel，连接 org 下的 repo
- [ ] 绑定自定义域名（Vercel 自动签 SSL）
- [ ] 确认部署分支策略：`main` = production，`dev` = preview（Vercel 自动给每个 PR/分支 preview URL，对给 board 看效果非常有用）

**注意 Hobby 版的条款：** Vercel 免费版限个人非商业用途。学生社团网站没有商业行为，通常没问题，但如果之后接赞助/卖票，需要重新评估（Pro $20/月，或转 Cloudflare Pages 免费版）。

### 4.2 `output: 'export'` 是否保留？

迁到 Vercel 后可以考虑去掉 `output: 'export'`，收益：

- `next/image` 图片优化可用（对 Gallery 和 officer 照片是实打实的性能收益，现在必须 `unoptimized`）
- 未来加 API routes / 动态内容不用改架构
- ISR、Server Components 的全部能力

代价：不再能一键导出到任意静态托管（锁定度上升，但 Cloudflare Pages 等也支持 Next.js runtime）。

**建议：** 上线第一版先保持静态导出（风险最低），上线稳定后再评估。但**图片这块要先想清楚**——真实照片一进来，未优化的大图会明显拖慢首屏。

### 4.3 Analytics

- [ ] Vercel Web Analytics（免费版有额度，隐私友好、无 cookie banner 需求）
- [ ] 或 Google Analytics 4（数据更细，但需要 cookie/隐私说明）

建议先只开 Vercel Analytics，简单且无合规负担。

### 4.4 未来变动态时的路线（你的设想，记录备查）

- 轻量后端 → App Router 的 Route Handlers，Vercel 一个就够
- 数据库 + Auth → Supabase 免费版
- 重后端 → Render 免费版（注意免费版会休眠冷启动）

这条路线合理。唯一提醒：免费版数据库有不活跃自动暂停策略，社团站流量低，容易踩到，届时需要留意。

---

## 5. 替换真实信息

**这是上线的最大阻塞项**——目前站内没有一条真实信息。详细的逐行清单见 [content-inventory.md](./content-inventory.md)。

### 5.1 需要向 board 收集的东西

- [ ] **Upcoming events**：已知未来两次（约 3 周内）。**需确认再往后的安排**——至少要能填满 Events 区块（当前设计是 1 个 feature + 5 条列表）。如果确实排不出那么多，UI 上要考虑缩减列表条数，而不是编内容。
- [ ] **往期 events + 照片**：Gallery 当前 9 格。需要往期活动的名称、月份、照片。
- [ ] **Officer 照片与授权**：逐个确认是否同意公开露脸。照片统一找 publicity officer 要（她手里已有）。**不同意的人需要一个替代方案**——建议用统一的印章/汉字占位块（现有 `.officer__photo` 的 `corner-cn` 样式可以直接复用），而不是留空白。
- [ ] **重写「关于我们」**：现有文案是编的（包括创始人名字、成立年份）。需要真实的成立时间、创立背景、社团实际在做什么。
- [ ] **真实的会议时间/地点/faculty advisor**
- [ ] **官方邮箱**（现在是编的 `chineseculture.smc@gmail.com`）
- [ ] **确认 Instagram handle**（footer 里是 `smc.ccc_`，需确认是否真实）

### 5.2 内部一致性问题（现在就存在的 bug）

站内几处年份互相矛盾，替换内容时要统一一套：

- Hero：`SINCE MMXXV`（2025 成立）
- About：`Founded ... in 2025`
- Officers 标题：`The 2026 board`
- Footer：`© MMXXVI`（2026）
- **Gallery 里却有 2023、2024 的往期活动** ← 与「2025 成立」直接冲突

需要定：真实成立年份是哪年？往期活动最早到哪年？然后全站对齐。

### 5.3 照片的合规问题

- Officer 照片：已计划逐个征得同意 ✅
- **活动照片同理**：合影里有可识别的学生面孔，公开上网前最好确认 SMC 是否有 photo release 政策，或至少避免使用能清晰辨认非 board 成员的特写。这点容易被忽略，但一旦出问题很麻烦。
- 图片压缩：上传前统一转 WebP、限制宽度（静态导出模式下没有自动优化）

---

## 6. UI 确认 / 优化

### 6.1 main vs dev 的取舍

| | main | dev |
|---|---|---|
| 前两个 transition | 统一，但中间偏空 | 横向 wipe（笔为接缝），更有内容 |
| 一致性 | ✅ 全站统一 | ❌ 前 2 个与后 4 个风格割裂 |
| 顺滑度 | 稳 | 你觉得不够丝滑，但可用 |

**你识别的核心矛盾是对的：** 不能把后面的 transition 也改成同样的横向 wipe（左滑/右滑重复到第 4 次会非常无聊），但 wipe 这个机制本身又只能左右来回。

**出路是换「笔画类型」而不是换「方向」**——这正是 `temp/transition-refactor-plan.md` 里已经写好的方案：把 wipe 抽象成一个通用的 reveal engine，然后每个 transition 用不同的笔法（点/竖/捺/写字），reveal 的几何形状随之不同（圆形晕开、纵向擦除、对角擦除、笔画描绘），这样六个 transition 各不相同但同属一套语汇。

**但要现实一点：一周内上线，这个重构做不完。** 建议：

- **上线版本：二选一，全站统一**
  - 选 main（保守）：风格统一，「空」的问题可以用更轻的手段补——比如 transition 段加一个淡入的汉字/印章，或缩短 spacer 高度让空白感消失
  - 选 dev（激进）：接受前 2 个和后 4 个不一致，先上线，重构留到下个阶段
- **推荐 main + 微调**，理由是第一版官网的首要目标是「信息准确、不出错、能给 board 和新生看」，风格割裂比稍显朴素更伤观感。dev 的 wipe 留在分支上，作为重构的起点。
- [ ] **决策点：上线用哪个分支？** 需要你拍板（或带到 board meeting 看效果对比——Vercel preview URL 正好可以给两个分支各出一个链接给大家投票）

### 6.2 你提到的两个具体担忧

**「中文元素会不会太多」** —— 是个真问题。当前几乎每个区块都同时有：英文标题 + 中文副标题 + 装饰性汉字 + 印章 + 竖排汉字 + 中文 glyph 背景。受众是 SMC 全体学生（多数不读中文），中文过密会从「文化质感」变成「看不懂的噪音」。

建议的减法方向（不改设计语言，只降密度）：
- 每个 section 保留**一处**中文，而不是三处（标题旁的中文副标题保留，装饰性 corner-cn / 背景 glyph 可以按区块交替出现而非每块都有）
- 装饰性汉字降低不透明度，明确让它成为背景纹理而非内容
- [ ] 建议做法：截几张全屏图，把所有中文元素标出来数一遍，再决定砍哪些

**「背景和文字冲突看不清」** —— 需要实测。已知的高风险处：
- Hero 的 `.glyph` 大字背景 + `.hero__wash` 叠在标题下方
- `--ink-faint` (#a89d83) / `--ink-mute` 在浅色 paper 上的对比度大概率不达 WCAG AA（4.5:1）
- `.placeholder-label`、`.event__meta .label` 等小字灰色文本
- ink 主题切换时的过渡瞬间

- [ ] 用浏览器 DevTools 的 contrast checker 或 Lighthouse accessibility 跑一遍，把不达标的 token 调深
- [ ] 移动端单独看一遍（<1024px 走的是无 WebGL 的堆叠布局，和桌面完全不同）

### 6.3 其它 UI 待办

- [ ] 移动端完整走查（当前 breakpoint 契约：≥1024px + fine pointer 才有完整体验）
- [ ] `prefers-reduced-motion` 路径确认可用
- [ ] 真实内容填进去后重新检查布局（假数据的长度和真实内容差别很大，尤其 officer 名字和 event 描述）
- [ ] 加 favicon 之外的 icon 尺寸（apple-touch-icon 等）

---

### 6.4 Officers：15 人怎么排（待验证）

真实 board 有 **15 人**，当前设计只放了 6 张卡。直接扩到 15 会有问题：

- 桌面 3 列 → 5 行，尚可接受
- **移动端单列 → 15 张卡纵向堆叠**，每张（照片 + 姓名 + 职位）约 350–400px，合计约 5000–6000px 纯滚动。Officers 会变成全站最长的一块，而它并不是访客最想看的内容

**做法：先加数据，再决定。** 把 15 个人的真实信息和照片填进去，实际跑一遍桌面 + 手机，再判断。不要提前改设计。

跑完之后按这个顺序考虑：

1. **分层展示（推荐先试）**——Exec board（President / VP / Secretary / Treasurer 等 4–5 人）保留大卡 + 照片；其余 chair / officer 用紧凑列表（姓名 + 职位，无照片，2–3 列排布）。这样既全员上榜，又不让页面失控。同时顺带解决了「不是每个人都愿意露脸」的问题
2. **移动端 2 列小卡**——照片缩小，单行姓名 + 职位
3. **折叠**——默认显示 exec，「View all 15 officers →」展开
4. 保持 15 张大卡（只有在实际看起来不长时才选）

**判断标准：** 在手机上从 Officers 顶部滚到底部，如果超过 4–5 屏，就该换方案。

关联：不同意公开照片的人用统一的汉字/印章占位块（见 [content-inventory.md](./content-inventory.md)）；如果分层展示，这些人自然落到无照片的那一层，问题消失。

---

### 6.5 Hero：加 CTA + 信息重排

**当前 Hero 完全没有 CTA。** 首屏是全站注意力最高的位置，现在只有标题、一句 lede 和三个数字，用户看完不知道该干什么。

#### 要加的

- [ ] **主 CTA：最近一场活动**（例如 `Next: Mid-Autumn Night · Sep 28 →`）
- [ ] **次 CTA：Join us** → Instagram（见 §8）

#### 信息位置对调

现在 Hero 底部是三个数字：`240+ active members` / `14 events per year` / `II years of brewing tea`；而 `Thursdays 11:15AM` / `HSS 151` 埋在 About 中段。

**这个顺序是反的。** 一个学生点进社团网站，第一个问题是「什么时候、在哪、我怎么去」，不是「你们有多少人」。会员数是给已经认可你的人看的虚荣指标，聚会时间地点是让人真的出现的行动信息。

- [ ] Hero 底部三格：`240+ / 14 / II` → **换成 `Thursdays 11:15AM` / `HSS 151` / `Open to all — no dues`**
- [ ] 数字如果还想留，降级到 About 或直接删（真实数字凑不出来时本来就要删，见 content-inventory）

#### 更好的版本：一行 upcoming notice

比三格更强的做法——Hero 里放一行极简通知，代替（或压在）三格位置：

```
NEXT GATHERING  ·  Mid-Autumn Mooncake Night  ·  Thu Sep 28, 7:30 PM  ·  The Quad
```

只要三件事：**干什么 / 什么时候 / 在哪**。不要描述、不要配图。

好处：
- 首屏就给出唯一最有行动价值的信息
- 让站点看起来「有人在维护」——这对社团网站的可信度影响很大
- 天然就是主 CTA，点击滚到 Events

⚠️ **两个必须一起解决的问题，否则会帮倒忙：**

1. **过期风险。** 一行写着「Next: Sep 28」的通知在 10 月还挂着，比没有更糟——直接暴露「这站没人管」。需要明确：谁负责更新、多久一次。建议把这一行的数据和 Events 列表的第一条绑成同一个数据源，改一处即可
2. **没有活动时的兜底。** 活动之间的空档期显示什么？建议退回到常规聚会：`WE MEET  ·  Thursdays 11:15 AM  ·  HSS 151`。任何时候都成立，永不过期

依赖：需要先确认真实的近期活动（见 §5.1）。

---

### 6.6 笔（3D brush）：收缩为「首尾书挡」

> ❌ **已否决。** 所有 section 保留笔和现有的 `data-rest-side` 通道排版。以下内容仅作记录，不再执行。

**问题：** 为了给笔留位置，内容被压到 64% 宽（`globals.css:428–490`），且 `≥1024px` 时多列布局被强制塌成单列——导致 **1440px 桌面版页面高 15191px，比 900px 窄屏版（7328px）还长一倍，布局反而更松散**。为了笔的 transition 加的 6 个 100vh spacer 又贡献了约 5400px 的空滚动。

**代价清单：**

| 项 | 数值 |
|---|---|
| GLB 模型 | 5.4MB（+ 贴图 500KB） |
| 笔相关代码 | 786 行（InkScene 525 / choreography 242 / Transition 19） |
| wipe 管道 | 74 处，散在 StoryShell + globals.css |
| 额外滚动 | ~5400px |
| **<1024px 和 reduced-motion 下的可见性** | **完全不显示** |

最后一行是关键：站点主要入口是 Instagram bio，访客以手机为主，**他们看不到这只笔**——而他们看到的那个版本布局更好。

**根因（回到最初的参考）：** 灵感来自 TreeHacks 2026 的背景旋转元素。那个元素是 **2D、时间驱动（自己一直转）、背景层、只在 Hero 和末屏留位**。本项目升级成了 **3D、滚动驱动、前景层、七个章节全部留位**。

其中「滚动驱动」是 spacer 的直接来源——运动绑定滚动位置，就必须有滚动距离去喂它。**spacer 不是设计选择，是这个技术决定的机械后果。**

**方案：笔收缩为「首尾书挡」**（退回参考的原始形态）

- **Hero 保留笔**——Hero 本来就豁免了通道规则（`[data-rest-side="right"]:not(.hero)`），说明这个组合本来就是成立的
- **Epigraph 保留笔**——rest pose 已是全站最大（`scale: 1.35`）且居中，是唯一的 `data-rest-side="center"`；收尾诗句「**笔**落惊风雨」本身就是写笔的。首尾呼应的结构其实已经埋在现有设计里了
- **中间 5 个章节：取消通道、取消 spacer、内容整宽**，密度对齐 900px 窄屏版
- 中间不渲染 → WebGL 可卸载，滚动性能和电池都省
- GLB 用 Draco/meshopt 压缩（5.4MB → 预计几百 KB）
- 移动端 Hero 放一张**笔的静态 2D 图**（用模型渲一张 PNG，几十 KB），让手机用户也能看到这个标志性元素

**中间为什么不留背景残影（虽然 TreeHacks 是全程都在的）：** 抽象形状可以当背景，具象物体不行。旋转的几何图形会被眼睛归类为纹理；一支认得出笔尖笔杆的毛笔浮在文字后面，永远会被读成「有东西挡着」。

**待办：**
- [ ] 实现书挡版本（大部分是删代码），出 before-after 对比图再合并
- [ ] GLB 压缩
- [ ] 移动端 Hero 静态图

---

### 6.7 Epigraph：署名位置 + 加英文翻译

#### 署名位置要改

当前「— Du Fu, on the weight of a brush」挂在**第二句下方、左对齐于第二句**，并且在窄处折成两行，左边还带一条小竖线。问题：

- 整块本来是左右两句的**对称双联**构图，署名只挂在右半边，把对称打破了，看起来像是只在注释后半句
- 折成两行显得局促、像是没排好，而不是有意为之
- 那条小竖线是个孤立元素，没有呼应

**处理选项（按推荐顺序）：**

1. **去掉署名**——最干净。诗句本身是装饰性收尾，不是引文考据，读者不需要出处也能感受到
2. **居中放在两句下方**——保住对称，但会多一层文字
3. **并入翻译区**——见下，翻译加上去之后署名可以自然融进去，不再是孤立的附加物

#### 两句下方各加英文小字翻译

**这是个好判断。** Epigraph 是全站唯一一处纯中文、零英文的内容，而受众多数不读中文——现在他们只能看到"好看的方块字"，拿不到任何意思。加了翻译，这块才真正对所有人成立。

结构上也顺带解决了署名的问题：两句各配一行译文 → 变成整齐的对称双列 → 署名要么删掉，要么居中收在最下面。

**排版要求：**
- 译文紧贴各自的中文行下方，字号小、字距略开、颜色比正文淡一档——读成「副标题层」，不要读成第二首诗
- 但**不能太淡**：这是非中文读者唯一能读的部分，是内容不是装饰。对比度要过 AA（和 §6.2 的对比度问题一起处理）
- 用 `--serif-body`（Spectral）斜体，与中文的 Noto Serif SC 形成层级差

**译文待定，参考方向：**
> 笔 落 惊 风 雨 ，　→　*When the brush falls, it startles wind and rain;*
> 诗 成 泣 鬼 神 。　→　*when the poem is done, it makes ghosts and spirits weep.*

#### 一个事实性提醒

这两句出自杜甫《寄李十二白二十韵》，是**杜甫写来称赞李白**的。现在的副标题「on the weight of a brush」（论笔之重）是自己编的解读，和原诗语境不符。

如果保留署名，建议：
- 准确版：`— Du Fu, in praise of Li Bai`
- 或最简：`— Du Fu (712–770)`
- 上线前顺手确认一下出处，别让懂行的人挑出错

**待办：**
- [ ] 署名：删除 / 居中 / 并入翻译区——三选一
- [ ] 两句下方加英文译文，确认对比度达标
- [ ] 若保留署名，改成准确表述

---

## 7. SEO

### 7.1 必须先做的一件事 ⚠️

`app/layout.tsx:29` 当前是：

```ts
robots: { index: false, follow: false },
```

**这行会让全站被搜索引擎完全排除。** 上线前必须删掉或改成允许收录，否则后面所有 SEO 工作都是白做。这是目前最容易被漏掉、后果最严重的一处。

### 7.2 代码层

- [ ] 移除/翻转 `robots` 设置
- [ ] `metadataBase` 改为新域名
- [ ] 加 `app/sitemap.ts`（Next 原生支持，静态导出也能生成）
- [ ] 加 `app/robots.ts`
- [ ] 加 OG image（现在 `openGraph` 有 title/description 但**没有图**，分享到 Instagram story / Discord / 群里都是一块空白）——可以用 `app/opengraph-image.tsx` 动态生成，或直接放一张 1200×630 静态图
- [ ] Twitter card 从 `summary` 升到 `summary_large_image`（配合上面的图）
- [ ] 加 JSON-LD 结构化数据：`Organization`（社团信息）+ `Event`（每个活动）。社团站有明确的 events，Event schema 能让活动直接出现在 Google 的活动卡片里，性价比很高
- [ ] 单页站点的 SEO 局限：所有内容在一个 URL 上，只能针对一组关键词。如果之后想让「SMC Chinese club events」这类长尾词单独排名，需要拆出真实路由页面。**第一版不必做，但要知道天花板在这。**

### 7.3 关键词方向

主要要抓的是「找不到我们」的人：`Chinese Culture Club SMC`、`Santa Monica College Chinese club`、`SMC 中文社团`、`SMC Chinese student club`。这些词竞争极低，只要页面被收录、title/h1 里有，基本就能排到前面。

### 7.4 平台层

- [ ] 官方账号注册 GSC，验证域名（DNS TXT 验证最稳，域名注册时顺手做）
- [ ] 提交 sitemap
- [ ] 请 SMC Student Life 在官方 club 页面加一条外链（`.edu` 的外链对这种小站权重很高，而且是免费的）
- [ ] Instagram bio 里放域名（同时也是引流主渠道）

---

## 8. Instagram

Instagram 是社团唯一的共同平台，所以它在站内的权重应该高于邮箱。

### 8.1 你计划的改动（认同）

- [ ] Join 区块的主 CTA 从邮箱改为 Instagram 跳转（`components/Join.tsx:15`）
- [ ] 邮箱降级：放在 Instagram 按钮下方的小字，或只留在 footer
- [ ] Nav 的「Join us」改为 Instagram 链接（`components/Nav.tsx` 的 `.nav__cta`）

一点补充意见：Nav 的 CTA 如果直接跳外链，用户就离开站点了。可以考虑保留 `#join` 锚点（滚到 Join 区块），让 Instagram 跳转发生在 Join 区块里——这样用户先看到「在哪、什么时候、怎么加入」的完整信息，再点出去关注。对新生的转化会更好。**这个可以两种都做出来对比一下。**

### 8.2 要不要 embed Instagram 主页？

想清楚再做，几个现实约束：

- **官方 embed 只支持单条帖子**，不支持「整个主页 feed」。想要 feed 墙必须用第三方（Behold、SnapWidget、Elfsight 等，都有免费档但有 watermark/条数限制），或走 Instagram Basic Display API 自己拉（需要 app review，对社团来说太重）
- 第三方 widget = 引入外部 JS + 第三方 cookie，会拖慢首屏，也可能需要隐私说明
- Instagram 的 embed 样式是白底方块，和现在这套宣纸/水墨的视觉语言**冲突很明显**，硬塞进来会很突兀

**替代方案（建议优先考虑）：** 做一个手动维护的「精选」网格——从 Instagram 挑 6–9 张图，用站内自己的样式（复用 Gallery 的 `.tile`）展示，每张链接到对应帖子，下面放一个「Follow us on Instagram →」。视觉完全统一，零第三方依赖，代价是需要人工更新（对一学期更新一两次的社团站完全可接受）。

- [ ] **决策点：真 embed vs 手动精选网格？** 建议手动网格

---

## 9. 上线前 checklist

- [ ] `robots: { index: false }` 已移除 ⚠️
- [ ] 站内无任何占位/假数据（对照 content-inventory.md 逐条勾掉）
- [ ] 年份、地点、时间全站一致
- [ ] 所有链接可点且正确（Instagram、邮箱、SMC clubs 页）
- [ ] `public/CNAME` 已删除，`metadataBase` 已更新
- [ ] 移动端 + 桌面端 + reduced-motion 三条路径都走查过
- [ ] Lighthouse：performance / accessibility / SEO 都跑一遍
- [ ] 照片已压缩，officer 照片已获授权
- [ ] OG 图存在（用 Instagram DM 给自己发一次链接，看预览卡片）
- [ ] `npm run build` 通过
- [ ] 域名 DNS 生效、HTTPS 正常
- [ ] GSC 已验证并提交 sitemap

---

## 10. 执行顺序（2026-09-10 定）

> ⚠️ **本节只定「先做什么」，不定「具体怎么设计」。**
> 每一步的具体设计——Instagram 用哪种嵌入方式、Officers 15 人用哪种版式、Hero 通知行长什么样等等——**都留到做到那一步时再讨论确认**。现在不预先拍板。

### 当前可做范围

官方账号尚未到手，因此所有依赖账号的事项（GitHub 迁移、域名、Vercel、GSC）全部推迟。

`ccc.peterguan.com` 挂在个人域名下，**当作 preview deployment 使用**。正式域名到位后再统一切换。

**`noindex` 保持不动** —— 预览域名就应该禁止收录，否则会被搜索引擎抓取，日后与正式域名形成重复内容、互相抢排名。这是正确的处置，但因为被推迟了，必须进切换清单（见下）。

---

### 第一阶段 · 结构（纯删代码，不碰内容）

1. ~~**笔收缩**（见 §6.6）——Hero + Epigraph 保留，删掉中间 5 个 spacer 和全部 `data-rest-side` 通道 CSS~~ **已否决**：所有 section 保留笔和通道排版
2. **修固定元素碰撞**——`.story-rail` 与内容重叠（见 §6.2）。通道删除后内容位置会变，所以跟着这一步做。（左侧浮动大字 `.story-ideogram` 在 Events / Board 压住内容，2026-09-13 起这两章不再显示「礼」「会」；挪位、变淡都不理想）
3. **对比度 token 调深**（见 §6.2）

> **为什么必须最先做：** Officers 现在被 `max-width: 64%` 压着且强制降为 2 列。若在此宽度下设计 15 人版式，删掉通道后可用宽度从 ~920px 变为 ~1380px，**需要重做**。
>
> **附带收益：** §6.1「main 还是 dev」的纠结自动消失——保留 dev 的 hero→about 作为全站唯一 set piece，删掉 about→events，「前两个和后面不一致」不复存在，因为只剩一个。

### 第二阶段 · 数据层

4. **events / gallery / officers 抽成数组或数据文件**

> **为什么在粘内容之前：** 15 个 officer 手写 JSX 太痛苦；且 Hero 通知行需要与 Events 第一条**绑同一数据源**（见 §6.5），必须先有数据源。先抽再填只填一次，先填再抽要填两次。

### 第三阶段 · 内容与设计决策

5. **粘真实内容**（见 [content-inventory.md](./content-inventory.md)）
6. **图片流程 + 真实照片** —— ⚠️ 必须在照片进来**之前**定好：`output: 'export'` 下 `next/image` 只能 `unoptimized`，无任何自动优化。需统一 WebP、限制最大宽度、压缩
7. **Officers 版式重新设计**（见 §6.4）—— 此时才做：真实的 15 个人 + 正确的宽度
8. **Hero CTA + 通知行 + 三格信息对调**（见 §6.5）
9. **Epigraph 署名 + 英文翻译**（见 §6.7）
10. **Instagram 区块**（见 §8）

### 第四阶段 · 上线前（代码层现在就能写）

11. **OG 图** —— 不依赖域名。现在分享到任何平台都是空白卡片
12. **JSON-LD 结构化数据**（Organization + Event）—— 不依赖域名，有真实活动后即可写
13. **`sitemap.ts` / `robots.ts`** —— 现在写好，域名切换时与 `noindex` 一起翻
14. **图标补全**（apple-touch-icon 等）

### 全程约束

- **以手机为主视角验收。** 站点主入口是 Instagram bio，移动端是主战场；且 900px 版本本来就是更好的设计。不要做完桌面再顺手看一眼手机
- 每阶段结束跑 `npm run build` 确认类型检查通过

---

### 域名切换清单（拿到正式域名当天一起做）

- [ ] 移除 `app/layout.tsx` 的 `robots: { index: false, follow: false }`
- [ ] `metadataBase` 改为正式域名
- [ ] 删除 `public/CNAME`
- [ ] 撤下 `ccc.peterguan.com` 的 DNS 指向
- [ ] GSC 验证 + 提交 sitemap

> 第一条是全项目单行影响最大的代码。忘了翻 = 前面所有 SEO 工作归零。

---

## 附：仓库现状备注

- `npm run lint` **未配置**，会启动 ESLint 安装向导。类型检查依赖 `npm run build`。
- 无单元测试。
- `CLAUDE.md` 描述了 `npm run parity`、`tests/anchors.spec.ts`、`playwright.config.ts`，但这些在当前工作区**都不存在**（`package.json` 里也没有对应 script）。文档与实际已经漂移，需要时补回或修正 CLAUDE.md。
- `temp/`、`.claude/`、`CLAUDE.md`、`AGENTS.md` 均在 `.gitignore` 中——`temp/transition-refactor-plan.md` 只存在于本地，**换机器/换人接手会丢失**。如果这个重构方案要保留，应移到 `docs/` 下并纳入版本管理。
- 无 CI/CD 配置（无 `.github/`），当前部署方式为手动。
