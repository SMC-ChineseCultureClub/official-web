# 占位内容清单

站内**当前没有一条真实信息**。本文件逐文件列出所有需要替换的内容，以及为此需要向 board 收集的素材。

行号已对照 dev 分支当前代码逐条核对（2026-09-10，brush 改动回退后）。

---

## 全站一致性：先定这几个数

替换前先确定，否则会改出互相矛盾的内容：

| 项 | 当前站内的说法 | 真实值 |
|---|---|---|
| 社团成立年份 | 2025（Hero 17、About 33、**Nav 129**、Footer 5 的 MMXXVI）| ❓ |
| 当前 board 届别 | 2026（Officers 标题）| ❓ |
| Copyright 年份 | MMXXVI = 2026（Footer）| ❓ |
| 最早的往期活动 | 2023（Gallery）← **与「2025 成立」矛盾** | ❓ |
| 固定会议时间 | Thursdays 11:15 AM–12:30 PM | ❓ |
| 固定会议地点 | HSS 151（Events 里又出现过 HSS 152）| ❓ |
| 官方邮箱 | chineseculture.smc@gmail.com | ❓ |
| Instagram handle | smc.ccc_ | ❓ 待确认 |
| Faculty advisor | Li Lei & Han Meimei（明显是占位）| ❓ |

---

## `app/layout.tsx`

| 行 | 当前 | 处理 |
|---|---|---|
| 24 | `metadataBase: 'https://ccc.peterguan.com'` | 改为新域名 |
| 29 | `robots: { index: false, follow: false }` | ⚠️ **必须移除**，否则全站不被收录 |
| 26–28 | description 提到 tea ceremonies / calligraphy / Lunar New Year | 确认是否符合社团实际活动 |
| — | 无 OG image | 补 1200×630 图 |

---

## `components/Nav.tsx`

⚠️ 上一版清单**整份漏掉了 Nav**——它是全站每一屏都可见的组件。

| 行 | 当前 | 处理 |
|---|---|---|
| 129 | `SANTA MONICA COLLEGE · EST. 2025` | ⚠️ 第四处成立年份。最容易漏改的一处，因为它在 nav 里、不在任何 section 内 |
| 134–137 | About / Events / Archive / Board | 若因内容不足删掉某个 section（例如 Events），导航项要同步删 |
| 140 | `Join us` → `#join` | 若主 CTA 改为 Instagram，这里和 Events 里 6 处 `href="#join"` 一起改 |

---

## `components/Hero.tsx`

| 行 | 当前 | 需要 |
|---|---|---|
| 17 | `A STUDENT SOCIETY SINCE MMXXV` | 真实成立年份 |
| 39–43 | 「the slow art of Chinese culture — tea poured carefully, ink set against paper...」 | 这段 lede 是编的，需要能代表社团真实调性的一句话 |
| 49 | `240+ active members` | ⚠️ 真实人数。编造会员数是最容易被拆穿也最伤信誉的 |
| 50 | `14 events / year` | 真实年活动数 |
| 51 | `II years of brewing tea` | 真实年数 |

> 如果三个数字里有凑不出来的，建议整块换成别的（例如「Founded 2025 / Open to all majors / No dues」），而不是留个假数字。

---

## `components/About.tsx`

| 行 | 当前 | 需要 |
|---|---|---|
| 16–20 | about lead 段落 | 重写（你已列为待办） |
| 22 | `Founded by Songyi Yu in 2025` | ⚠️ 真实创始人姓名 + 年份。人名必须核实并征得同意 |
| 22–27 | 「借来的厨房办春节」「中秋切八块月饼」等具体细节 | 全部是编的，替换成真实发生过的事 |
| 34 | `HSS 151` | 真实地点 |
| 35 | `Thu 11:15AM` | 真实时间 |
| 33 | `2025 Established` | 同上 |

---

## `components/Events.tsx`

**结构：** 1 个 feature 大卡 + 5 条列表。目前只确认了未来 2 次活动，缺口较大。

### Feature 卡（Lunar New Year Gala）

| 行 | 当前 | 需要 |
|---|---|---|
| 22 | `Headline event · February` | — |
| 24–26 | Lunar New Year Gala & Banquet | 确认是否真的有这个活动 |
| 30–33 | 「200 人长桌、舞狮、手写春联」 | 全是编的 |
| 35–37 | `Sat · 14 Feb`、`Cafeteria`、`Free · RSVP` | 真实日期/地点/报名方式 |
| 39 | CTA 链接到 `#join` | 若改为 Instagram，此处也要改 |
| 15 | 图片占位 `photograph · lantern courtyard` | 真实照片 |

### 列表 5 条（全部为假）

| 行 | 活动 | 日期 |
|---|---|---|
| 47–63 | Mid-Autumn Mooncake Night | 28 September |
| 65–79 | Calligraphy at Dusk（含虚构的 `Prof. L. Li`）| 12 October |
| 81–95 | A Long Table for Hot Pot（Haidilao @ Century City）| 02 November |
| 97–111 | Tea Ceremony & Quiet Hour | 21 November |
| 113–125 | Winter Film Screening — In the Mood for Love | 06 December |

**处理建议：** 先填已确认的 2 场。剩余槽位有三种做法，按优先级：
1. 向 events chair 要本学期后续计划（最好）
2. 只显示已确认的活动，UI 上把列表改成自适应条数（需要小改 CSS）
3. 加一条「More gatherings announced on Instagram →」引导关注

**不要**保留任何一条编造的活动上线——学生按假日期跑来是实际伤害。

---

## `components/Gallery.tsx`

9 个 tile，全部为占位。每格需要：照片 + 活动名 + 月份/年份。

| 行 | 占位说明 | 标题 / 日期 |
|---|---|---|
| 17–25 | dumpling kitchen | Lunar New Year, MMXXV / Feb '25 |
| 27–35 | calligraphy hands | Brushwork at HSS 152 / Oct '24 |
| 37–45 | the long table | Hot Pot Night / Nov '24 |
| 47–55 | mooncakes & tea | Mid-Autumn / Sep '24 |
| 57–65 | concourse hall, gala | Gala & Banquet / Feb '24 |
| 67–75 | couplet, red paper | Spring Couplets / Jan '24 |
| 77–85 | tea ceremony | Tea, Quiet Hour / May '24 |
| 87–95 | lion dance | Lion Dance Visitors / Feb '23 |
| 97–105 | zongzi making | Dragon Boat / Jun '23 |

⚠️ 日期跨 2023–2025，与「2025 成立」冲突，必须一起修正。

**照片处理：**
- 若真实照片不足 9 张，减少 tile 数量（grid 布局需相应调整），不要留占位
- 上传前压缩为 WebP，限制最大宽度（静态导出模式下 `next/image` 需 `unoptimized`，没有自动优化）
- 注意合影中非 board 成员的肖像权

---

## `components/Officers.tsx`

| 行 | 当前 | 需要 |
|---|---|---|
| 9 | `The 2026 board` | 确认届别写法 |
| 13–29 | President — **Lei Li / 李雷** | ⚠️ 占位人名 |
| 31–47 | Vice President — **Meimei Han / 韩梅梅** | ⚠️ 占位（教科书人物）|
| 49–65 | Secretary — **San Zhang / 张三** | ⚠️ 占位 |
| 67–83 | Treasurer — **Si Li / 李四** | ⚠️ 占位 |
| 85–101 | Events Chair — **Wu Wang / 王五** | ⚠️ 占位 |
| 103–119 | Cultural Chair — **Liu Zhao / 赵六** | ⚠️ 占位 |

每人需要：英文名、中文名（可选）、职位、专业/年级（可选）、照片（需授权）。

**注意：**
- 实际 board 的职位构成可能与这 6 个不同（比如有 publicity officer，这里就没有），结构需按真实情况调整
- 不同意露脸的人：用统一的汉字/印章占位块代替（复用 `.officer__photo` 的 `corner-cn`），不要留空
- 中文名和「专业/年级」都属于个人信息，逐个确认是否愿意公开
- 每年换届都要更新——考虑把这份名单抽成一个数组常量并在文件顶部注明「每学年更新」

---

## `components/Join.tsx`

| 行 | 当前 | 需要 |
|---|---|---|
| 7 | `Sit down for a while.` | 保留或重写 |
| 15–17 | 主 CTA = `mailto:chineseculture.smc@gmail.com` | 改为 Instagram 跳转，邮箱降级为小字 |
| 22–25 | `HSS · Rm 151`、`1900 Pico Boulevard` | 真实地点（Pico 地址是对的）|
| 27–30 | `Thursdays · 11:15 AM — 12:30 PM` | 真实时间 |
| 32–35 | Faculty advisor `Li Lei & Han Meimei` / `Department of Modern Languages` | ⚠️ 占位，需真实 advisor 姓名与院系 |
| 11 | 「no dues」 | 确认是否真的免会费 |

---

## `components/Footer.tsx`

| 行 | 当前 | 处理 |
|---|---|---|
| 5 | `© MMXXVI` | 与全站年份对齐 |
| 7 | `instagram.com/smc.ccc_` | 确认 handle 是否真实 |
| 8 | `chineseculture.smc@gmail.com` | 真实邮箱 |
| 9–11 | SMC clubs 页链接 | 点开确认 URL 有效 |

---

## `components/Epigraph.tsx`

苏轼《水调歌头》「但愿人长久，千里共婵娟」，两句下方各附一行英文翻译。真实引用，**无需替换**。

⚠️ 上一版清单写的是杜甫「笔落惊风雨，诗成泣鬼神」，已过时。本次会话改动：

- 换成苏轼这句（明确的中秋词，序言写明「丙辰中秋…兼怀子由」）
- 删除原署名行「— Du Fu, on the weight of a brush」，连同 `.epigraph__credit` / `.epigraph__rule` / `.epigraph__source` 三条 CSS
- 新增中英对照，`共` 字用印章红做重音

若要换回带署名的版本，需要把那三条 CSS 一并恢复。

另一个可选句：王建《十五夜望月》「今夜月明人尽望，不知秋思落谁家」——同样是明确的中秋诗且无爱情联想，但每句 7 字（现在是 5 字），会挤到中间的笔刷通道，需要调字号。

---

## 收集素材时给 board 的清单（可直接转发）

> 网站需要以下真实信息，请协助提供：
>
> **基本信息**
> 1. 社团成立年份、创始人姓名（会公开显示，需本人同意）
> 2. 固定会议时间与地点
> 3. 官方邮箱、Instagram handle
> 4. Faculty advisor 姓名与院系
> 5. 当前会员人数、每年活动场次（如果有统计）
>
> **活动**
> 6. 本学期剩余全部活动：名称、日期、时间、地点、一句话描述
> 7. 往期活动列表（名称 + 月份）+ 对应照片，6–9 组
>
> **人**
> 8. 每位 officer：英文名、中文名（可选）、职位、专业年级（可选）
> 9. 每位 officer 是否同意照片出现在公开网站上（**逐个确认**，不同意的会用图案占位）
> 10. 照片统一由 publicity officer 提供
>
> **文案**
> 11. 「关于我们」希望怎么介绍社团——真实在做的事，不用华丽措辞
