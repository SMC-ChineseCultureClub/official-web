# 内容位置索引

站内所有文案和数据**已换成真实信息**（2026-09-14）。本文件说明每样内容写在哪、改的时候要连带改哪里。
之前的「占位内容清单」已完成，不再保留。

> 待办与上线事项见 [launch-plan.md](./launch-plan.md)；内容的决策记录见 [content.yml](./content.yml)。

---

## 全站共用的事实

这几项散落在多个文件里，**改一处要全部改**：

| 事实 | 当前值 | 出现在 |
|---|---|---|
| 成立年份 | 2025 | `Hero.tsx`（SINCE MMXXV）、`Nav.tsx`（EST. 2025） |
| Board 届别 | 2026 | `Officers.tsx` 标题「The 2026 board.」 |
| Copyright | MMXXVI | `Footer.tsx` |
| 会议时间 | Every other Thursday · 11:15 AM – 12:30 PM | `Hero.tsx` 底部三格、`Join.tsx`、`lib/events.ts`（`MEETING_TIME`）、`lib/site.ts`（SEO 描述） |
| 会议地点 | HSS 252（Humanities & Social Science） | `Hero.tsx`、`Join.tsx`、`lib/events.ts`（`MEETING_ROOM`）、`lib/site.ts` |
| 社团邮箱 | chineseculture.smc@gmail.com | `Officers.tsx`（`CLUB_EMAIL`）、`Footer.tsx` |
| Instagram | `smc.ccc_` | `NextEventCta.tsx`、`EventsBoard.tsx`、`InstagramEmbed.tsx`、`Footer.tsx` |

---

## 按区块

| 区块 | 文件 | 改什么 |
|---|---|---|
| SEO / 分享卡片 | `lib/site.ts` | 标题、搜索描述、分享描述、域名、是否允许收录 |
| 分享预览图 | `app/opengraph-image.jpg`、`app/twitter-image.jpg` | Hero 截图。**Hero 改了要重截**（隐藏 CTA、进度条、导航链接后截 1200×630） |
| Nav | `components/Nav.tsx` | 品牌行、导航项 |
| Hero | `components/Hero.tsx` | 标题、中文名、英文副标题、底部三格 |
| Hero 按钮 | `components/NextEventCta.tsx` | 自动显示下一场活动；没有活动时退回「Follow us on Instagram」。**一般不用改** |
| About | `components/About.tsx` | 顶部 `activities` 数组（四格）、lead、结尾一句 |
| Events | `lib/events.ts` | **每学期更新**：`events` 数组（一次性活动）、`generalMeetings`（例会起止日期和跳过的日期） |
| Gallery | `components/Gallery.tsx` | 顶部 `archive` 数组；图片在 `public/gallery/`。格子形状由位置决定（见文件顶部注释） |
| Board | `components/Officers.tsx` | **每届更新**：`contacts`（上层三位）、`members`（头像墙），每人的 `post` 是 IG 介绍帖 id（`instagram.com/p/<id>/`）；图片在 `public/board/` |
| Join | `components/Join.tsx` | 标题、时间地点一行 |
| Epigraph | `components/Epigraph.tsx` | 苏轼《水调歌头》「但愿人长久，千里共婵娟」+ 英文译文，无署名 |
| Footer | `components/Footer.tsx` | 版权年份、三个外链 |

---

## 每学期 / 每届要做的事

**每学期开始：**
1. `lib/events.ts`：删掉上学期的活动，填新活动；`generalMeetings` 改成新学期的起止日期和跳过日期
2. Gallery：挑新活动的照片补进 `archive`（最多 9 张，旧的替换掉）

**每届换届：**
1. `components/Officers.tsx`：更新 `contacts` 和 `members`（含每人的 IG 帖子 id），替换 `public/board/` 的照片
2. `Officers.tsx` 标题的届别年份
3. `Footer.tsx` 的版权年份

**过期内容不会自动出错：** 活动过期后自动从页面消失（按访客当天的洛杉矶日期）；所有活动都过期后，Events 显示引导关注 Instagram，Hero 按钮退回 Instagram。

---

## 图片规格

- 格式 WebP，长边 ≤ 1600px（静态导出没有自动图片优化）
- Gallery：每张约 100KB 以内；构图主体居中（格子会裁切）
- Board：上层三位 4:5 竖图，头像墙方图；脸在画面上半部
- 合影里如果有能清楚认出的非 board 成员，注意肖像权
