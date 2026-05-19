// scripts/content-guard.mjs
// 内容准确性红线守卫：禁用词必须缺席，必含词必须在场。
// 运行前提：必须从项目根目录执行，即 node scripts/content-guard.mjs
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
