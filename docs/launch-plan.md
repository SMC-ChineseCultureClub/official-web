# 上线待办 · CCC @ SMC 官网

> 当前状态：`dev` 分支，**站内内容已全部换成真实信息**（Gallery / Board 的照片是 IG 截图演示版）。
> `ccc.peterguan.com` 作为预览站使用，`noindex` 保持开启。
> 剩下的主要是**依赖官方账号/域名的事**、**换原图**、以及几项可选优化。
> 最后更新：2026-09-14

---

## 0. 还剩什么（总览）

| 类别 | 事项 | 阻塞于 |
|---|---|---|
| 账号 / 域名 / 托管 | §1–§4 全部 | 拿到 club 官方账号 access |
| 照片 | Gallery 9 张、Board 15 张换原图（§5.2） | 向 board / publicity 要原图 |
| SEO | JSON-LD（§6.2）、GSC 与外链（§6.3） | JSON-LD 不阻塞；GSC 需域名 |
| 性能 | 字体阻塞渲染、HDR 环境图（§7） | 不阻塞，暂保持现状 |
| 走查 | 手机完整走查、reduced-motion 路径（§8） | 不阻塞 |

依赖关系：

```
拿到 club 官方账号 access
        │
        ├──► 官方 GitHub org ──► 迁移 repo ──┐
        ├──► 注册域名（board meeting 定名）──┤
        ├──► 注册 Vercel ────────────────────┼──► 部署 + DNS ──► 域名切换清单（§9）
        └──► 注册 GSC ───────────────────────┘                    │
                                                                    ▼
                                                     提交 sitemap / 收录
```

---

## 1. 官方账号 access

- [ ] Club 官方邮箱本身的 access（其余账号都以它注册/找回）
- [ ] GitHub（建议注册 **organization** 而非个人账号，见 §2）
- [ ] 域名注册商（Cloudflare Registrar / 备选见 §3）
- [ ] Vercel
- [ ] Google Search Console

**建议一并落实的运维约定**（届别交接时最容易丢）：

- 所有账号统一用 club 官方邮箱注册，**不要**绑定个人邮箱/手机
- 2FA 恢复码放进共享密码库（Bitwarden 免费版即可），不放某个人的手机
- GitHub org 至少 2 名 owner，避免单点
- docs 里留一份「账号清单 + 谁有权限」，每届交接时更新（**不要把密码写进 repo**）

---

## 2. 迁移 GitHub repo

当前：`https://github.com/SMC-ChineseCultureClub/official-web.git`（org，public）。**已完成。**

- [x] 用官方账号建 org（`SMC-ChineseCultureClub`），repo 迁到 org 下
- [x] 迁移方式：GitHub 的 Transfer ownership（57 个 commit + 3 个分支 + PR 全部保留）
- [x] 迁移后更新本地 remote
- [x] repo 设为 public，默认分支 `main`
- [x] 仓库改名 `offical-web` → `official-web`
- [x] 清掉 repo Website 字段里的旧 Vercel 地址（上线后填正式域名）
- [x] `Yinghao-Guan` 对该 repo 有 Admin 权限
- [x] org 两名 owner：官方账号 + `Yinghao-Guan`
- [ ] 保留个人 fork 作为备份

暂缓（目前只有一名维护者，等有第二个人参与时再做）：

- [ ] 建 `web` team，用 team 授权代替逐仓库授权
- [ ] `main` 分支保护 ruleset（禁止直接 push，强制走 PR）
- [ ] org Settings → Member privileges：Base permissions 保持 Read，限制建仓库权限

---

## 3. 域名

### 3.1 已调研的候选（价格来自 Namecheap）

| 域名 | 可注册 | 首年 | 续费 | 备注 |
|---|---|---|---|---|
| `cccsmc.com` | ❌ | — | — | 2018 已被抢注 |
| `smcccc.com` | ✅ | ~$12 | ~$15 | 续费最稳，长期成本最低 |
| `cccsmc.club` | ✅ | ~$2 | ~$21 | 首年便宜，续费贵 |
| `smcccc.club` | ✅ | ~$2 | ~$21 | 同上 |
| `ccc.club` | ⚠️ | $6,500 | — | premium，不可行 |
| `ccc.om` | ❌ | — | — | 1989 已被抢注 |

### 3.2 待讨论的补充候选（**可用性与价格均未核实**）

- 拼写型：`smcchineseculture.com` / `.org`、`chinesecultureclub.org`、`cccsmc.org` / `smcccc.org`、`smcccc.net`
- 短域型：`cccsmc.us` / `smcccc.us`、`ccc-smc.com`

### 3.3 带去 board meeting 的讨论框架

1. **续费成本才是长期成本**：`.club` 首年 $2 但续费 ~$21/年，四年约 $65；`smcccc.com` 四年约 $57 且更通用
2. **口头传播能力**：要能在 meeting 上、Instagram bio 里被念出来
3. **和 Instagram handle（`smc.ccc_`）一致**
4. **先问 SMC Student Life**：能否提供 `smc.edu` 子域名，或至少在官方 club 页面加外链
5. **注册商**：Cloudflare Registrar（成本价、免费 WHOIS 隐私）优先，Namecheap 兜底

### 3.4 域名定下后

- [ ] 注册 + 开 WHOIS 隐私
- [ ] DNS 指向 Vercel
- [ ] 开启自动续费，并在 club 日历上加到期提醒（届别交接的最大风险点）
- [ ] 执行 §9 域名切换清单

---

## 4. 托管平台

项目是 Next.js 15 App Router + `output: 'export'`（纯静态导出）。当前 `ccc.peterguan.com` 手动部署到 GitHub Pages。

- [ ] 官方账号注册 Vercel，连接 org 下的 repo
- [ ] 绑定自定义域名（Vercel 自动签 SSL）
- [ ] 部署分支策略：`main` = production，`dev` = preview（每个分支/PR 自动出 preview URL）
- [ ] Analytics：建议先只开 Vercel Web Analytics（无 cookie、无合规负担）

**Hobby 版条款：** 限个人非商业用途。社团站通常没问题；以后接赞助/卖票需重新评估（Pro $20/月，或转 Cloudflare Pages）。

**`output: 'export'` 是否保留：** 第一版保留（风险最低）。迁 Vercel 稳定后可评估去掉，换来 `next/image` 自动优化；现在图片靠手动转 WebP + 限宽。

**未来变动态的路线（备查）：** Route Handlers → Supabase 免费版（注意不活跃自动暂停）→ 重后端再考虑 Render。

---

## 5. 内容

所有文案/数据的位置见 [content-inventory.md](./content-inventory.md)。

### 5.1 待定

（无）

### 5.2 上线前换原图 ⚠️

两批照片都是 2026-09-14 为 board meeting 演示从 Instagram 截图裁出来的，分辨率有限。**同名替换即可**（WebP、长边 ≤1600px）。

- [ ] **Gallery 9 张** → `public/gallery/*.webp`；同时核对 `components/Gallery.tsx` 顶部 `archive` 里每张的活动名和年月（按 IG 发帖时间估的，Lantern Festival 最可疑）
- [ ] **Board 15 张** → `public/board/*.webp`；上层三位（President / VP / ICC Delegate）最需要原图

### 5.3 已完成（记录）

- **Events**：真实秋季日程，数据在 `lib/events.ts`；过期活动按访客当天日期自动隐藏；Hero CTA 与 Events 大卡片同一数据源（原 §5.1 / §6.5）
- **About**：一句 lead + 四格活动 + 结尾，定位为交朋友的 social club（原 §5.1）
- **Gallery**：9 张真实活动图（演示版，见 §5.2）
- **Board**：President / VP / ICC Delegate 三张大卡 + 12 人头像墙 + 底部社团邮箱，不公开个人邮箱；每人点击跳到自己的 IG 介绍帖（原 §6.4）
- **Hero 英文副标题**：「— culture, shared among friends.」（2026-09-14，分享预览图已同步重截）
- **Join**：标题 + 一行时间地点 + Instagram embed；指导老师不在页面显示（原 §8）
- **Epigraph**：苏轼「但愿人长久，千里共婵娟」，每句下方英文译文，无署名（原 §6.7）
- **全站一致性**：成立 2025、会议 every other Thursday 11:15 AM–12:30 PM、HSS 252、社团邮箱与 Instagram 已确认有效
- **照片合规**：Gallery / Board 照片均来自社团公开 Instagram，预览站只发给 board

---

## 6. SEO

### 6.1 代码层（已完成）

- `lib/site.ts` 集中放 `SITE_URL` 和 `ALLOW_INDEXING`：`layout.tsx` 的 robots meta、`app/robots.ts`、`app/sitemap.ts` 都读它
- 搜索描述与分享卡片文案改为真实定位（原先写的 tea ceremonies 等是编的）
- 分享预览图：`app/opengraph-image.jpg` / `app/twitter-image.jpg`，1200×630，截自 Hero（隐藏了带日期的 CTA、进度条、导航链接）；Twitter card 为 `summary_large_image`
- 图标：`apple-touch-icon.png`（180）、`icon-192.png`、`icon-512.png`、`app/manifest.ts`

### 6.2 代码层（未做）

- [ ] **JSON-LD**：`Organization` + `Event`。Event 可直接从 `lib/events.ts` 生成，活动可能进 Google 活动卡片
- 单页站点的天花板：所有内容在一个 URL，想让长尾词单独排名需拆路由。**第一版不做。**

关键词方向：`Chinese Culture Club SMC`、`Santa Monica College Chinese club`、`SMC 中文社团`。竞争极低，被收录即可排前。

### 6.3 平台层（需域名）

- [ ] GSC 验证域名（DNS TXT）+ 提交 sitemap
- [ ] 请 SMC Student Life 在官方 club 页面加外链
- [ ] Instagram bio 放域名

---

## 7. 性能（Lighthouse，2026-09-14，本地静态服务器）

| | Performance | Accessibility | Best Practices | SEO |
|---|---|---|---|---|
| 手机 | 58 → **76** | **100** | 100 | 66（noindex，预期内） |
| 桌面 | 51 | **100** | 100 | 66（同上） |

已做：
- 笔模型 meshopt + WebP 压缩（5.7MB → 595KB）
- 对比度 token `--ink-mute` 调深到 5.0:1
- **手机不再下载 three.js**：`BrushScene` 先判断媒体查询，只在桌面动态 import `InkScene`。首页 First Load JS 396 kB → 116 kB；手机 FCP 7.4s → 2.4s，LCP 15.4s → 5.5s

本地测试用的 Python 服务器不压缩，Lighthouse 报的 ~1MB「text compression」在 Vercel / GitHub Pages 上不存在。剩下两项（2026-09-14 决定暂保持现状）：

- [ ] **HDR 环境贴图**：drei 的 `Environment` preset 在运行时从 `raw.githubusercontent.com` 拉 1.6MB 的 `.hdr`（桌面）。改为自托管一张小尺寸的，或用 Lightformer 代替；需要对比笔的质感
- [ ] **Noto Serif SC 字体 CSS 阻塞渲染**：Google Fonts 的样式表是同步加载的，手机 LCP 仍有 5.5s（LCP 元素是 Hero 背景的「国」字）。可改为非阻塞加载

---

## 8. 走查

- [x] 桌面 1440 / 手机 375：About、Events、Gallery、Board 已逐节看过
- [ ] 手机从头到尾完整滑一遍（Hero、Join、Epigraph、Footer 还没专门看）
- [ ] `prefers-reduced-motion` 路径完整走一遍
- [ ] 空格 / Page Down 在桌面可能停在 transition spacer 中间（scroll snap 试过后已撤回，暂不处理）

### 已完成 / 已否决（记录）

- ~~§6.1 上线用 main 还是 dev~~：dev 即上线版本，不再讨论
- ~~§6.6 笔收缩为「首尾书挡」~~：**已否决**，所有 section 保留笔和 `data-rest-side` 通道排版
- ~~Scroll snapping~~：试做后撤回（手感不理想）；导航栏点击滚动改为 0.7–1.4s、快起步长减速
- 中文密度：About 的竖排诗卡片、Gallery / Board 的角落装饰字、Events / Board 的左侧浮动大字已去掉
- `.story-rail` 与内容重叠：Gallery 右侧加了对称缩进；其余 section 在 64% 通道内不会碰到
- Hero「墨」与竖排「中国文化社」重叠：**有意为之**，不改

---

## 9. 上线前 checklist

- [ ] §5.2 两批照片换成原图
- [ ] §8 手机完整走查 + reduced-motion 走查
- [ ] 所有链接可点且正确（Instagram、邮箱、SMC clubs 页 —— 2026-09-14 已验证可访问）
- [ ] 用 Instagram DM 给自己发一次正式域名链接，确认分享预览卡片正常
- [ ] `npm run build` 通过（2026-09-14 已通过）
- [ ] 执行下方域名切换清单

### 域名切换清单（拿到正式域名当天一起做）

- [ ] `lib/site.ts`：`SITE_URL` 改为正式域名，`ALLOW_INDEXING` 改为 `true` ⚠️（这一个开关同时控制 robots meta、robots.txt、sitemap 引用）
- [ ] 删除 `public/CNAME`
- [ ] 撤下 `ccc.peterguan.com` 的 DNS 指向
- [ ] GSC 验证 + 提交 sitemap

> `ALLOW_INDEXING` 是全项目影响最大的一行。忘了翻 = 搜索引擎永远收录不到。

---

## 附：仓库现状备注

- `npm run lint` **未配置**（会启动 ESLint 安装向导）。类型检查用 `npx tsc --noEmit`。
- **不要在 `npm run dev` 运行时跑 `npm run build`**：两者共用 `.next`，dev server 会坏掉。
- 无单元测试、无 CI/CD（无 `.github/`），当前部署为手动。
- `temp/`、`.claude/`、`CLAUDE.md`、`AGENTS.md` 在 `.gitignore` 中。`temp/` 里有 IG 原始截图（`gallery-raw/`、`board/`）和 `transition-refactor-plan.md`，只存在于本地。
