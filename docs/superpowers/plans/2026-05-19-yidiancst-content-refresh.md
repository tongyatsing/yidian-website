# yidiancst.ai 内容改版 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 按知微当前真实形态（双主模块 + 支撑能力）重写 yidiancst.ai 文案、调整结构、对齐品牌 v2 视觉，并用内容守卫脚本锁死准确性红线。

**Architecture:** 单仓 Next 16 静态站，主体 `src/components/YidianEcoSite.tsx`（1459 行 hash 路由 SPA）+ `src/app/layout.tsx`（metadata/JSON-LD）+ `src/app/globals.css`（Tailwind v4 `@theme` 品牌色）。以 `scripts/content-guard.mjs`（禁用词缺席 + 必含词在场）为 TDD 主干，先红后绿；每任务一提交。

**Tech Stack:** Next 16.1.6 / React 19 / Tailwind v4（CSS @theme，无 JS config）/ motion / lucide。无单测框架；构建 = `npm ci && npm run build`；守卫 = `node scripts/content-guard.mjs`。

**分支：** `feature/content-refresh-202605`（已建，spec 已提交其上）。全程不碰 main、不 push。

---

## 全局执行约定（每个改文案任务都适用）

1. **行号会随顺序编辑漂移**：所有定位用「当前标题/锚字符串」+ 先 `Read` 该组件函数再 `Edit`，不要硬用行号。
2. **红线**：禁出现任何具体政府客户名/项目指标/内部模型架构/打废/备案号/文号（由 content-guard 全局兜底，见 Task 1 禁用词表）。政府背书只允许脱敏句「已为地市级生态环境主管部门提供危险废物规范化管理评估技术支撑」。
3. **风格**：短陈述句、零 AI 黑话（禁 赋能/抓手/闭环/生态/一站式/全方位）、利益导向、Anthropic 式把"辅助不替代/数据本地"当正面卖点。
4. 每个 section 任务收尾跑 `node scripts/content-guard.mjs`，看该任务相关断言由红转绿（其余可仍红，最终 Task 14 全绿）。
5. 文案 ground truth = 同仓 spec `docs/superpowers/specs/2026-05-19-yidiancst-content-refresh-design.md`，本计划已把定稿短文案内联，长段落以 spec §编号指明。

---

### Task 1: 内容守卫脚本（失败的"测试"）

**Files:**
- Create: `scripts/content-guard.mjs`

- [ ] **Step 1: 写守卫脚本**

```js
// scripts/content-guard.mjs
// 内容准确性红线守卫：禁用词必须缺席，必含词必须在场。
import { readFileSync } from "node:fs";

const SITE = "src/components/YidianEcoSite.tsx";
const LAYOUT = "src/app/layout.tsx";
const site = readFileSync(SITE, "utf8");
const layout = readFileSync(LAYOUT, "utf8");
const both = site + "\n" + layout;

// 禁用词：在 site + layout 中任意出现即红线失败
const FORBIDDEN = [
  "打废", "dafei", "7500", "行业深耕",
  "东莞", "四会", "肇庆", "华南所", "某环保局", "生态环境局",
  "环办固体函", "488号", "489号", "比例制", "非绝对分",
  "Claude", "GPT", "DeepSeek", "Qwen", "三级路由", "算力中心", "LoRA",
  "ICP备", "粤ICP", "算法备案", "备案号",
  "YIDIAN CST", "院士", "97.6", "管理智能体",
];

// 必含词：必须在 site 中出现（叙事/品牌/红线声明落地证明）
const REQUIRED_SITE = [
  "危废合规，见微知著",
  "危废规范化管理",
  "鉴别复核",
  "申请试用资格",
  "预约演示",
  "全程本地可控",
  "ZHIWEI",
  "知微见著 · 洞察每一点价值",
  "地市级生态环境主管部门",
  "不构成行政执法决定",
  "500+",
  "广州市亿点环保有限公司",
];

// 必含词：必须在 layout 中出现
const REQUIRED_LAYOUT = ["危废规范化管理", "ZHIWEI"];

const errors = [];
for (const t of FORBIDDEN) if (both.includes(t)) errors.push(`FORBIDDEN present: 「${t}」`);
for (const t of REQUIRED_SITE) if (!site.includes(t)) errors.push(`REQUIRED missing in site: 「${t}」`);
for (const t of REQUIRED_LAYOUT) if (!layout.includes(t)) errors.push(`REQUIRED missing in layout: 「${t}」`);

if (errors.length) {
  console.error("CONTENT GUARD FAIL:\n" + errors.map((e) => "  - " + e).join("\n"));
  process.exit(1);
}
console.log("CONTENT GUARD PASS");
```

- [ ] **Step 2: 跑守卫确认它失败**

Run: `cd ~/yidian-website && node scripts/content-guard.mjs`
Expected: `CONTENT GUARD FAIL`，列出多条 FORBIDDEN present（7500/YIDIAN CST/管理智能体/东莞… 视现网而定）+ 多条 REQUIRED missing。退出码 1。

- [ ] **Step 3: 提交**

```bash
cd ~/yidian-website && git add scripts/content-guard.mjs && git commit -m "test: 内容准确性红线守卫脚本（先红）

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

### Task 2: 品牌 v2 色板（globals.css @theme）

**Files:**
- Modify: `src/app/globals.css`（`@theme inline {}` 块末尾 + `:root {}` 块末尾，锚 `--radius-4xl:` 与 `--sidebar-ring: oklch(0.708 0 0);`）

- [ ] **Step 1: Read `src/app/globals.css`** 确认 `@theme inline {` 与 `:root {` 块边界。

- [ ] **Step 2: 在 `@theme inline {}` 块内（`--radius-4xl: ...;` 行之后、`}` 之前）加品牌 token**

```css
  /* 知微品牌 v2 */
  --color-brand-from: #05B27D;
  --color-brand-to: #31D57A;
  --color-brand-ink: #1A1A1A;
  --color-brand-muted: #6B7280;
  --color-brand-border: #E5E7EB;
  --color-brand-surface: #F7F8FA;
```

- [ ] **Step 3: 在 `globals.css` 文件末尾追加品牌渐变 utility**

```css
/* 知微品牌 v2 渐变（仅用于强调：主 CTA / 关键强调字 / logo） */
@utility bg-brand-gradient {
  background-image: linear-gradient(135deg, #05B27D 0%, #31D57A 100%);
}
@utility text-brand-gradient {
  background-image: linear-gradient(135deg, #05B27D 0%, #31D57A 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
```

- [ ] **Step 4: 构建验证**

Run: `cd ~/yidian-website && npm run build`
Expected: 构建成功（exit 0，生成 `.next`）。

- [ ] **Step 5: 提交**

```bash
cd ~/yidian-website && git add src/app/globals.css && git commit -m "feat(brand): globals.css 注入品牌 v2 色板 + 渐变 utility

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

### Task 3: 数据数组（YidianEcoSite.tsx 顶部 DATA 区）

**Files:**
- Modify: `src/components/YidianEcoSite.tsx`（`btnPrimary`/`btnSecondary` 锚行 44-45；`navItems` 锚 38-42；`professionalCases` 锚 48-76）

- [ ] **Step 1: Read** `src/components/YidianEcoSite.tsx` 第 1-95 行。

- [ ] **Step 2: btnPrimary / btnSecondary 改品牌色**（替换 emerald/teal 通用色）

替换：
```js
const btnPrimary = "rounded-full bg-gradient-to-r from-emerald-700 to-teal-600 text-sm font-medium text-white transition hover:from-emerald-800 hover:to-teal-700";
const btnSecondary = "rounded-full border border-emerald-200 bg-white text-sm font-medium text-emerald-800 transition hover:bg-emerald-50";
```
为：
```js
const btnPrimary = "rounded-full bg-brand-gradient text-sm font-medium text-white transition hover:opacity-90";
const btnSecondary = "rounded-full border border-brand-border bg-white text-sm font-medium text-brand-ink transition hover:bg-brand-surface";
```

- [ ] **Step 3: navItems 标签精简**（保留路由 key 不变，避免破坏 hash 路由 + demo 页；仅 relabel）

替换为：
```js
const navItems: [string, string][] = [
  ["home", "首页"], ["zhiwei", "产品能力"], ["services", "环保咨询"],
  ["cases", "应用案例"], ["about", "关于亿点"], ["demo", "产品演示"],
  ["contact", "联系我们"],
];
```

- [ ] **Step 4: professionalCases 重定位为「公司技术服务实绩」**（保留 legacy 脱敏案例作背书；去政府客户化措辞，改为中性"地方政府/区域"——已是"某市/某区/某县"脱敏，仅调 tag）

替换 `professionalCases` 三项的 `tags`：
- 第 1 项 tags 改 `["技术服务", "区域治理"]`
- 第 2 项 tags 改 `["示范项目", "可复制方案"]`
- 第 3 项 tags 改 `["双碳转型", "核算体系"]`
（title/desc/metrics 不变——已脱敏且属公司真实咨询实绩。）

- [ ] **Step 5: 构建验证**

Run: `cd ~/yidian-website && npm run build`
Expected: 构建成功。

- [ ] **Step 6: 提交**

```bash
cd ~/yidian-website && git add src/components/YidianEcoSite.tsx && git commit -m "feat(data): 按钮改品牌色 / nav 精简 / 案例重定位为公司实绩

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

### Task 4: layout.tsx — metadata / OG / Twitter / JSON-LD 重写

**Files:**
- Modify: `src/app/layout.tsx`（`metadata` 对象 18-39；JSON-LD 55-77）

- [ ] **Step 1: Read** `src/app/layout.tsx`。

- [ ] **Step 2: 替换 `metadata` 对象（18-39 行整体）为：**

```ts
export const metadata: Metadata = {
  title: "知微 ZHIWEI｜危废规范化管理与鉴别复核智能审查 · 广州市亿点环保",
  description: "知微是危险废物规范化管理与鉴别复核的智能审查助手——在台账、申报、联单与鉴别报告中主动发现合规偏差与证据缺口。广州市亿点环保有限公司。",
  metadataBase: new URL("https://yidiancst.ai"),
  openGraph: {
    title: "知微 ZHIWEI — 危废规范化管理与鉴别复核智能审查",
    description: "危险废物规范化管理合规自查与鉴别复核辅助。全程本地可控，辅助而不替代专家判定。广州市亿点环保有限公司。",
    url: "https://yidiancst.ai",
    siteName: "知微 ZHIWEI · 广州市亿点环保",
    locale: "zh_CN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "知微 ZHIWEI — 危废规范化管理与鉴别复核智能审查",
    description: "危险废物规范化管理合规自查与鉴别复核辅助，全程本地可控。",
  },
  robots: { index: true, follow: true },
};
```

- [ ] **Step 3: JSON-LD 内 `alternateName` 与 `description` 改品牌 v2**

`alternateName: "YIDIAN CST",` → `alternateName: "知微 ZHIWEI",`
`description: "环保专业服务与危险废物管理场景数字化能力建设 — 知微危废管理智能体",` → `description: "危险废物规范化管理与鉴别复核智能审查辅助，及环保专业咨询服务 — 广州市亿点环保有限公司",`
（address/contactPoint/telephone/email 全部不变。）

- [ ] **Step 4: 构建验证**

Run: `cd ~/yidian-website && npm run build`
Expected: 构建成功。

- [ ] **Step 5: 提交**

```bash
cd ~/yidian-website && git add src/app/layout.tsx && git commit -m "feat(seo): metadata/OG/JSON-LD 改双模块叙事 + ZHIWEI

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

### Task 5: HomePage — Hero（锚 `{/* ── Hero ── */}`，约 335-467）

**Files:**
- Modify: `src/components/YidianEcoSite.tsx`（`HomePage` 内 Hero 段）

- [ ] **Step 1: Read** `HomePage`（`function HomePage` 起至 `{/* ── 核心优势 ── */}`）。

- [ ] **Step 2: Hero 文案改写**（保留易经小字 DNA `知微知彰，知柔知刚`；改 H1/副题/徽章/CTA）
- H1 → **「危废合规，见微知著。」**（大字、`text-brand-ink`；如原用渐变标题，改 `text-brand-gradient`）
- 副题 → 「知微是危险废物规范化管理与鉴别复核的智能审查助手——在海量台账、申报、联单与鉴别报告中，主动发现关键偏差与证据缺口。」
- 徽章/eyebrow（原「已服务 500+ 企业 · 环保咨询 · 危废管理智能体」）→ 「危废规范化管理 · 鉴别复核 · 全程本地可控」
- 主 CTA 文字 → 「申请试用资格」；次 CTA → 「预约演示」（保留其 onClick 跳转逻辑不变，仅改可见文字；如原指向 `trial.yidiancst.ai` 外链，改为跳 `contact` 页：`onClick={() => setPage("contact")}`）

- [ ] **Step 3: 构建 + 守卫子集**

Run: `cd ~/yidian-website && npm run build && node scripts/content-guard.mjs`
Expected: build 成功；guard 仍 FAIL（其它段未改），但 `危废合规，见微知著`/`申请试用资格`/`预约演示` 三条 REQUIRED 不再出现在 missing 列表。

- [ ] **Step 4: 提交**

```bash
cd ~/yidian-website && git add src/components/YidianEcoSite.tsx && git commit -m "feat(home): Hero 改双模块定位 + 见微知著 H1 + 预约制 CTA

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

### Task 6: HomePage — 核心优势（锚 `{/* ── 核心优势 ── */}`，约 468-502）

**Files:**
- Modify: `src/components/YidianEcoSite.tsx`

- [ ] **Step 1: Read** 核心优势段（锚到 `{/* ── 知微产品 + 路线图 ── */}`）。

- [ ] **Step 2: 4 卡文案对齐"讲 LLM 才能做的事"**（保留卡片结构/图标，仅改标题+描述）
1. 标题「主动发现异常」/ 描述「不是被动等查询——知微主动比对台账、申报、联单，指出每一处不一致与缺证。」
2. 标题「跨非结构化资料语义比对」/ 描述「无需先标准化录入，直接读懂台账、环评、许可、鉴别报告并语义对齐。」
3. 标题「专家逻辑研判」/ 描述「按资深固废专家思路组织问题树，识别套码、混码、旧码惯性等实质风险。」
4. 标题「全程本地可控」/ 描述「核心模型与敏感资料留在本地环境，数据不出域。」

- [ ] **Step 3: 构建**

Run: `cd ~/yidian-website && npm run build`
Expected: 成功。

- [ ] **Step 4: 提交**

```bash
cd ~/yidian-website && git add src/components/YidianEcoSite.tsx && git commit -m "feat(home): 核心优势对齐 LLM 叙事原则

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

### Task 7: HomePage — 双主模块 + Roadmap（锚 `{/* ── 知微产品 + 路线图 ── */}`，约 503-578）

**Files:**
- Modify: `src/components/YidianEcoSite.tsx`

- [ ] **Step 1: Read** 该段（至 `{/* ── 服务 ── */}`）。

- [ ] **Step 2: 重构为「双主模块」+ 据实 Roadmap**（沿用现有左右/卡片骨架，替换内容）

主模块①（标题）「危废规范化管理 · 合规自查与评估准备」
- 正文：「对照国家危险废物规范化环境管理评估要求，知微逐项核对台账、申报、转移联单、贮存与标识、管理计划、应急与培训，定位每一处差距与缺证，产出可整改的自查底稿。」
- 对照句：「人工逐档比对难免漏项、口径不一；知微跨多份非结构化材料语义对齐，让全项自查与证据归集第一次成为常态。」

主模块②（标题）「危废鉴别 · 复核辅助」
- 正文：「围绕属性判定与鉴别报告，知微辅助核查采样代表性、检测项目与标准适用性，沿问题树组织证据链。」
- 红线声明：「知微辅助初审，不替代专家最终判定，不输出执法或定性结论。」

Roadmap（右侧版本卡，据实，不通胀版本号）：
- 「台账智能审查 · 跨资料一致性比对」— 已上线
- 「现场核查（OCR+视觉）· 鉴别复核辅助」— 完善中
- 「全过程合规审查」— 持续演进

CTA「申请试用资格」（`onClick={() => setPage("contact")}`）。

- [ ] **Step 3: 构建 + 守卫子集**

Run: `cd ~/yidian-website && npm run build && node scripts/content-guard.mjs`
Expected: build 成功；`危废规范化管理`/`鉴别复核` 不再 missing。

- [ ] **Step 4: 提交**

```bash
cd ~/yidian-website && git add src/components/YidianEcoSite.tsx && git commit -m "feat(home): 知微产品段重构为双主模块 + 据实 Roadmap

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

### Task 8: HomePage — Stats 据实修正（锚 `{/* ── Stats ── */}`，约 603-614）

**Files:**
- Modify: `src/components/YidianEcoSite.tsx`（Stats 段 + 关联 `CountUpStat` 用法）

- [ ] **Step 1: Read** Stats 段（锚到 `{/* ── 案例 ── */}`）。

- [ ] **Step 2: 据实修正四指标**
- **删除**「7500+ AI 训练样本」整项
- **删除**「8 年行业深耕」整项（亿点 2022 成立，数字脆弱）
- **保留**「500+ 服务企业」（owner 确认；克制单条呈现）
- 第三项改「双主模块」或「规范化 + 鉴别 双能力」（替代版本号通胀的「4 知微产品版本」）
- 结果：Stats 收敛为 2 项（500+ 服务企业 / 双能力覆盖），去掉数字墙观感（减少彩色、加留白）

- [ ] **Step 3: 构建 + 守卫子集**

Run: `cd ~/yidian-website && npm run build && node scripts/content-guard.mjs`
Expected: build 成功；FORBIDDEN 列表不再含 `7500`、`行业深耕`；`500+` 仍 present。

- [ ] **Step 4: 提交**

```bash
cd ~/yidian-website && git add src/components/YidianEcoSite.tsx && git commit -m "fix(home): Stats 删除虚标 7500/8年，保留 owner 确认 500+

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

### Task 9: HomePage — 案例段 + 脱敏政府背书（锚 `{/* ── 案例 ── */}`，约 615-652）

**Files:**
- Modify: `src/components/YidianEcoSite.tsx`

- [ ] **Step 1: Read** 案例段（锚到 `{/* ── 关于 ── */}`）。

- [ ] **Step 2: 段标题改「公司技术服务实绩」**；在段首或合适位置加一行脱敏政府背书：
「已为地市级生态环境主管部门提供危险废物规范化管理评估技术支撑，并服务于产废企业与危废服务商。」
（`professionalCases` 数据已在 Task 3 调整；此处只改段标题文案 + 插入背书句，不再编造客户案例。）

- [ ] **Step 3: 构建 + 守卫子集**

Run: `cd ~/yidian-website && npm run build && node scripts/content-guard.mjs`
Expected: build 成功；`地市级生态环境主管部门` 不再 missing。

- [ ] **Step 4: 提交**

```bash
cd ~/yidian-website && git add src/components/YidianEcoSite.tsx && git commit -m "feat(home): 案例段改公司实绩 + 脱敏政府背书句

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

### Task 10: HomePage — 关于 + CTA（锚 `{/* ── 关于 ── */}` / `{/* ── CTA ── */}`，约 653-690）

**Files:**
- Modify: `src/components/YidianEcoSite.tsx`

- [ ] **Step 1: Read** 关于段至 `HomePage` 结束。

- [ ] **Step 2: 关于段**：保留公司全称「广州市亿点环保有限公司」；正文改为克制一句 + 资质背书（软著 5 / 实用新型 8 / 发明专利 2（优先审查中）/ 产学研：广东工业大学），发明专利写「申请中」不写「已授权」。

- [ ] **Step 3: CTA 段**：收尾句「把合规细节交给知微，把判断留给你。」+ 按钮「申请试用资格」「预约演示」（均 `onClick={() => setPage("contact")}`，文案不写"立即试用"）。

- [ ] **Step 4: 构建**

Run: `cd ~/yidian-website && npm run build`
Expected: 成功。

- [ ] **Step 5: 提交**

```bash
cd ~/yidian-website && git add src/components/YidianEcoSite.tsx && git commit -m "feat(home): 关于段克制资质背书 + CTA 收尾句

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

### Task 11: ZhiweiPage — 知微专页双模块重构（锚 `function ZhiweiPage`，约 861-1007）

**Files:**
- Modify: `src/components/YidianEcoSite.tsx`

- [ ] **Step 1: Read** `function ZhiweiPage` 整段（至 `function ContactPage`）。

- [ ] **Step 2: 全段对齐双主模块叙事**：把所有"管理智能体/资料审查工具"旧定位句改为"危废规范化管理 + 鉴别复核 双模块审查助手"；任何提到外部模型/政府客户/项目指标/打废的句子按红线删改；保留并强化「核心模型与敏感资料可在本地环境运行」「不替代专家最终判定，不输出执法/定性结论」。沿用 spec §5(3)(4)(5) 文案口径，§3 红线约束逐句套用。

- [ ] **Step 3: 构建 + 守卫子集**

Run: `cd ~/yidian-website && npm run build && node scripts/content-guard.mjs`
Expected: build 成功；FORBIDDEN 不再含 `管理智能体`（若 ZhiweiPage 是最后一处）。

- [ ] **Step 4: 提交**

```bash
cd ~/yidian-website && git add src/components/YidianEcoSite.tsx && git commit -m "feat(zhiwei): 知微专页重构为双主模块 + 红线清洗

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

### Task 12: Footer — 品牌 v2（锚 `function Footer`，约 1331-1374）

**Files:**
- Modify: `src/components/YidianEcoSite.tsx`

- [ ] **Step 1: Read** `function Footer`。

- [ ] **Step 2: 改写**
- 品牌副标 `YIDIAN CST` → `ZHIWEI`
- 品牌行：`广州市亿点环保有限公司｜知微 · 危废规范化管理与鉴别复核智能审查`
- 加 slogan 行：`知微见著 · 洞察每一点价值`
- 加性质声明行：`本产品为 AI 辅助参考工具，不构成行政执法决定，最终以专家核查为准。`
- 版权行保留动态 `{CURRENT_YEAR} 广州市亿点环保有限公司`（去掉 `YIDIAN CST` 尾巴）
- 快速链接 label 与 Task 3 navItems 一致

- [ ] **Step 3: 构建 + 守卫子集**

Run: `cd ~/yidian-website && npm run build && node scripts/content-guard.mjs`
Expected: build 成功；`ZHIWEI`/`知微见著 · 洞察每一点价值`/`不构成行政执法决定` 不再 missing；`YIDIAN CST` 不再 FORBIDDEN present。

- [ ] **Step 4: 提交**

```bash
cd ~/yidian-website && git add src/components/YidianEcoSite.tsx && git commit -m "feat(footer): 品牌 v2 ZHIWEI + slogan + 性质声明

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

### Task 13: 其余页面红线清洗（AboutPage / ServicesPage / CasesPage / ContactPage / demoScenarios）

**Files:**
- Modify: `src/components/YidianEcoSite.tsx`（`function AboutPage` 695 / `function ServicesPage` 784 / `function CasesPage` 814 / `function ContactPage` 1008 / `demoScenarios` 96-190 / `DemoFlowPage` 1070 / `DemoShowcasePage` 1248）

- [ ] **Step 1: Read** 每个上述函数/数据块。

- [ ] **Step 2: 逐处套用红线 + 风格**
- 把残留"管理智能体/YIDIAN CST/8 年/7500/政府客户名/打废/外部模型"全部清除或改写（content-guard 全局兜底，这一步是把它们真正改对而非仅躲过 guard）
- demoScenarios 文案保持"脱敏案例 A/B/C"风格，确保无具体客户/指标
- AboutPage/CasesPage 与首页关于/案例口径一致；ContactPage 联系方式不变

- [ ] **Step 3: 构建 + 全量守卫**

Run: `cd ~/yidian-website && npm run build && node scripts/content-guard.mjs`
Expected: build 成功；**`CONTENT GUARD PASS`**（全部禁用词缺席 + 全部必含词在场）。

- [ ] **Step 4: 提交**

```bash
cd ~/yidian-website && git add src/components/YidianEcoSite.tsx && git commit -m "feat(pages): 其余页面红线清洗 + 双模块口径统一，守卫转绿

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

### Task 14: 终验 — 守卫 + 构建 + 视觉走查

**Files:**
- Read-only 验证；如发现问题回到对应 Task 修。

- [ ] **Step 1: 全量守卫**

Run: `cd ~/yidian-website && node scripts/content-guard.mjs`
Expected: `CONTENT GUARD PASS`，退出码 0。

- [ ] **Step 2: 生产构建**

Run: `cd ~/yidian-website && npm ci && npm run build`
Expected: 构建成功，无 type/lint 阻断错误。

- [ ] **Step 3: 视觉走查**（dev + playwright 截图）

Run（后台）: `cd ~/yidian-website && npm run dev`（记 pid），就绪后用 playwright 截图 `http://localhost:3000` 首页 + `#zhiwei` + 滚动到 Footer，确认：双主模块在场、品牌绿仅强调用、无数字墙/徽章墙、页脚 ZHIWEI+slogan+性质声明、无任何红线词。截图存 `~/Desktop/yidiancst_refresh_*.png` 交用户。走查后 kill dev pid。

- [ ] **Step 4: 收尾提交（如视觉走查有微调）**

```bash
cd ~/yidian-website && git add -A && git commit -m "chore: 视觉走查微调，内容改版终验通过

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

### Task 15: 记忆与索引同步（CLAUDE.md 硬性要求）

**Files:**
- Create: `~/.claude/projects/-Users-ydpotato/memory/project_yidian_website_refresh_202605.md`
- Modify: `~/.claude/projects/-Users-ydpotato/memory/MEMORY.md`（已 ship 项目区加 1 行索引）

- [ ] **Step 1:** 写 project 记忆：本次改版范围/双模块定位/红线守卫脚本位置/分支名/未 push 状态/遗留项（v2 logo 资产迁移、ECS sync、合 main+push 待用户拍）。
- [ ] **Step 2:** MEMORY.md「已 ship 项目」区加 `[[project-yidian-website-refresh-202605]] 官网双模块改版+品牌v2（分支未push）` 一行。
- [ ] **Step 3:** Run `bash ~/.zhiwei/bin/check_memory.sh` 验证 KB 未超阈值。
- [ ] **Step 4:** 不提交（memory 仓非本项目 git）。向用户报告：分支就绪、守卫绿、构建过、**合 main + push 触发 Vercel 待用户明确授权**。

---

## Self-Review

**Spec coverage（逐节对照 spec）：**
- §2 双模块 + 隐藏 dafei/客户/架构 → Task 5/7/11 + content-guard FORBIDDEN（Task 1）✅
- §2 政府客户脱敏可提 → Task 9 背书句 + guard REQUIRED ✅
- §3 准确性红线（文号/比例制/HW2025/模型/数字）→ content-guard FORBIDDEN + Task 8 数字 + Task 11/13 ✅
- §3 数字修正表（7500删/8年改/500+留/IP背书）→ Task 8 + Task 10 ✅
- §4 Apple/Anthropic 风格 + 品牌 v2 视觉 → Task 2（色板）+ Task 3（按钮）+ 各 Task 文案克制 + Task 14 视觉走查 ✅
- §5 IA 逐节（Hero/双模块/支撑/信任/Roadmap/关于/CTA/页脚/SEO）→ Task 4-12 一一对应 ✅
- §6 工程范围（单文件+layout+globals，无新依赖）→ 各 Task Files 限定 ✅
- §7 部署（分支→build→评审→合 main→push）→ Task 14 + Task 15 Step4（push 待授权）✅
- §8 验收标准 → content-guard（Task 1/13/14）直接编码这些断言 ✅
- §9 遗留项 → Task 15 Step1 记录 ✅

**Placeholder scan：** 无 TBD/TODO；长文案以 spec §编号 + 内联短文案双保险；ZhiweiPage（Task 11）因属大段重写、指向 spec §5+§3 逐句口径，已给明确约束与必含/禁用词兜底，非占位。

**Type/命名一致性：** content-guard 的 FORBIDDEN/REQUIRED 词表与各 Task 落地文案逐字对齐（如 `危废合规，见微知著`/`知微见著 · 洞察每一点价值`/`不构成行政执法决定`/`ZHIWEI`/`地市级生态环境主管部门`/`500+`）；按钮 util 名 `bg-brand-gradient`/`text-brand-gradient`(Task 2) = Task 3 引用名一致；nav label(Task 3) = Footer 快速链接(Task 12)一致。

**风险备注：** ZhiweiPage/其余页面（Task 11/13）是较大重写，建议 subagent-driven 逐任务审查；content-guard 是全局安全网，任一红线词回潜都会在 Task 13/14 红灯。
