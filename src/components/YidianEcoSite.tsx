"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  Cpu, Leaf, Phone, Mail, MapPin, ShieldCheck, ChevronRight,
  FileSpreadsheet, AlertTriangle, Database, Search,
  ShieldAlert, BadgeCheck, Recycle, Factory, FileCheck2, BarChart3,
  CheckCircle2, FileText, Image, Play, RotateCcw, Loader2, Eye,
  ArrowLeft, Camera, ArrowUp, Lock, Server, Shield,
  BookOpen, Target, Layers, FileSearch, ClipboardCheck,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

/* ═══════════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════════ */

const services = [
  { icon: ShieldCheck, title: "环保管家咨询", desc: "为企业提供政策解读、环保管理制度建设、日常合规问题研判与综合咨询服务。" },
  { icon: Factory, title: "建设项目环境影响评价", desc: "承接建设项目环境影响报告相关技术服务，并提供项目全流程技术支持。" },
  { icon: FileCheck2, title: "排污许可申报维护", desc: "为企业提供排污许可证申请、变更、延续及执行报告相关技术服务。" },
  { icon: Recycle, title: "危废与固废管理", desc: "提供危险废物管理计划、台账、申报、联单、规范化管理等咨询服务，并可结合知微开展资料审查与一致性核查辅助。" },
  { icon: Leaf, title: "VOCs 治理咨询", desc: "开展挥发性有机物排放识别、治理方案设计与运行管理咨询。" },
  { icon: AlertTriangle, title: "应急预案编制", desc: "开展突发环境事件应急预案编制、评审、备案及演练指导。" },
  { icon: BadgeCheck, title: "环保竣工验收", desc: "提供建设项目竣工环境保护验收相关技术支持。" },
  { icon: Search, title: "清洁生产审核", desc: "为企业提供清洁生产审核评估、方案设计与实施跟踪服务。" },
  { icon: Cpu, title: "绿色制造体系建设", desc: "提供绿色工厂、绿色供应链、绿色产品等申报咨询服务。" },
  { icon: BarChart3, title: "双碳服务", desc: "提供碳排放核算、碳足迹评价与减碳路径规划等咨询服务。" },
  { icon: Database, title: "政府环保专项资金申请", desc: "协助企业开展各级环保专项资金、补贴类项目申报服务。" },
];

const contactInfo = [
  { icon: Phone, label: "联系电话", text: "13660969154" },
  { icon: Mail, label: "企业邮箱", text: "yidianhuanbao@yeah.com" },
  { icon: MapPin, label: "公司地址", text: "广州市天河区天慧路10号A409室" },
];

const navItems: [string, string][] = [
  ["home", "首页"], ["about", "关于我们"], ["services", "服务范围"],
  ["cases", "项目案例"], ["zhiwei", "知微智能体"], ["demo", "产品演示"],
  ["contact", "联系我们"],
];

const btnPrimary = "rounded-full bg-gradient-to-r from-emerald-700 to-teal-600 text-sm font-medium text-white transition hover:from-emerald-800 hover:to-teal-700";
const btnSecondary = "rounded-full border border-emerald-200 bg-white text-sm font-medium text-emerald-800 transition hover:bg-emerald-50";
const CURRENT_YEAR = new Date().getFullYear();

const professionalCases = [
  {
    title: "某市无废城市技术服务",
    desc: "协助地方政府推进无废城市建设，提供技术支撑、指标设计与实施督导。",
    metrics: [
      { value: "12", unit: "个", label: "覆盖工业园区" },
      { value: "98%", unit: "", label: "指标达标率" },
    ],
    tags: ["政府技术支撑", "无废城市"],
  },
  {
    title: "某区无废社区示范项目",
    desc: "从社区场景出发，策划无废试点方案并推动落地，形成可复制经验。",
    metrics: [
      { value: "6", unit: "个", label: "试点社区" },
      { value: "3", unit: "套", label: "可复制方案" },
    ],
    tags: ["社区场景", "示范推广"],
  },
  {
    title: "某县低碳示范创建",
    desc: "编制低碳发展方案，搭建碳排放核算体系，服务区域绿色转型。",
    metrics: [
      { value: "15%", unit: "", label: "碳排放降幅" },
      { value: "1", unit: "套", label: "核算体系" },
    ],
    tags: ["双碳转型", "核算体系"],
  },
];

const productCases = [
  {
    title: "脱敏案例 A｜跨资料一致性比对辅助",
    desc: "围绕台账、环评、排污许可等资料进行交叉比对，辅助识别危废名称、代码、数量及处置去向等不一致问题，并形成结构化审查结果。",
    tags: ["跨资料比对", "结构化输出"],
  },
  {
    title: "脱敏案例 B｜鉴别复核专家初审辅助",
    desc: "围绕鉴别报告及附件开展全文读取、问题树扫描和证据归集，辅助识别采样代表性、历史数据引用、名录对照、折算依据等关键问题，并形成可复核底稿。",
    tags: ["鉴别复核", "证据链"],
  },
  {
    title: "脱敏案例 C｜复杂资料审查辅助",
    desc: "针对扫描件、长文本附件和多份关联资料场景，辅助进行信息抽取、依据归集与问题提示，提高复杂资料审查效率。",
    tags: ["复杂资料", "审查辅助"],
  },
];

/* Demo data */
interface DemoScenario {
  id: string; tag: string; version: string; title: string; desc: string;
  icon: React.ComponentType<{ className?: string }>;
  files: { name: string; type: string; size: string; icon: React.ComponentType<{ className?: string }> }[];
  parseResult: string;
  steps: { label: string; detail: string; duration: number }[];
  findings: { level: string; code: string; text: string }[];
  summary: { total: number; high: number; medium: number; low: number; duration: string };
}

const demoScenarios: DemoScenario[] = [
  {
    id: "cross", tag: "主线能力", version: "跨资料一致性比对",
    title: "台账 × 排污许可 × 环评报告 联合审查",
    desc: "围绕台账、排污许可证、环评报告等多来源资料进行交叉比对，辅助识别名称、代码、数量和处置方式等不一致问题。",
    icon: ShieldAlert,
    files: [
      { name: "企业A-危废管理台账-2025.xlsx", type: "Excel", size: "1.8 MB", icon: FileSpreadsheet },
      { name: "企业A-排污许可证（副本）.pdf", type: "PDF", size: "5.2 MB", icon: FileText },
      { name: "企业A-环境影响报告书.pdf", type: "PDF", size: "12.6 MB", icon: FileText },
    ],
    parseResult: "台账 156 条记录（8类危废），排污许可证提取 6 类许可废物，环评报告提取产生量预测与贮存要求。",
    steps: [
      { label: "资料接收与解析", detail: "分别解析台账 Excel、排污许可证 PDF、环评报告 PDF...", duration: 2500 },
      { label: "信息抽取", detail: "提取台账字段、许可废物种类、贮存方式、环评产生量预测...", duration: 2000 },
      { label: "对象对齐", detail: "将不同来源资料中的同类危废对象进行标准化关联...", duration: 3000 },
      { label: "问题发现", detail: "围绕名称、代码、数量、处置方式等进行交叉核查...", duration: 2500 },
      { label: "依据归集", detail: "围绕已识别问题归集原文表述、标准要求和相关依据...", duration: 3000 },
      { label: "审查输出", detail: "形成结构化审查结果...", duration: 1500 },
    ],
    findings: [
      { level: "high", code: "C001", text: "台账实际记录 8 类危废，排污许可证载明 6 类——多出的 2 类未在许可证中申报，存在超许可范围管理风险。" },
      { level: "high", code: "C002", text: "环评报告预测年产生量上限 85 吨/年，台账实际累计 112.6 吨，超出 32.5%，存在超总量风险。" },
      { level: "high", code: "C003", text: "排污许可证载明贮存方式为「专用容器」，台账部分记录去向标注为「露天暂存」，与许可不一致。" },
      { level: "medium", code: "C004", text: "环评报告中废物名称与台账表达不一致，建议统一为环评报告口径。" },
      { level: "medium", code: "C005", text: "台账中部分危废的产生工序描述与环评报告中对应工序不一致，建议核实是否工艺变更未重新报批。" },
    ],
    summary: { total: 5, high: 3, medium: 2, low: 0, duration: "23 秒" },
  },
  {
    id: "ident", tag: "持续完善中", version: "鉴别复核辅助",
    title: "鉴别报告专家初审辅助",
    desc: "围绕鉴别报告及附件进行全文读取、问题树扫描、证据归集与复核表达辅助，展示复杂资料审查场景下的应用方式。",
    icon: Search,
    files: [
      { name: "企业B-危废鉴别报告.pdf", type: "PDF", size: "18.3 MB", icon: FileText },
      { name: "企业B-鉴别附件（检测报告等）.pdf", type: "PDF", size: "8.7 MB", icon: FileText },
      { name: "企业B-环评批复.pdf", type: "PDF", size: "3.2 MB", icon: FileText },
    ],
    parseResult: "鉴别报告 86 页，附件含 4 份检测报告、采样记录表、工艺流程图。启动全文读取与问题树扫描。",
    steps: [
      { label: "全文读取", detail: "读取鉴别报告正文、检测报告数据、采样记录...", duration: 3000 },
      { label: "信息抽取", detail: "提取鉴别对象、采样点位、检测指标、标准引用...", duration: 2500 },
      { label: "问题树扫描", detail: "围绕采样代表性、检测项目筛选、名录对照、标准适用性等维度审查...", duration: 3500 },
      { label: "证据归集", detail: "将原文摘录、检测数据、标准依据组织为证据链...", duration: 3000 },
      { label: "复核表达", detail: "形成可供专家复核修改的审查底稿...", duration: 2000 },
    ],
    findings: [
      { level: "high", code: "ID001", text: "采样点位仅覆盖 2 个车间，未涵盖报告所述全部 4 个产废工序，采样代表性论证不充分。" },
      { level: "high", code: "ID002", text: "检测项目未包含《国家危险废物名录》中对应废物类别的特征污染物，检测项目筛选依据不充分。" },
      { level: "medium", code: "ID003", text: "报告引用的浸出毒性标准版本与现行有效标准不一致，建议核实标准适用性。" },
      { level: "medium", code: "ID004", text: "历史监测数据引用缺少数据来源说明和时间范围标注，依据链不完整。" },
      { level: "low", code: "ID005", text: "报告中部分危废名称表述与《国家危险废物名录》不一致，建议规范统一。" },
    ],
    summary: { total: 5, high: 2, medium: 2, low: 1, duration: "38 秒" },
  },
  {
    id: "field", tag: "拓展方向", version: "现场核查辅助",
    title: "危废贮存间现场核查辅助",
    desc: "围绕现场照片、标签信息与台账资料的联动分析，展示现场核查辅助方向的能力设想与演示样例。",
    icon: Camera,
    files: [
      { name: "现场照片（8张）.zip", type: "照片", size: "24.5 MB", icon: Image },
      { name: "企业C-危废台账-2025.xlsx", type: "Excel", size: "1.2 MB", icon: FileSpreadsheet },
    ],
    parseResult: "接收 8 张现场照片，台账 93 条记录（6类危废）。启动识别与联动分析。",
    steps: [
      { label: "资料接收", detail: "解析台账 Excel，加载 8 张现场照片...", duration: 2000 },
      { label: "文字识别", detail: "识别标签文字、记录本内容、标识标牌...", duration: 3000 },
      { label: "视觉分析", detail: "分析容器状态、密封情况、防渗层、标签完整性...", duration: 3500 },
      { label: "信息融合", detail: "文字识别结果与视觉观察结果合并，交叉验证...", duration: 2000 },
      { label: "台账联动", detail: "现场发现与台账记录交叉比对...", duration: 2500 },
      { label: "结果输出", detail: "汇总核查发现，形成核查结果...", duration: 1500 },
    ],
    findings: [
      { level: "high", code: "FS001", text: "贮存间地面存在明显裂缝，未见防渗层完好记录，不满足《危险废物贮存污染控制标准》防渗要求。" },
      { level: "high", code: "FV001", text: "标签严重褪色模糊，无法辨识危废种类与代码，不满足标识要求。" },
      { level: "medium", code: "FL002", text: "现场标签标注的危废代码与台账记录不一致，存在标签信息与管理记录脱节风险。" },
      { level: "medium", code: "FV003", text: "液态危废容器未加盖密封，存在挥发与泄漏风险。" },
      { level: "low", code: "FR001", text: "贮存间入口未张贴危险废物识别标志，不满足规范化管理指标要求。" },
      { level: "low", code: "FR002", text: "现场记录本最后填写日期距今已超2个月，与台账更新频率不一致。" },
    ],
    summary: { total: 6, high: 2, medium: 2, low: 2, duration: "45 秒" },
  },
];

/* ═══════════════════════════════════════════════════════════
   SHARED
   ═══════════════════════════════════════════════════════════ */

function LogoMark({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="YIDIAN CST logo">
      <circle cx="32" cy="32" r="9" fill="currentColor" />
      <path d="M12 32C12 20.954 20.954 12 32 12C43.046 12 52 20.954 52 32C52 43.046 43.046 52 32 52" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      <path d="M19 18L26 11" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      <path d="M45 46L52 39" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════
   NAVIGATION
   ═══════════════════════════════════════════════════════════ */

function TopNav({ page, setPage }: { page: string; setPage: (p: string) => void }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const s = window.scrollY > 50;
      setScrolled(prev => prev === s ? prev : s);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const [menuOpen, setMenuOpen] = useState(false);

  const items = navItems;

  const bg = scrolled || menuOpen
    ? "bg-white/90 backdrop-blur-xl border-b border-emerald-100 shadow-sm"
    : "bg-transparent";

  const navigateTo = (p: string) => { setPage(p); setMenuOpen(false); };

  return (
    <header className={`fixed top-0 z-50 w-full transition-all duration-500 ${bg}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <button onClick={() => navigateTo("home")} className="flex items-center gap-3 text-emerald-900">
          <LogoMark className="h-7 w-7" />
          <div>
            <div className="text-[10px] tracking-[0.3em] uppercase text-emerald-600">YIDIAN CST</div>
            <div className="text-sm font-semibold">亿点环保</div>
          </div>
        </button>
        <nav className="hidden items-center gap-6 lg:flex">
          {items.map(([key, label]) => (
            <button key={key} onClick={() => navigateTo(key)}
              className={`text-sm transition-colors duration-200 ${
                page === key ? "font-semibold text-emerald-900" : "text-emerald-700/60 hover:text-emerald-900"
              }`}>
              {label}
            </button>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <button onClick={() => navigateTo("demo")}
            className="hidden sm:block rounded-full bg-gradient-to-r from-emerald-700 to-teal-600 px-5 py-2 text-sm font-medium text-white transition hover:from-emerald-800 hover:to-teal-700">
            立即体验
          </button>
          {/* Mobile hamburger */}
          <button onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "关闭菜单" : "打开菜单"} className="lg:hidden flex flex-col gap-1.5 p-1">
            <span className={`block h-0.5 w-5 bg-emerald-800 transition-transform ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block h-0.5 w-5 bg-emerald-800 transition-opacity ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 w-5 bg-emerald-800 transition-transform ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>
      </div>
      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden border-t border-emerald-100 bg-white px-6 py-4 space-y-1">
          {items.map(([key, label]) => (
            <button key={key} onClick={() => navigateTo(key)}
              className={`block w-full text-left py-2.5 text-sm transition ${
                page === key ? "font-semibold text-emerald-900" : "text-emerald-700/60"
              }`}>
              {label}
            </button>
          ))}
          <button onClick={() => navigateTo("demo")}
            className="mt-2 block w-full text-center rounded-full bg-gradient-to-r from-emerald-700 to-teal-600 py-2.5 text-sm font-medium text-white">
            立即体验
          </button>
        </div>
      )}
    </header>
  );
}

/* ── Count-up animation hook ── */
function useCountUp(end: number, duration = 1500, startOnView = true) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(!startOnView);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!startOnView || !ref.current) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setStarted(true); obs.disconnect(); } }, { threshold: 0.3 });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [startOnView]);

  useEffect(() => {
    if (!started) return;
    let rafId: number;
    const start = performance.now();
    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * end));
      if (progress < 1) rafId = requestAnimationFrame(step);
    };
    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [started, end, duration]);

  return { count, ref };
}

function CountUpStat({ num, suffix, label }: { num: number; suffix: string; label: string }) {
  const { count, ref } = useCountUp(num, 1800);
  return (
    <div ref={ref}>
      <div className="text-3xl font-bold text-emerald-800 md:text-4xl">{count}{suffix}</div>
      <div className="mt-1 text-xs text-emerald-700/40">{label}</div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   HOME PAGE
   ═══════════════════════════════════════════════════════════ */

function HomePage({ setPage }: { setPage: (p: string) => void }) {
  return (
    <div>
      {/* ── Hero ── */}
      <section className="relative min-h-screen overflow-hidden bg-gradient-to-b from-emerald-50/80 via-white to-white">
        <div className="pointer-events-none absolute -top-32 left-1/4 h-[500px] w-[500px] rounded-full bg-emerald-300/30 blur-[100px]" />
        <div className="pointer-events-none absolute top-20 right-1/4 h-[400px] w-[400px] rounded-full bg-sky-200/20 blur-[120px]" />
        <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 h-[300px] w-[300px] rounded-full bg-teal-300/20 blur-[80px]" />
        <div className="pointer-events-none absolute inset-0 opacity-40"
          style={{ backgroundImage: `radial-gradient(circle, #d1fae5 1px, transparent 1px)`, backgroundSize: "32px 32px" }} />
        <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[500px] w-[800px] rounded-full bg-emerald-200/40 blur-[120px]" />

        <div className="relative mx-auto flex min-h-[calc(100vh-2rem)] max-w-7xl flex-col items-center justify-center px-6 pt-24 pb-8 md:min-h-screen md:pt-20 md:pb-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-5 py-2.5 text-sm text-emerald-700 shadow-sm"
          >
            <BadgeCheck className="h-4 w-4 text-emerald-500" />
            已服务 500+ 企业 · 环保咨询 · 危废管理智能体
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8 max-w-4xl text-center"
          >
            <h1 className="font-display text-5xl font-bold leading-tight text-emerald-950 md:text-7xl lg:text-8xl">
              <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
                知微
              </span>
              <span className="ml-2 text-lg font-normal tracking-[0.15em] text-emerald-600/40 md:ml-3 md:text-2xl align-middle">
                Zhīwēi
              </span>
            </h1>
            <p className="mt-4 text-lg text-emerald-800/50 md:text-xl tracking-wide">
              知微知彰，知柔知刚 —— 《易经·系辞》
            </p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-8 text-center text-sm leading-8 text-emerald-900/70 md:text-base"
          >
            见微知著的管理智能体——从危废合规审查与鉴别复核开始，在复杂数据中洞察每一处关键偏差
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-8 flex flex-wrap justify-center gap-4"
          >
            <button onClick={() => setPage("zhiwei")}
              className="flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-700 to-teal-600 px-8 py-3.5 font-medium text-white shadow-lg shadow-teal-700/20 transition hover:from-emerald-800 hover:to-teal-700">
              了解知微 <ChevronRight className="h-4 w-4" />
            </button>
            <button onClick={() => setPage("demo")}
              className="flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-8 py-3.5 font-medium text-emerald-800 transition hover:bg-emerald-50">
              <Play className="h-4 w-4" /> 观看演示
            </button>
          </motion.div>

          {/* Product mockup */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="mt-16 w-full max-w-5xl"
          >
            <div className="rounded-2xl border border-emerald-200 bg-white p-1.5 shadow-2xl shadow-emerald-200/30">
              <div className="flex items-center gap-2 rounded-t-xl bg-emerald-50 px-4 py-3">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-red-400" />
                  <div className="h-3 w-3 rounded-full bg-amber-400" />
                  <div className="h-3 w-3 rounded-full bg-green-400" />
                </div>
                <div className="mx-auto rounded-lg bg-white px-4 py-1 text-xs text-emerald-600 border border-emerald-100">
                  trial.yidiancst.ai — 知微 · 管理智能体
                </div>
              </div>
              <div className="rounded-b-xl bg-gradient-to-b from-emerald-50/50 to-white p-4 md:p-8">
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-4">
                  <div className="rounded-xl border border-emerald-100 bg-white p-4 shadow-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex h-7 w-7 items-center justify-center rounded-md bg-emerald-100 text-emerald-600"><FileText className="h-3.5 w-3.5" /></div>
                      <div className="text-xs font-semibold text-emerald-950 md:text-[11px]">资料审查</div>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-emerald-100"><div className="h-1.5 w-[95%] rounded-full bg-emerald-500" /></div>
                    <div className="mt-1.5 text-xs text-emerald-600 md:text-[10px]">156 条记录 · 5 项发现</div>
                  </div>
                  <div className="rounded-xl border border-emerald-100 bg-white p-4 shadow-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex h-7 w-7 items-center justify-center rounded-md bg-teal-100 text-teal-600"><ShieldAlert className="h-3.5 w-3.5" /></div>
                      <div className="text-xs font-semibold text-emerald-950 md:text-[11px]">跨资料比对</div>
                    </div>
                    <div className="flex gap-1">
                      <span className="rounded bg-red-50 px-1.5 py-0.5 text-xs text-red-600 font-medium md:text-[10px]">高 3</span>
                      <span className="rounded bg-amber-50 px-1.5 py-0.5 text-xs text-amber-600 font-medium md:text-[10px]">中 2</span>
                    </div>
                    <div className="mt-1.5 text-xs text-emerald-600 md:text-[10px]">台账 × 许可 × 环评</div>
                  </div>
                  <div className="rounded-xl border border-emerald-100 bg-white p-4 shadow-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex h-7 w-7 items-center justify-center rounded-md bg-emerald-100 text-emerald-600"><Search className="h-3.5 w-3.5" /></div>
                      <div className="text-xs font-semibold text-emerald-950 md:text-[11px]">鉴别复核</div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs text-emerald-600 md:text-[10px]">问题树 8 棵</span>
                      <span className="text-emerald-300">·</span>
                      <span className="text-xs text-emerald-600 md:text-[10px]">证据链追溯</span>
                    </div>
                    <div className="mt-1.5 text-xs text-emerald-600 md:text-[10px]">专家初审辅助</div>
                  </div>
                  <div className="rounded-xl border border-emerald-100 bg-white p-4 shadow-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex h-7 w-7 items-center justify-center rounded-md bg-emerald-100 text-emerald-600"><Camera className="h-3.5 w-3.5" /></div>
                      <div className="text-xs font-semibold text-emerald-950 md:text-[11px]">现场核查</div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Eye className="h-2.5 w-2.5 text-emerald-500" />
                      <span className="text-xs text-emerald-600 md:text-[10px]">OCR + 视觉双通道</span>
                    </div>
                    <div className="mt-1.5 text-xs text-emerald-600 md:text-[10px]">8 张照片 · 6 项发现</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 核心优势 ── */}
      <section className="border-t border-emerald-100 bg-white py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <div className="text-xs font-medium tracking-[0.25em] uppercase text-emerald-500">优势 · Strengths</div>
            <h2 className="font-display mt-3 text-3xl font-bold text-emerald-950 md:text-4xl">知微的核心优势</h2>
            <p className="mt-4 text-sm text-emerald-800/50">不只是看见资料，而是看懂问题</p>
          </div>
          <div className="grid gap-6 md:grid-cols-4">
            {[
              { icon: FileSearch, title: "多源交叉审查", desc: "台账、环评、许可证多源资料交叉比对" },
              { icon: Layers, title: "专家逻辑研判", desc: "按资深固废专家思路组织问题，识别套码、混码、旧码惯性等实质风险" },
              { icon: ClipboardCheck, title: "证据链自动组织", desc: "自动关联资料依据、支撑证据、反证说明与可信性判断" },
              { icon: Shield, title: "全程本地可控", desc: "核心模型与敏感资料全程留在本地环境" },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="rounded-xl border border-emerald-100 p-5 text-center transition hover:border-emerald-200 hover:shadow-md">
                  <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 mb-4">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-sm font-semibold text-emerald-950">{item.title}</h3>
                  <p className="mt-1.5 text-xs leading-5 text-emerald-800/50">{item.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 知微产品 + 路线图 ── */}
      <section className="border-t border-emerald-100 bg-emerald-50/40 py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid items-center gap-16 md:grid-cols-2">
            <div>
              <div className="text-xs font-medium tracking-[0.25em] uppercase text-emerald-500">知微 · Zhīwēi</div>
              <h2 className="font-display mt-3 text-3xl font-bold text-emerald-950 md:text-4xl">
                知微管理智能体
              </h2>
              <p className="mt-4 text-base leading-8 text-emerald-800/50">
                从危废合规审查到鉴别复核，在海量资料中洞察细微偏差。管理智能体定位，聚焦风险提示与规范化审查。
              </p>
              <div className="mt-8 space-y-4">
                {[
                  { icon: Cpu, title: "危废合规智能审查", desc: "台账、排污许可、环评报告自动交叉比对，在海量资料中识别每一处不一致。" },
                  { icon: Search, title: "危废鉴别复核", desc: "基于问题树与证据链的鉴别报告专家初审辅助，覆盖采样、检测、标准适用性等关键环节。" },
                  { icon: Database, title: "环保数据底座", desc: "规则库、问题字典、行业知识图谱——将监管经验沉淀为可复用的数字资产。" },
                  { icon: BadgeCheck, title: "现场核查", desc: "OCR + AI 视觉双通道，现场照片自动识别标签、容器状态并与台账联动。" },
                ].map((p) => {
                  const Icon = p.icon;
                  return (
                    <div key={p.title} className="flex items-start gap-4 rounded-xl border border-emerald-200 bg-white p-4 transition hover:shadow-sm">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 flex-shrink-0">
                        <Icon className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-emerald-950">{p.title}</div>
                        <div className="mt-1 text-xs leading-6 text-emerald-800/50">{p.desc}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <button onClick={() => setPage("demo")}
                className="mt-8 flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-700 to-teal-600 px-6 py-2.5 text-sm font-medium text-white transition hover:from-emerald-800 hover:to-teal-700">
                <Play className="h-4 w-4" /> 体验产品演示
              </button>
            </div>
            {/* Right: Roadmap — 并排四框 */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { version: "V1", title: "台账智能审查", status: "done" },
                { version: "V1.5", title: "跨资料一致性比对", status: "done" },
                { version: "V2", title: "现场核查 + 鉴别复核", status: "progress" },
                { version: "V3", title: "全过程管理智能体", status: "next" },
              ].map((item, idx) => (
                <motion.div
                  key={item.version}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="rounded-xl border border-emerald-200 bg-white p-5 transition hover:shadow-sm"
                >
                  <div className={`flex h-10 w-10 items-center justify-center rounded-lg text-sm font-bold ${
                    item.status === "done"
                      ? "bg-gradient-to-br from-emerald-700 to-teal-600 text-white"
                      : item.status === "progress"
                      ? "bg-gradient-to-br from-teal-500 to-emerald-500 text-white"
                      : "bg-gradient-to-br from-teal-400 to-sky-400 text-white"
                  }`}>{item.version}</div>
                  <div className="mt-3 flex items-center gap-2">
                    <span className="text-sm font-semibold text-emerald-950">{item.title}</span>
                  </div>
                  <div className="mt-1">
                    {item.status === "done" && <span className="text-[10px] text-emerald-500 bg-emerald-50 rounded-full px-2 py-0.5">已上线</span>}
                    {item.status === "progress" && <span className="text-[10px] text-teal-600 bg-teal-50 rounded-full px-2 py-0.5">完善中</span>}
                    {item.status === "next" && <span className="text-[10px] text-white bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full px-2 py-0.5">Next</span>}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 服务 ── */}
      <section className="border-t border-emerald-100 bg-emerald-50/40 py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <div className="text-xs font-medium tracking-[0.25em] uppercase text-emerald-500">服务 · Services</div>
            <h2 className="font-display mt-3 text-3xl font-bold text-emerald-950 md:text-4xl">核心服务领域</h2>
          </div>
          <div className="grid gap-x-8 gap-y-8 md:gap-y-12 md:grid-cols-2 lg:grid-cols-3">
            {services.slice(0, 6).map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="group">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 transition group-hover:bg-emerald-100">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-semibold text-emerald-950">{item.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-emerald-800/50">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="border-t border-emerald-100 bg-white py-16">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4 text-center">
            <CountUpStat num={500} suffix="+" label="服务企业" />
            <CountUpStat num={8} suffix="" label="年行业深耕" />
            <CountUpStat num={4} suffix="" label="知微产品版本" />
            <CountUpStat num={7500} suffix="+" label="AI 训练样本" />
          </div>
        </div>
      </section>

      {/* ── 案例 ── */}
      <section className="border-t border-emerald-100 bg-emerald-50/40 py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <div className="text-xs font-medium tracking-[0.25em] uppercase text-emerald-500">案例 · Cases</div>
            <h2 className="font-display mt-3 text-3xl font-bold text-emerald-950 md:text-4xl">代表项目</h2>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {professionalCases.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="group rounded-xl border border-emerald-100 bg-white p-6 transition hover:border-emerald-200 hover:shadow-md"
              >
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {item.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-medium text-emerald-600">{tag}</span>
                  ))}
                </div>
                <h3 className="text-base font-semibold text-emerald-950">{item.title}</h3>
                <p className="mt-2 text-sm leading-7 text-emerald-800/50">{item.desc}</p>
                <div className="mt-4 flex gap-4 border-t border-emerald-50 pt-4">
                  {item.metrics.map((m) => (
                    <div key={m.label}>
                      <div className="text-lg font-bold text-emerald-700">{m.value}<span className="text-xs font-normal text-emerald-500">{m.unit}</span></div>
                      <div className="text-[10px] text-emerald-600/50">{m.label}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 关于 ── */}
      <section className="border-t border-emerald-100 bg-white py-20 md:py-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <div className="text-xs font-medium tracking-[0.25em] uppercase text-emerald-500">关于 · About</div>
          <h2 className="font-display mt-3 text-2xl font-bold text-emerald-950 md:text-3xl">广州市亿点环保有限公司</h2>
          <p className="mt-5 text-sm leading-8 text-emerald-800/50">
            亿点环保深耕环保咨询领域，服务覆盖环保管家、建设项目环评、危废全过程管理、清洁生产与双碳转型。
            我们相信，环保合规不应只靠经验判断——「知微」智能体将监管经验与 AI 能力融合，
            从台账审查、跨资料比对到鉴别复核，帮助企业在复杂的合规环境中看清每一处细节。
          </p>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="border-t border-emerald-100 bg-emerald-50/40 py-24 md:py-28">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="font-display text-2xl font-bold text-emerald-950 md:text-4xl leading-tight">
            让知微为您洞察合规细节
          </h2>
          <p className="mt-4 text-sm text-emerald-800/50">
            交流环保咨询、项目合作与知微智能体演示需求，我们随时准备好。
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <button onClick={() => setPage("contact")}
              className={`${btnPrimary} px-7 py-2.5`}>
              联系我们
            </button>
            <button onClick={() => setPage("demo")}
              className={`${btnSecondary} px-7 py-2.5`}>
              产品演示
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   ABOUT PAGE
   ═══════════════════════════════════════════════════════════ */

function AboutPage() {

  return (
    <div className="min-h-screen bg-white pt-28 pb-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-xs font-medium tracking-[0.25em] uppercase text-emerald-600">关于 · About</div>
        <h2 className="font-display mt-4 text-3xl font-bold text-emerald-950 md:text-5xl">关于我们</h2>
        <p className="mt-6 max-w-3xl text-base leading-8 text-emerald-800/60">
          广州市亿点环保有限公司专注于环保咨询服务与环保数字化能力建设，致力于以专业技术经验和智能审查工具，服务企业环保合规管理与复杂资料审查场景。
        </p>

        {/* 我们的定位 */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-emerald-950">我们的定位</h3>
          <p className="mt-4 max-w-3xl text-sm leading-8 text-emerald-800/60">
            亿点环保立足环保专业服务，同时持续推进危险废物管理场景的数字化能力建设。
            我们关注的不只是资料是否齐全，更关注资料能否支撑判断、问题能否追溯依据、审查结果能否被复核。
            知微正是在这一思路下形成的专业智能审查产品。
          </p>
        </div>

        {/* 我们的能力 */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-emerald-950">我们的能力</h3>
          <p className="mt-4 max-w-3xl text-sm leading-8 text-emerald-800/60">
            公司拥有环境影响评价、排污许可、危废管理、清洁生产等领域的咨询经验，
            在此基础上，将规则体系、专业审查经验与智能识别能力结合，逐步形成知微这一面向危险废物资料审查与鉴别复核辅助场景的智能产品。
          </p>
          <div className="mt-8 grid grid-cols-2 gap-6 md:grid-cols-4">
            {[
              "多领域环保咨询经验",
              "危废资料审查能力持续沉淀",
              "知微智能体持续迭代",
              "广州总部服务珠三角",
            ].map((item) => (
              <div key={item} className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-5 text-center">
                <p className="text-sm font-medium text-emerald-800">{item}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 当前产品进展 */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-emerald-950">当前产品进展</h3>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-emerald-200 bg-white p-6">
              <h4 className="text-base font-semibold text-emerald-950">主线能力持续稳定</h4>
              <p className="mt-3 text-sm leading-7 text-emerald-800/60">
                围绕跨资料一致性比对场景，持续打磨资料读取、字段抽取、对象对齐、问题发现与结构化输出能力。
              </p>
            </div>
            <div className="rounded-2xl border border-emerald-200 bg-white p-6">
              <h4 className="text-base font-semibold text-emerald-950">专业审查能力持续增强</h4>
              <p className="mt-3 text-sm leading-7 text-emerald-800/60">
                围绕鉴别复核场景，持续完善全文读取、问题树扫描、证据包构建与专家复核表达能力。
              </p>
            </div>
            <div className="rounded-2xl border border-emerald-200 bg-white p-6">
              <h4 className="text-base font-semibold text-emerald-950">部署与安全能力持续加强</h4>
              <p className="mt-3 text-sm leading-7 text-emerald-800/60">
                持续完善本地部署、服务端代理、访问鉴权、限流与错误脱敏等安全机制，提升演示和实际交付的可控性。
              </p>
            </div>
          </div>
        </div>

        {/* 公司信息 */}
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {contactInfo.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.text} className="rounded-2xl border border-emerald-200 bg-white p-6">
                <Icon className="h-5 w-5 text-emerald-600" />
                <div className="mt-4 text-xs text-emerald-600">{item.label}</div>
                <div className="mt-1 font-medium text-emerald-950">{item.text}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   SUB PAGES
   ═══════════════════════════════════════════════════════════ */

function ServicesPage() {
  return (
    <div className="min-h-screen bg-white pt-28 pb-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-xs font-medium tracking-[0.25em] uppercase text-emerald-600">服务 · Services</div>
        <h2 className="font-display mt-4 text-3xl font-bold text-emerald-950 md:text-5xl">服务范围</h2>
        <p className="mt-4 text-base text-emerald-800/60">覆盖环保合规管理与专业技术服务的多场景支撑能力</p>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-emerald-800/50">
          公司提供环保专业咨询服务，并可结合知微智能体能力，辅助开展危险废物资料审查、跨资料一致性核查与复核辅助。
        </p>
        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {services.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="rounded-2xl border border-emerald-200 bg-white p-6 transition hover:shadow-lg">
                <Icon className="h-6 w-6 text-emerald-600" />
                <h3 className="mt-5 text-lg font-semibold text-emerald-950">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-emerald-800/60">{item.desc}</p>
              </div>
            );
          })}
        </div>
        <p className="mt-10 text-center text-sm text-emerald-700/50">
          对涉及复杂资料链、长文本附件和多来源数据的项目，可结合知微开展前置审查与辅助核查。
        </p>
      </div>
    </div>
  );
}

function CasesPage() {
  return (
    <div className="min-h-screen bg-white pt-28 pb-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-xs font-medium tracking-[0.25em] uppercase text-emerald-600">案例 · Cases</div>
        <h2 className="font-display mt-4 text-3xl font-bold text-emerald-950 md:text-5xl">项目案例</h2>
        <p className="mt-4 text-base text-emerald-800/60">专业服务案例与产品验证案例并行展示</p>

        {/* 专业服务案例 */}
        <h3 className="mt-16 text-xl font-bold text-emerald-950">专业服务案例</h3>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {professionalCases.map((item) => (
            <div key={item.title} className="rounded-2xl border border-emerald-200 bg-white p-6 transition hover:shadow-lg">
              <div className="flex flex-wrap gap-1.5 mb-3">
                {item.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-medium text-emerald-600">{tag}</span>
                ))}
              </div>
              <h4 className="mt-2 text-lg font-semibold text-emerald-950">{item.title}</h4>
              <p className="mt-3 text-sm leading-7 text-emerald-800/60">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* 产品验证案例 */}
        <h3 className="mt-16 text-xl font-bold text-emerald-950">产品验证案例</h3>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {productCases.map((item) => (
            <div key={item.title} className="rounded-2xl border border-emerald-200 bg-white p-6 transition hover:shadow-lg">
              <div className="flex flex-wrap gap-1.5 mb-3">
                {item.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-teal-50 px-2.5 py-0.5 text-[10px] font-medium text-teal-600">{tag}</span>
                ))}
              </div>
              <h4 className="mt-2 text-lg font-semibold text-emerald-950">{item.title}</h4>
              <p className="mt-3 text-sm leading-7 text-emerald-800/60">{item.desc}</p>
              <p className="mt-4 text-xs text-emerald-600/40 border-t border-emerald-100 pt-3">
                以上为脱敏展示，用于呈现系统能力边界与适用场景，不对应真实企业公开信息。
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ZhiweiPage({ setPage }: { setPage: (p: string) => void }) {
  return (
    <div className="min-h-screen bg-white pt-28 pb-20">
      <div className="mx-auto max-w-7xl px-6">
        {/* 页头 */}
        <div className="text-xs font-medium tracking-[0.25em] uppercase text-emerald-600">知微 · Zhīwēi</div>
        <h2 className="font-display mt-4 text-3xl font-bold text-emerald-950 md:text-5xl">知微｜危废管理智能体</h2>
        <p className="mt-2 text-base text-emerald-800/60">面向危险废物资料审查、跨资料一致性比对与鉴别复核辅助场景</p>
        <p className="mt-6 max-w-3xl text-sm leading-8 text-emerald-800/50">
          知微强调的不是"自动给答案"，而是围绕复杂资料开展专业审查辅助。
          它尽量从长文本、附件、多来源数据中识别问题、归集依据、构建证据链，并形成结构化审查结果或可复核底稿。
        </p>

        {/* 核心能力 */}
        <h3 className="mt-16 text-2xl font-bold text-emerald-950">核心能力</h3>
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: BookOpen, title: "多类资料读取与识别", desc: "支持台账、环评、排污许可、鉴别报告及相关附件的读取与识别。" },
            { icon: FileSearch, title: "文档分类与信息抽取", desc: "提取关键字段、数据和表述信息，辅助后续审查。" },
            { icon: Layers, title: "危废对象标准化对齐", desc: "对不同来源资料中的同类危废对象进行标准化关联。" },
            { icon: ShieldAlert, title: "跨资料一致性比对", desc: "围绕名称、代码、数量、处置方式等信息开展交叉核查。" },
            { icon: Search, title: "问题发现与依据匹配", desc: "围绕已识别问题进行标准要求、原文表述和相关依据的归集。" },
            { icon: Database, title: "证据包构建", desc: "在适用场景下尽量形成原文、数据、依据、计算和风险分析的组合证据链。" },
            { icon: ClipboardCheck, title: "复核表达输出", desc: "辅助形成结构化审查结果或可供复核修改的底稿。" },
            { icon: Lock, title: "本地部署与安全控制", desc: "强调资料可控、接口受控和本地运行能力。" },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="rounded-2xl border border-emerald-200 bg-white p-5 transition hover:shadow-lg">
                <Icon className="h-5 w-5 text-emerald-600" />
                <h4 className="mt-4 text-sm font-semibold text-emerald-950">{item.title}</h4>
                <p className="mt-2 text-xs leading-6 text-emerald-800/60">{item.desc}</p>
              </div>
            );
          })}
        </div>

        {/* 核心流程 */}
        <h3 className="mt-16 text-2xl font-bold text-emerald-950">核心流程</h3>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2 text-sm text-emerald-800/70">
          {["资料接收", "全文读取 / 识别", "信息抽取", "对象对齐", "问题发现", "依据归集", "证据构建", "审查输出"].map((step, idx, arr) => (
            <React.Fragment key={step}>
              <span className="rounded-lg bg-emerald-50 border border-emerald-200 px-4 py-2 font-medium">{step}</span>
              {idx < arr.length - 1 && <ChevronRight className="h-4 w-4 text-emerald-400" />}
            </React.Fragment>
          ))}
        </div>

        {/* 技术架构 */}
        <h3 className="mt-16 text-2xl font-bold text-emerald-950">技术架构</h3>
        <p className="mt-4 text-sm text-emerald-800/50">知微以规则能力、专业知识、智能识别和本地部署能力协同支撑复杂资料审查。</p>
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
          {["规则能力", "专业知识", "智能识别", "本地部署"].map((item) => (
            <div key={item} className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-5 text-center">
              <p className="text-sm font-semibold text-emerald-800">{item}</p>
            </div>
          ))}
        </div>

        {/* 当前系统能力 */}
        <h3 className="mt-16 text-2xl font-bold text-emerald-950">当前系统能力</h3>
        <div className="mt-8 grid gap-3 md:grid-cols-2">
          {[
            "多类资料读取与 OCR", "文档分类与字段抽取", "危废对象标准化关联", "跨资料一致性比对",
            "依据匹配与问题说明", "结构化审查结果输出", "本地部署与安全控制能力", "产品演示与持续迭代能力",
          ].map((item) => (
            <div key={item} className="flex items-center gap-3 rounded-xl border border-emerald-100 bg-white p-4 text-sm text-emerald-800/70">
              <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0" /> {item}
            </div>
          ))}
        </div>

        {/* 产品边界 */}
        <h3 className="mt-16 text-2xl font-bold text-emerald-950">产品边界</h3>
        <div className="mt-8 grid gap-8 md:grid-cols-2">
          <div className="rounded-2xl border border-emerald-200 bg-white p-6">
            <h4 className="text-base font-semibold text-emerald-950 mb-4">主要辅助内容</h4>
            <div className="space-y-2.5">
              {["资料读取与解析", "一致性比对", "风险提示", "核查辅助", "依据归集", "审查结果输出", "复核底稿辅助生成"].map((item) => (
                <div key={item} className="flex items-center gap-3 text-sm text-emerald-800/70">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0" /> {item}
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-red-100 bg-white p-6">
            <h4 className="text-base font-semibold text-emerald-950 mb-4">不替代的内容</h4>
            <div className="space-y-2.5">
              {["违法违规定性", "行政处罚建议", "执法裁量判断", "最终专家定论"].map((item) => (
                <div key={item} className="flex items-center gap-3 text-sm text-red-700/60">
                  <AlertTriangle className="h-4 w-4 text-red-400 flex-shrink-0" /> {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 信息安全保障 */}
        <h3 className="mt-16 text-2xl font-bold text-emerald-950">信息安全保障</h3>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-emerald-800/50">
          知微默认采用本地部署思路，核心模型、知识库与审查链路可在本地环境运行。
          系统强调敏感资料留存在可控环境中，并通过服务端代理、访问鉴权、白名单、速率限制与错误脱敏等措施，提升产品演示与实际部署过程中的信息安全保障能力。
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-5">
          {[
            { icon: Server, title: "本地部署", desc: "核心能力可在本地环境运行" },
            { icon: Database, title: "本地知识库", desc: "减少敏感资料外发风险" },
            { icon: Shield, title: "服务端代理", desc: "浏览器不直连敏感后台接口" },
            { icon: Lock, title: "鉴权保护", desc: "会话与接口均有访问控制" },
            { icon: ShieldCheck, title: "安全控制", desc: "支持白名单、限流与错误脱敏" },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="rounded-xl border border-emerald-200 bg-white p-4 text-center">
                <Icon className="mx-auto h-5 w-5 text-emerald-600 mb-2" />
                <h4 className="text-xs font-semibold text-emerald-950">{item.title}</h4>
                <p className="mt-1 text-[11px] leading-5 text-emerald-800/50">{item.desc}</p>
              </div>
            );
          })}
        </div>
        <p className="mt-6 text-center text-sm text-emerald-700/50">
          系统定位为资料审查与复核辅助工具，强调专业支撑、信息安全与可控部署。
        </p>

        {/* CTA */}
        <div className="mt-16 rounded-2xl border border-emerald-200 bg-emerald-50/50 p-10 text-center">
          <h3 className="text-xl font-bold text-emerald-950">了解知微的实际应用方式</h3>
          <p className="mt-3 max-w-2xl mx-auto text-sm leading-7 text-emerald-800/50">
            可结合产品演示、现场交流与本地部署方案，进一步了解知微在危险废物资料审查与复核辅助场景中的适用方式。
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <button onClick={() => setPage("demo")}
              className={`${btnPrimary} px-7 py-2.5`}>
              查看演示
            </button>
            <button onClick={() => setPage("contact")}
              className={`${btnSecondary} px-7 py-2.5`}>
              联系我们
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ContactPage() {
  return (
    <div className="min-h-screen bg-white pt-28 pb-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-xs font-medium tracking-[0.25em] uppercase text-emerald-600">联络 · Contact</div>
        <h2 className="font-display mt-4 text-3xl font-bold text-emerald-950 md:text-5xl">联系我们</h2>
        <p className="mt-6 text-base text-emerald-800/60">欢迎咨询环保专业服务、知微产品介绍及本地部署应用方式</p>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-emerald-800/50">
          如您关注危险废物资料审查、跨资料一致性比对、鉴别复核辅助或本地部署应用，欢迎与我们联系。
        </p>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {contactInfo.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.text} className="rounded-2xl border border-emerald-200 bg-white p-6 transition hover:shadow-lg">
                <Icon className="h-5 w-5 text-emerald-600" />
                <div className="mt-4 text-xs text-emerald-600">{item.label}</div>
                <div className="mt-1 font-medium text-emerald-950">{item.text}</div>
              </div>
            );
          })}
        </div>
        <div className="mt-12 rounded-2xl border border-emerald-200 bg-emerald-50/50 p-8">
          <p className="text-sm text-emerald-800/60 mb-6">
            我们可根据实际需求，介绍知微适用场景、能力边界与部署方式。
          </p>
          <h3 className="text-lg font-semibold text-emerald-950 mb-4">留言咨询</h3>
          <form onSubmit={(e) => e.preventDefault()} className="grid gap-4 md:grid-cols-2">
            <div>
              <label htmlFor="contact-name" className="block text-xs text-emerald-600 mb-1.5">姓名</label>
              <input id="contact-name" className="w-full rounded-lg border border-emerald-200 bg-white px-4 py-2.5 text-sm text-emerald-950 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-200" />
            </div>
            <div>
              <label htmlFor="contact-phone" className="block text-xs text-emerald-600 mb-1.5">联系方式</label>
              <input id="contact-phone" className="w-full rounded-lg border border-emerald-200 bg-white px-4 py-2.5 text-sm text-emerald-950 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-200" />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="contact-message" className="block text-xs text-emerald-600 mb-1.5">咨询内容</label>
              <textarea id="contact-message" className="w-full rounded-lg border border-emerald-200 bg-white px-4 py-2.5 text-sm text-emerald-950 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-200 h-24 resize-none" />
            </div>
            <div className="md:col-span-2">
              <button type="submit" className={`${btnPrimary} px-7 py-2.5`}>
                提交咨询
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   DEMO PAGE
   ═══════════════════════════════════════════════════════════ */

function FindingBadge({ level }: { level: string }) {
  const styles: Record<string, string> = { high: "bg-red-50 text-red-600 border-red-200", medium: "bg-amber-50 text-amber-600 border-amber-200", low: "bg-sky-50 text-sky-600 border-sky-200" };
  const labels: Record<string, string> = { high: "高风险", medium: "中风险", low: "低风险" };
  return <span className={`inline-flex rounded-full border px-2.5 py-0.5 text-xs font-medium ${styles[level]}`}>{labels[level]}</span>;
}

function DemoFlowPage({ scenario, onBack }: { scenario: DemoScenario; onBack: () => void }) {
  const [phase, setPhase] = useState<"upload" | "running" | "done">("upload");
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [visibleFindings, setVisibleFindings] = useState(0);

  const setDemoPhase = useCallback((p: "upload" | "running") => { setPhase(p); setCurrentStep(0); setProgress(0); setVisibleFindings(0); }, []);
  const startDemo = useCallback(() => setDemoPhase("running"), [setDemoPhase]);
  const resetDemo = useCallback(() => setDemoPhase("upload"), [setDemoPhase]);

  useEffect(() => {
    if (phase !== "running") return;
    if (currentStep >= scenario.steps.length) { const t = setTimeout(() => setPhase("done"), 800); return () => clearTimeout(t); }
    const dur = scenario.steps[currentStep].duration;
    let el = 0;
    const timer = setInterval(() => {
      el += 50;
      setProgress(((currentStep + Math.min(el / dur, 1)) / scenario.steps.length) * 100);
      if (el >= dur) { clearInterval(timer); setCurrentStep((s) => s + 1); }
    }, 50);
    return () => clearInterval(timer);
  }, [phase, currentStep, scenario.steps]);

  useEffect(() => {
    if (phase !== "done" || visibleFindings >= scenario.findings.length) return;
    const t = setTimeout(() => setVisibleFindings((v) => v + 1), 300);
    return () => clearTimeout(t);
  }, [phase, visibleFindings, scenario.findings.length]);

  const Icon = scenario.icon;

  return (
    <div className="min-h-screen bg-white pt-24">
      <div className="border-b border-emerald-100 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3">
          <button onClick={onBack} className="flex items-center gap-2 text-sm text-emerald-600 hover:text-emerald-900">
            <ArrowLeft className="h-4 w-4" /> 返回
          </button>
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">{scenario.tag}</span>
            <span className="text-sm font-semibold text-emerald-950">{scenario.version}</span>
          </div>
          <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs text-emerald-700">演示模式</span>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-6 py-10">
        {phase === "upload" && (
          <div className="space-y-8">
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200">
                <Icon className="h-7 w-7" />
              </div>
              <h2 className="font-display mt-6 text-2xl font-bold text-emerald-950 md:text-3xl">{scenario.title}</h2>
              <p className="mt-3 text-base text-emerald-800/50">{scenario.desc}</p>
            </div>
            <div className="rounded-2xl border-2 border-dashed border-emerald-200 bg-emerald-50/30 p-8">
              <div className="text-center text-sm text-emerald-600 mb-6">已预置演示文件</div>
              <div className="space-y-3">
                {scenario.files.map((f) => { const FI = f.icon; return (
                  <div key={f.name} className="flex items-center gap-4 rounded-xl border border-emerald-100 bg-white p-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600"><FI className="h-5 w-5" /></div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-emerald-950 truncate">{f.name}</div>
                      <div className="text-xs text-emerald-600/50">{f.type} · {f.size}</div>
                    </div>
                    <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                  </div>
                ); })}
              </div>
            </div>
            <div className="flex justify-center">
              <button onClick={startDemo} className="flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-700 to-teal-600 px-10 py-3.5 font-medium text-white hover:from-emerald-800 hover:to-teal-700">
                <Play className="h-5 w-5" /> 开始审查演示
              </button>
            </div>
          </div>
        )}

        {phase === "running" && (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-emerald-950">审查进行中...</h2>
              <p className="mt-2 text-sm text-emerald-800/50">{scenario.title}</p>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-emerald-700/50">总进度</span>
                <span className="font-mono font-semibold text-emerald-900">{Math.round(progress)}%</span>
              </div>
              <div className="h-1.5 rounded-full bg-emerald-100 overflow-hidden">
                <div className="h-full rounded-full bg-emerald-500 transition-all duration-200" style={{ width: `${progress}%` }} />
              </div>
            </div>
            <div className="rounded-2xl border border-emerald-200 bg-white p-6">
              {currentStep < scenario.steps.length ? (
                <div className="flex items-start gap-4">
                  <Loader2 className="h-6 w-6 animate-spin text-emerald-500 mt-0.5" />
                  <div>
                    <div className="text-lg font-semibold text-emerald-950">{scenario.steps[currentStep].label}</div>
                    <p className="mt-2 text-sm text-emerald-800/50">{scenario.steps[currentStep].detail}</p>
                    {currentStep === 0 && <div className="mt-4 rounded-xl bg-emerald-50 p-4 text-sm text-emerald-800">{scenario.parseResult}</div>}
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-4">
                  <CheckCircle2 className="h-6 w-6 text-emerald-500" />
                  <div className="text-lg font-semibold text-emerald-950">所有审查步骤已完成</div>
                </div>
              )}
              {currentStep > 0 && (
                <div className="mt-6 space-y-2 border-t border-emerald-100 pt-4">
                  {scenario.steps.slice(0, currentStep).map((s, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-sm text-emerald-700/50">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500" /> {s.label}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {phase === "done" && (
          <div className="space-y-8">
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50">
                <CheckCircle2 className="h-8 w-8 text-emerald-500" />
              </div>
              <h2 className="font-display mt-5 text-2xl font-bold text-emerald-950 md:text-3xl">审查完成</h2>
              <p className="mt-2 text-sm text-emerald-800/50">耗时 {scenario.summary.duration}</p>
            </div>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {[
                { l: "问题总数", v: scenario.summary.total, c: "text-emerald-950" },
                { l: "高风险", v: scenario.summary.high, c: "text-red-600" },
                { l: "中风险", v: scenario.summary.medium, c: "text-amber-600" },
                { l: "低风险", v: scenario.summary.low, c: "text-sky-600" },
              ].map((s) => (
                <div key={s.l} className="rounded-2xl border border-emerald-200 bg-white p-5 text-center">
                  <div className={`text-3xl font-bold ${s.c}`}>{s.v}</div>
                  <div className="mt-1 text-xs text-emerald-800/40">{s.l}</div>
                </div>
              ))}
            </div>
            <div className="rounded-2xl border border-emerald-200 bg-white p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-emerald-950">审查发现清单</h3>
                <div className="flex items-center gap-2 text-xs text-emerald-700/40"><Eye className="h-3.5 w-3.5" /> {visibleFindings} / {scenario.findings.length}</div>
              </div>
              <div className="space-y-3">
                {scenario.findings.slice(0, visibleFindings).map((f) => (
                  <motion.div key={f.code} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    className="flex gap-4 rounded-xl border border-emerald-100 bg-emerald-50/30 p-4">
                    <div className="flex flex-col items-start gap-2 flex-shrink-0">
                      <FindingBadge level={f.level} />
                      <span className="font-mono text-xs text-emerald-700/30">{f.code}</span>
                    </div>
                    <p className="text-sm leading-7 text-emerald-900/70">{f.text}</p>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="flex flex-col items-center gap-4">
              <button onClick={resetDemo} className="flex items-center gap-2 rounded-full border border-emerald-200 px-6 py-2.5 text-sm text-emerald-700 hover:bg-emerald-50">
                <RotateCcw className="h-4 w-4" /> 重新播放
              </button>
              <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-6 py-3 text-center">
                <p className="text-xs text-emerald-700/60">以上为脱敏演示数据。知微定位为资料审查与复核辅助工具，不替代最终专家判断，不直接输出执法结论。</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function DemoShowcasePage() {
  const [sel, setSel] = useState<string | null>(null);
  if (sel) { const sc = demoScenarios.find((s) => s.id === sel)!; return <DemoFlowPage scenario={sc} onBack={() => setSel(null)} />; }

  return (
    <div className="min-h-screen bg-white pt-24">
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h1 className="font-display text-4xl font-bold text-emerald-950 md:text-5xl">知微产品演示</h1>
          <p className="mt-4 max-w-2xl mx-auto text-base leading-8 text-emerald-800/50">
            请选择一个典型场景，了解知微在危险废物资料审查与复核辅助中的应用方式。
          </p>
          <p className="mt-2 text-sm text-emerald-700/40">
            本页面展示均为脱敏案例演示，不涉及真实企业公开信息。
          </p>
        </div>
      </section>
      <section className="pb-16">
        <div className="mx-auto max-w-4xl px-6 grid gap-6 md:grid-cols-3">
          {demoScenarios.map((s) => {
            const Icon = s.icon;
            return (
              <motion.button key={s.id} onClick={() => setSel(s.id)} whileHover={{ y: -3 }}
                className="group rounded-xl border border-emerald-200 bg-white p-6 text-left transition hover:shadow-lg hover:border-emerald-300">
                <div className="flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 transition group-hover:bg-emerald-100">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">{s.tag}</span>
                </div>
                <h3 className="mt-5 text-lg font-bold text-emerald-950">{s.version}</h3>
                <p className="mt-2 text-sm leading-7 text-emerald-800/50">{s.desc}</p>
                <div className="mt-5 flex items-center gap-2 text-sm font-medium text-emerald-600 group-hover:text-emerald-800">
                  <Play className="h-4 w-4" /> 查看演示 <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </motion.button>
            );
          })}
        </div>
      </section>

      {/* 产品路线 */}
      <section className="border-t border-emerald-100 py-16">
        <div className="mx-auto max-w-3xl px-6">
          <h3 className="text-center text-lg font-bold text-emerald-950 mb-8">演示场景与成熟度</h3>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {[
              { label: "当前重点展示", title: "跨资料一致性比对", color: "bg-emerald-100 text-emerald-700" },
              { label: "持续完善中", title: "鉴别复核辅助", color: "bg-teal-100 text-teal-700" },
              { label: "拓展方向演示", title: "现场核查辅助", color: "bg-emerald-100/50 text-emerald-600/50" },
              { label: "长期目标", title: "全过程危废管理智能体", color: "bg-emerald-50/50 text-emerald-600/40" },
            ].map((item) => (
              <div key={item.title} className="rounded-xl border border-emerald-200 bg-white p-4 text-center">
                <div className={`inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-medium ${item.color}`}>{item.label}</div>
                <p className="mt-2 text-xs font-semibold text-emerald-950">{item.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 演示声明 */}
      <section className="border-t border-emerald-100 py-10">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-6">
            <div className="flex items-center justify-center gap-2 text-sm font-medium text-emerald-700">
              <AlertTriangle className="h-4 w-4" /> 演示声明
            </div>
            <p className="mt-3 text-sm leading-7 text-emerald-800/40">
              本页面仅用于展示产品能力边界与适用场景，页面中的企业名称、数据及材料均为脱敏或虚构示例。
              知微定位为资料审查与复核辅助工具，聚焦问题发现、依据归集与结构化表达，不替代最终专家判断，不直接输出执法结论。
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   FOOTER
   ═══════════════════════════════════════════════════════════ */

function Footer({ setPage }: { setPage: (p: string) => void }) {
  return (
    <footer className="border-t border-emerald-100 bg-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-3 text-emerald-900">
            <LogoMark className="h-6 w-6" />
            <div>
              <div className="text-[10px] tracking-[0.3em] uppercase text-emerald-500">YIDIAN CST</div>
              <div className="text-sm font-semibold">广州市亿点环保有限公司｜知微危废管理智能体</div>
            </div>
          </div>
          <p className="mt-4 max-w-md text-xs leading-6 text-emerald-800/40">
            专注环保咨询服务与数字化产品建设。知微智能体，从危废合规审查与鉴别复核开始，见微知著。
          </p>
        </div>
        <div>
          <div className="text-xs font-semibold text-emerald-700 mb-3">快速链接</div>
          <div className="grid gap-1.5 text-xs text-emerald-800/50">
            {[
              ["about", "关于我们"], ["services", "服务范围"], ["zhiwei", "知微智能体"],
              ["cases", "项目案例"], ["contact", "联系我们"],
            ].map(([key, label]) => (
              <button key={key} onClick={() => setPage(key)} className="text-left hover:text-emerald-700 transition">
                {label}
              </button>
            ))}
          </div>
        </div>
        <div className="grid gap-2 text-xs text-emerald-800/50">
          {contactInfo.map((item) => { const Icon = item.icon; return (
            <div key={item.text} className="flex items-center gap-3">
              <Icon className="h-3.5 w-3.5 text-emerald-400" /> {item.text}
            </div>
          ); })}
        </div>
      </div>
      <div className="border-t border-emerald-100 py-5 text-center text-xs text-emerald-800/30">
        &copy; {CURRENT_YEAR} 广州市亿点环保有限公司 &middot; YIDIAN CST
      </div>
    </footer>
  );
}

/* ── Scroll to top button ── */
function ScrollToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      const s = window.scrollY > 400;
      setShow(prev => prev === s ? prev : s);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-emerald-700 to-teal-600 text-white shadow-lg shadow-teal-700/20 transition hover:from-emerald-800 hover:to-teal-700"
          aria-label="回到顶部"
        >
          <ArrowUp className="h-4 w-4" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

/* ═══════════════════════════════════════════════════════════
   ROOT
   ═══════════════════════════════════════════════════════════ */

function getPageFromHash(): string {
  if (typeof window === "undefined") return "home";
  const hash = window.location.hash.replace("#", "");
  const valid = ["home", "about", "services", "cases", "zhiwei", "contact", "demo"];
  return valid.includes(hash) ? hash : "home";
}

export default function YidianEcoSite() {
  const [page, setPageState] = useState("home");

  useEffect(() => {
    setPageState(getPageFromHash());
    const onHash = () => setPageState(getPageFromHash());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const setPage = useCallback((p: string) => {
    window.location.hash = p === "home" ? "" : p;
    if (p === "home" && window.location.hash === "") setPageState("home");
  }, []);

  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, [page]);

  let content;
  if (page === "about") content = <AboutPage />;
  else if (page === "services") content = <ServicesPage />;
  else if (page === "cases") content = <CasesPage />;
  else if (page === "zhiwei") content = <ZhiweiPage setPage={setPage} />;
  else if (page === "contact") content = <ContactPage />;
  else if (page === "demo") content = <DemoShowcasePage />;
  else content = <HomePage setPage={setPage} />;

  return (
    <div className="min-h-screen bg-white">
      <TopNav page={page} setPage={setPage} />
      <AnimatePresence mode="wait">
        <motion.div
          key={page}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          {content}
        </motion.div>
      </AnimatePresence>
      <Footer setPage={setPage} />
      <ScrollToTop />
    </div>
  );
}
