"use client";

import React, { useMemo, useState } from "react";
import {
  Building2,
  Cpu,
  Leaf,
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  Lock,
  User,
  KeyRound,
  ChevronRight,
  FileSpreadsheet,
  Bot,
  AlertTriangle,
  Sparkles,
  CheckCircle2,
  Search,
  Clock3,
  Database,
  MessageSquare,
  ArrowRight,
  Upload,
  ClipboardList,
  ShieldAlert,
  BadgeCheck,
  Recycle,
  Factory,
  FileCheck2,
  BarChart3,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function LogoMark({ className = "h-8 w-8" }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="YIDIAN CST logo">
      <circle cx="32" cy="32" r="9" fill="currentColor" />
      <path d="M12 32C12 20.954 20.954 12 32 12C43.046 12 52 20.954 52 32C52 43.046 43.046 52 32 52" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      <path d="M19 18L26 11" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      <path d="M45 46L52 39" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

function BrandBlock() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-emerald-200 bg-white text-emerald-900 shadow-sm">
        <LogoMark className="h-8 w-8" />
      </div>
      <div>
        <div className="text-xs tracking-[0.24em] text-emerald-700 uppercase">YIDIAN CST</div>
        <div className="font-semibold text-emerald-950">广州市亿点环保有限公司</div>
      </div>
    </div>
  );
}

function SectionTitle({ eyebrow, title, desc }: { eyebrow: string; title: string; desc: string }) {
  return (
    <div className="max-w-3xl">
      <div className="text-sm font-semibold tracking-[0.2em] text-emerald-700 uppercase">{eyebrow}</div>
      <h2 className="mt-3 text-3xl md:text-4xl font-bold text-emerald-950">{title}</h2>
      <p className="mt-4 text-base md:text-lg text-emerald-900/80 leading-8">{desc}</p>
    </div>
  );
}

const services = [
  { icon: FileCheck2, title: "环保管家与合规咨询", desc: "围绕企业日常环保管理、排污许可、资料规范化和监管应对，提供持续性顾问支持。" },
  { icon: Factory, title: "建设项目环保服务", desc: "涵盖建设项目环境影响评价、三废污染防治工程配套咨询、应急预案与竣工验收支撑。" },
  { icon: Recycle, title: "危废与固废管理", desc: "围绕危险废物管理台账、贮存规范、转移资料、合规审查与风险提示提供数字化支持。" },
  { icon: Leaf, title: "VOCs与清洁生产", desc: "提供 VOCs 治理咨询、清洁生产审核与绿色制造体系建设服务。" },
  { icon: BarChart3, title: "双碳与绿色转型", desc: "支持碳达峰、碳中和相关咨询，协助企业开展绿色低碳能力建设。" },
  { icon: ShieldCheck, title: "政府专项资金申报", desc: "协助企业梳理申报条件、材料与项目逻辑，提升环保专项资金申报效率。" },
];

const advantages = [
  "管理智能体定位：当前重点产品不是平台，而是面向危险废物管理场景的管理智能体。",
  "广东监管场景导向：突出广东省监管语境下的资料审查、依据提示与风险识别能力。",
  "差异化方向明确：不重复平台已有基础台账/联单功能，重点做跨环保资料一致性比对。",
  "路线清晰：V1 台账智能审查 → V1.5 跨资料一致性比对 → V2 规范化管理智能辅助版 → V3 全过程危险废物管理智能体。",
];

const cases = [
  { title: "四会市无废县技术服务项目", desc: "围绕无废城市建设相关任务，提供项目技术支撑与实施协同服务。" },
  { title: "肇庆端州无废社区项目", desc: "围绕社区层面的无废场景建设，提供策划、内容梳理与项目推进支持。" },
  { title: "肇庆广宁低碳示范项目", desc: "聚焦低碳示范方向，服务绿色转型与区域示范建设相关工作。" },
];

const products = [
  { icon: Cpu, title: "危险废物管理智能体", desc: "项目定位为管理智能体，而非平台。面向广东监管与企业合规场景，围绕危险废物资料审查、风险提示和管理辅助提供智能化支持。" },
  { icon: Database, title: "环保数字化工具", desc: "围绕台账标准化、问题字典、规则库与数据结构沉淀，形成企业环保管理数字底座。" },
  { icon: BadgeCheck, title: "跨资料一致性审查能力", desc: "聚焦危险废物资料与环评、排污许可及其他环保申报材料之间的一致性比对与依据提示。" },
];

const roadmap = [
  { version: "V1", title: "台账智能审查", desc: "实际运行输入以企业原始台账 Excel / CSV 为主。" },
  { version: "V1.5", title: "跨资料一致性比对", desc: "面向危废资料与环评、排污许可及其他申报材料的一致性审查。" },
  { version: "V2", title: "规范化管理智能辅助版", desc: "支持规范化管理、自检抽查与资料完善辅助。" },
  { version: "V3", title: "全过程危险废物管理智能体", desc: "形成全过程、持续迭代的危险废物管理智能体。" },
];

const quickQuestions = [
  "帮我检查这份危废台账是否存在常见规范问题",
  "结合台账与排污许可，帮我提示可能存在的一致性问题",
  "根据台账字段，帮我列出需要重点复核的异常项",
  "这个项目后续路线从 V1 到 V3 分别是什么",
];

const sceneCards = [
  { title: "V1 台账智能审查", desc: "聚焦企业原始台账 Excel / CSV 的字段检查、逻辑复核与问题提示。", icon: FileSpreadsheet },
  { title: "V1.5 跨资料一致性比对", desc: "面向危险废物资料与环评、排污许可及其他环保申报材料之间的一致性比对。", icon: ShieldAlert },
  { title: "V2 规范化管理智能辅助", desc: "聚焦危险废物规范化管理的智能辅助、抽查自检与资料完善支持。", icon: ClipboardList },
  { title: "V3 全过程管理智能体", desc: "面向危险废物全过程管理，形成持续迭代的管理智能体能力。", icon: MessageSquare },
];

const suggestedFindings = [
  "部分台账记录缺少危废代码或名称表达不统一，建议统一字段口径后再复核。",
  "个别记录与环评、排污许可申报口径可能存在不一致，建议开展跨资料一致性复核。",
  "部分数据可能存在计量单位、产生环节或管理去向表达不一致情况，建议统一口径后再汇总分析。",
];

const chatSeed: { role: string; text: string }[] = [
  { role: "assistant", text: "您好，这里是危险废物管理智能体演示窗口。您可以上传企业原始台账 Excel / CSV，或直接输入问题进行演示。" },
  { role: "assistant", text: "本系统定位于管理智能体，聚焦监管辅助、风险提示、规范化审查与跨资料一致性比对；不对违法违规定性，也不输出处罚建议。" },
];

function TopNav({ page, setPage }: { page: string; setPage: (p: string) => void }) {
  const items: [string, string][] = [
    ["home", "首页"],
    ["about", "关于我们"],
    ["services", "服务领域"],
    ["cases", "项目案例"],
    ["products", "数字产品"],
    ["contact", "联系我们"],
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-emerald-100 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4">
        <button onClick={() => setPage("home")} className="text-left">
          <BrandBlock />
        </button>
        <nav className="hidden flex-wrap items-center gap-6 md:flex">
          {items.map(([key, label]) => (
            <button
              key={key}
              onClick={() => setPage(key)}
              className={`text-sm transition ${page === key ? "font-semibold text-emerald-950" : "text-emerald-800 hover:text-emerald-950"}`}
            >
              {label}
            </button>
          ))}
        </nav>
        <Button onClick={() => setPage("demoLogin")} className="rounded-2xl bg-emerald-800 hover:bg-emerald-900">
          演示登录
        </Button>
      </div>
    </header>
  );
}

function HomePage({ setPage }: { setPage: (p: string) => void }) {
  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-emerald-100" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-6 py-20 md:grid-cols-2 md:py-28">
          <div className="flex flex-col justify-center">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm text-emerald-800 shadow-sm">
              <BadgeCheck className="h-4 w-4" />
              环保咨询 × 数字化产品 × 危险废物管理智能体
            </div>
            <div className="mt-6">
              <h1 className="text-4xl font-bold tracking-tight text-emerald-950 md:text-6xl md:leading-[1.1]">
                用专业环保服务与数字能力，
              </h1>
              <p className="mt-3 text-base italic tracking-wide text-emerald-700 md:text-lg">
                Professional environmental services and digital capability.
              </p>
              <h1 className="mt-4 text-4xl font-bold tracking-tight text-emerald-950 md:text-6xl md:leading-[1.1]">
                帮助企业稳健合规发展
              </h1>
              <p className="mt-3 text-base italic tracking-wide text-emerald-700 md:text-lg">
                Helping enterprises achieve steady, compliant, and sustainable growth.
              </p>
            </div>
            <p className="mt-6 max-w-2xl text-base leading-8 text-emerald-900/80 md:text-lg">
              广州市亿点环保有限公司专注于环保管家咨询、政府环保专项资金申请、建设项目环境影响评价、三废污染防治工程、排污许可申报维护、清洁生产审核、VOCs 治理咨询、绿色制造体系建设与双碳相关服务，同时持续推进危险废物管理场景的数字化产品建设。
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button size="lg" className="rounded-2xl bg-emerald-800 hover:bg-emerald-900" onClick={() => setPage("products")}>
                了解管理智能体
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="rounded-2xl border-emerald-300 text-emerald-900 hover:bg-emerald-50" onClick={() => setPage("services")}>
                查看服务方案
              </Button>
            </div>
          </div>

          <div className="grid gap-4">
            <Card className="rounded-[28px] border-emerald-100 shadow-xl shadow-emerald-100/60">
              <CardContent className="p-6 md:p-8">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-emerald-700">核心产品演示</div>
                    <div className="mt-1 text-2xl font-semibold text-emerald-950">危险废物管理智能体</div>
                    <div className="mt-1 text-sm text-emerald-700">广东监管场景导向 · 管理智能体定位</div>
                  </div>
                  <div className="rounded-2xl bg-emerald-800 p-3 text-white">
                    <Cpu className="h-6 w-6" />
                  </div>
                </div>
                <div className="mt-6 rounded-3xl border border-emerald-100 bg-emerald-50/50 p-5">
                  <div className="text-sm text-emerald-700">当前输入</div>
                  <div className="mt-2 font-medium text-emerald-950">企业原始台账 Excel / CSV</div>
                  <div className="mt-1 text-sm text-emerald-700">V1 实际运行输入以企业原始台账为主</div>
                  <div className="mt-4 text-sm text-emerald-700">能力边界</div>
                  <div className="mt-2 text-sm leading-7 text-emerald-900/85">
                    管理智能体定位，聚焦监管辅助、风险提示、规范化审查与资料一致性审查；不做违法违规定性，不输出处罚建议。
                  </div>
                </div>
                <div className="mt-4 grid gap-3 md:grid-cols-2">
                  <div className="rounded-2xl border border-emerald-100 p-4">
                    <div className="text-sm text-emerald-700">路线阶段</div>
                    <div className="mt-2 font-medium text-emerald-950">V1 台账智能审查</div>
                  </div>
                  <div className="rounded-2xl border border-emerald-100 p-4">
                    <div className="text-sm text-emerald-700">路线阶段</div>
                    <div className="mt-2 font-medium text-emerald-950">V1.5 跨资料一致性比对</div>
                  </div>
                </div>
                <Button onClick={() => setPage("demoLogin")} className="mt-5 rounded-2xl bg-emerald-800 hover:bg-emerald-900">
                  进入演示入口
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <SectionTitle
          eyebrow="ABOUT"
          title="以专业环保服务与数字化能力，帮助企业实现稳健合规与绿色转型"
          desc="广州市亿点环保有限公司聚焦环保管家咨询、政府环保专项资金申请、建设项目环境影响评价、三废污染防治工程、排污许可申报维护、清洁生产审核、VOCs 治理咨询、绿色制造体系建设及双碳相关服务，同时持续推进危险废物管理场景的数字化产品建设。"
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {advantages.map((item, idx) => (
            <Card key={idx} className="rounded-[24px] border-emerald-100">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="mt-1 rounded-2xl bg-emerald-800 p-2 text-white">
                    <BadgeCheck className="h-4 w-4" />
                  </div>
                  <p className="text-emerald-900/85 leading-8">{item}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}

function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-20">
      <SectionTitle
        eyebrow="ABOUT US"
        title="关于亿点环保"
        desc="广州市亿点环保有限公司致力于为企业提供专业环保咨询与数字化解决方案，围绕企业合规管理、绿色制造与危险废物管理场景数字化，提供更稳健、更规范、更高效的环保管理支持。"
      />
      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {advantages.map((item, idx) => (
          <Card key={idx} className="rounded-[24px] border-emerald-100 bg-white">
            <CardContent className="p-6 text-emerald-900/85 leading-8">{item}</CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function ServicesPage() {
  return (
    <div className="bg-emerald-50/40 py-20">
      <div className="mx-auto max-w-7xl px-6">
        <SectionTitle
          eyebrow="SERVICES"
          title="核心服务领域"
          desc="从传统环保咨询到数字化合规能力建设，构建服务与产品协同的业务体系。"
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {services.map((item) => {
            const Icon = item.icon;
            return (
              <Card key={item.title} className="h-full rounded-[24px] border-emerald-100 bg-white">
                <CardContent className="p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-800 text-white">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-xl font-semibold text-emerald-950">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-emerald-900/80">{item.desc}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function CasesPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-20">
      <SectionTitle
        eyebrow="CASES"
        title="代表项目"
        desc="结合技术服务、无废建设与低碳示范等场景，持续沉淀项目经验与服务方法。"
      />
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {cases.map((item) => (
          <Card key={item.title} className="rounded-[26px] border-emerald-100 bg-white">
            <CardContent className="p-6">
              <div className="text-sm text-emerald-700">项目案例</div>
              <h3 className="mt-3 text-xl font-semibold text-emerald-950">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-emerald-900/80">{item.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function ProductsPage({ setPage }: { setPage: (p: string) => void }) {
  return (
    <div className="mx-auto max-w-7xl px-6 py-20">
      <SectionTitle
        eyebrow="PRODUCTS"
        title="数字产品与智能体能力"
        desc="围绕企业环保合规的真实工作流，将规则、数据、场景和审查能力沉淀为可复用的数字产品。"
      />

      <div className="mt-12">
        <h3 className="text-lg font-semibold text-emerald-950">Roadmap</h3>
        <div className="mt-6 grid gap-4 md:grid-cols-4">
          {roadmap.map((item) => (
            <Card key={item.version} className="rounded-[24px] border-emerald-100">
              <CardContent className="p-5">
                <div className="inline-flex rounded-full bg-emerald-800 px-3 py-1 text-xs font-semibold text-white">{item.version}</div>
                <div className="mt-3 text-lg font-semibold text-emerald-950">{item.title}</div>
                <p className="mt-2 text-sm leading-7 text-emerald-900/80">{item.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {products.map((item, idx) => {
          const Icon = item.icon;
          return (
            <Card key={item.title} className="rounded-[26px] border-emerald-100">
              <CardContent className="p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-800 text-white">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-xl font-semibold text-emerald-950">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-emerald-900/80">{item.desc}</p>
                {idx === 0 && (
                  <Button onClick={() => setPage("demoLogin")} className="mt-5 rounded-2xl bg-emerald-800 hover:bg-emerald-900">
                    进入演示系统
                  </Button>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

function ContactPage() {
  const contacts = [
    { icon: Phone, text: "13660969154" },
    { icon: Mail, text: "yidianhuanbao@yeah.com" },
    { icon: MapPin, text: "广州市天河区天慧路10号A409室" },
  ];

  return (
    <div className="mx-auto max-w-7xl px-6 py-20">
      <SectionTitle eyebrow="CONTACT" title="联系我们" desc="欢迎联系亿点环保，交流环保咨询、项目合作与危废智能体演示需求。" />
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {contacts.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.text} className="rounded-2xl border border-emerald-100 p-6">
              <Icon className="mb-2 h-5 w-5 text-emerald-800" />
              <div className="leading-7 text-emerald-900/85">{item.text}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function SectionHint({ icon: Icon, title, desc }: { icon: React.ComponentType<{ className?: string }>; title: string; desc: string }) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-emerald-100 bg-white p-4">
      <div className="mt-0.5 rounded-xl bg-emerald-800 p-2 text-white">
        <Icon className="h-4 w-4" />
      </div>
      <div>
        <div className="font-medium text-emerald-950">{title}</div>
        <div className="mt-1 text-sm leading-6 text-emerald-900/80">{desc}</div>
      </div>
    </div>
  );
}

function LoginPage({ onEnter }: { onEnter: () => void }) {
  return (
    <div className="min-h-[calc(100vh-149px)] bg-emerald-50/40 text-emerald-950">
      <main className="mx-auto grid min-h-[calc(100vh-149px)] max-w-7xl gap-8 px-6 py-10 lg:grid-cols-[1.05fr_0.95fr] lg:py-14">
        <div className="flex flex-col justify-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-4 py-2 text-sm text-emerald-800 shadow-sm">
            <ShieldCheck className="h-4 w-4" />
            危险废物管理智能体演示入口
          </div>
          <h1 className="mt-6 text-4xl font-bold tracking-tight text-emerald-950 md:text-5xl md:leading-[1.1]">
            危险废物管理智能体
            <span className="mt-2 block">演示登录页</span>
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-emerald-900/80 md:text-lg">
            面向企业危险废物管理场景，提供台账智能审查、跨资料一致性比对、规范化管理辅助与演示问答。
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <SectionHint icon={Database} title="支持输入" desc="企业原始台账 Excel / CSV，或直接输入危废合规相关问题。" />
            <SectionHint icon={ShieldCheck} title="能力边界" desc="管理智能体定位，聚焦监管辅助、风险提示与规范化审查。" />
            <SectionHint icon={Clock3} title="适合场景" desc="官网演示、访客体验、销售演示、项目路演与客户预沟通。" />
            <SectionHint icon={Sparkles} title="展示重点" desc="V1 台账审查与路线展示。" />
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {sceneCards.map((item) => {
              const Icon = item.icon;
              return (
                <Card key={item.title} className="rounded-[24px] border-emerald-100 bg-white shadow-sm">
                  <CardContent className="p-5">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-800 text-white">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="mt-4 text-lg font-semibold text-emerald-950">{item.title}</div>
                    <p className="mt-2 text-sm leading-7 text-emerald-900/80">{item.desc}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        <div className="flex items-center">
          <Card className="w-full rounded-[32px] border-emerald-100 bg-white shadow-2xl shadow-emerald-100/70">
            <CardContent className="p-6 md:p-8">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-emerald-700">演示入口</div>
                  <div className="mt-1 text-2xl font-semibold text-emerald-950">登录体验</div>
                  <div className="mt-1 text-sm text-emerald-700">演示重点：V1 台账审查与路线展示</div>
                </div>
                <div className="rounded-2xl bg-emerald-800 p-3 text-white">
                  <Lock className="h-5 w-5" />
                </div>
              </div>

              <div className="mt-6 grid gap-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-emerald-900">账号</label>
                  <div className="relative">
                    <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-emerald-500" />
                    <Input defaultValue="demo@yidiancst.com" className="h-12 rounded-2xl border-emerald-100 pl-10" />
                  </div>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-emerald-900">密码</label>
                  <div className="relative">
                    <KeyRound className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-emerald-500" />
                    <Input type="password" defaultValue="123456" className="h-12 rounded-2xl border-emerald-100 pl-10" />
                  </div>
                </div>
              </div>

              <div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm leading-7 text-emerald-900">
                建议官网正式上线时采用&ldquo;官网账号登录 + 演示权限控制&rdquo;模式。本页当前重点展示 V1 台账智能审查与整体路线定位。
              </div>

              <Button onClick={onEnter} className="mt-6 h-12 w-full rounded-2xl text-base bg-emerald-800 hover:bg-emerald-900">
                登录进入演示窗口
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

function ChatBubble({ role, text }: { role: string; text: string }) {
  const isAssistant = role === "assistant";
  return (
    <div className={`flex ${isAssistant ? "justify-start" : "justify-end"}`}>
      <div
        className={`max-w-[88%] rounded-[22px] px-4 py-3 text-sm leading-7 shadow-sm ${
          isAssistant ? "border border-emerald-100 bg-white text-emerald-900" : "bg-emerald-800 text-white"
        }`}
      >
        {text}
      </div>
    </div>
  );
}

function DemoPage({ onBack }: { onBack: () => void }) {
  const [messages, setMessages] = useState(chatSeed);
  const [input, setInput] = useState(quickQuestions[0]);

  const stats = useMemo(
    () => [
      { label: "当前模式", value: "演示版" },
      { label: "输入类型", value: "Excel / CSV / 问答" },
      { label: "当前重点", value: "V1 台账审查" },
    ],
    []
  );

  const sendMessage = () => {
    if (!input.trim()) return;
    const userText = input.trim();
    setMessages((prev) => [
      ...prev,
      { role: "user", text: userText },
      {
        role: "assistant",
        text: `已接收演示问题：${userText}。基于危险废物管理智能体当前展示逻辑，我会优先从字段完整性、时间逻辑、危废代码表达、计量单位一致性以及与环评、排污许可等资料之间的一致性角度进行辅助审查，并输出问题提示与依据提示。`,
      },
      {
        role: "assistant",
        text: `演示示例：${suggestedFindings[0]} ${suggestedFindings[1]}`,
      },
    ]);
    setInput("");
  };

  return (
    <div className="min-h-[calc(100vh-149px)] bg-emerald-50/40 text-emerald-950">
      <main className="mx-auto grid max-w-7xl gap-6 px-6 py-8 lg:grid-cols-[0.78fr_1.42fr]">
        <div className="grid gap-6">
          <Card className="rounded-[28px] border-emerald-100 bg-white shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-emerald-700">演示状态</div>
                  <div className="mt-1 text-2xl font-semibold text-emerald-950">已登录</div>
                </div>
                <div className="rounded-2xl bg-emerald-800 p-3 text-white">
                  <Building2 className="h-5 w-5" />
                </div>
              </div>

              <div className="mt-6 grid gap-3">
                {stats.map((item) => (
                  <div key={item.label} className="flex items-center justify-between rounded-2xl border border-emerald-100 px-4 py-3 text-sm">
                    <span className="text-emerald-700">{item.label}</span>
                    <span className="font-medium text-emerald-950">{item.value}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm leading-7 text-emerald-900">
                <div className="flex items-center gap-2 font-medium">
                  <AlertTriangle className="h-4 w-4" />
                  使用说明
                </div>
                <div className="mt-2">
                  本系统用于管理辅助、风险提示、规范化审查、一致性比对与展示演示，不替代正式法律法规解读、行政认定或处罚判断。
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-[28px] border-emerald-100 bg-white shadow-sm">
            <CardContent className="p-6">
              <div className="text-lg font-semibold text-emerald-950">推荐演示问题</div>
              <div className="mt-4 flex flex-wrap gap-3">
                {quickQuestions.map((item) => (
                  <button
                    key={item}
                    onClick={() => setInput(item)}
                    className="rounded-full border border-emerald-100 bg-emerald-50 px-4 py-2 text-left text-sm text-emerald-900 transition hover:border-emerald-300 hover:bg-white"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-[28px] border-emerald-100 bg-white shadow-sm">
            <CardContent className="p-6">
              <div className="text-lg font-semibold text-emerald-950">演示场景</div>
              <div className="mt-4 grid gap-3">
                {sceneCards.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.title} className="rounded-2xl border border-emerald-100 p-4">
                      <div className="flex items-center gap-3">
                        <div className="rounded-xl bg-emerald-800 p-2 text-white">
                          <Icon className="h-4 w-4" />
                        </div>
                        <div className="font-medium text-emerald-950">{item.title}</div>
                      </div>
                      <p className="mt-2 text-sm leading-7 text-emerald-900/80">{item.desc}</p>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="rounded-[32px] border-emerald-100 bg-white shadow-xl shadow-emerald-100/50">
          <CardContent className="flex h-[calc(100vh-220px)] min-h-[760px] flex-col p-0">
            <div className="flex items-center justify-between border-b border-emerald-100 px-6 py-4">
              <div>
                <div className="text-sm text-emerald-700">体验窗口</div>
                <div className="mt-1 text-xl font-semibold text-emerald-950">危险废物管理智能体</div>
                <div className="mt-1 text-sm text-emerald-700">演示版：V1 台账智能审查 + 路线展示</div>
              </div>
              <div className="flex items-center gap-2 text-sm text-emerald-800">
                <CheckCircle2 className="h-4 w-4" />
                系统在线
              </div>
            </div>

            <div className="grid gap-3 border-b border-emerald-100 bg-emerald-50/40 px-6 py-4 md:grid-cols-3">
              <div className="rounded-2xl border border-emerald-100 bg-white p-4 text-sm">
                <div className="flex items-center gap-2 text-emerald-700">
                  <Upload className="h-4 w-4" />
                  上传入口
                </div>
                <div className="mt-2 font-medium text-emerald-950">支持 Excel / CSV</div>
                <div className="mt-1 text-xs text-emerald-700">V1 实际运行输入</div>
              </div>
              <div className="rounded-2xl border border-emerald-100 bg-white p-4 text-sm">
                <div className="flex items-center gap-2 text-emerald-700">
                  <Search className="h-4 w-4" />
                  审查重点
                </div>
                <div className="mt-2 font-medium text-emerald-950">字段、逻辑、口径、一致性</div>
              </div>
              <div className="rounded-2xl border border-emerald-100 bg-white p-4 text-sm">
                <div className="flex items-center gap-2 text-emerald-700">
                  <Bot className="h-4 w-4" />
                  输出方式
                </div>
                <div className="mt-2 font-medium text-emerald-950">问题提示 + 依据提示</div>
              </div>
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto bg-emerald-50/40 px-6 py-5">
              {messages.map((item, idx) => (
                <ChatBubble key={`${item.role}-${idx}`} role={item.role} text={item.text} />
              ))}
            </div>

            <div className="border-t border-emerald-100 bg-white px-6 py-5">
              <div className="rounded-[28px] border border-emerald-100 bg-emerald-50/40 p-3 shadow-sm">
                <div className="flex flex-col gap-3 md:flex-row md:items-end">
                  <div className="flex-1">
                    <label className="mb-2 block text-sm font-medium text-emerald-900">输入演示问题</label>
                    <Input
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => { if (e.key === "Enter") sendMessage(); }}
                      placeholder="例如：帮我检查这份危废台账是否存在常见规范问题"
                      className="h-12 rounded-2xl border-emerald-100 bg-white"
                    />
                  </div>
                  <div className="flex gap-3">
                    <Button variant="outline" className="h-12 rounded-2xl border-emerald-300 text-emerald-900 hover:bg-emerald-50">
                      <Upload className="mr-2 h-4 w-4" />
                      上传台账
                    </Button>
                    <Button onClick={sendMessage} className="h-12 rounded-2xl px-6 bg-emerald-800 hover:bg-emerald-900">
                      发送
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
              <Button variant="ghost" onClick={onBack} className="mt-3 rounded-2xl text-emerald-900 hover:bg-emerald-50">
                返回登录页
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

function Footer() {
  return (
    <footer className="border-t border-emerald-100 bg-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-2">
        <div>
          <BrandBlock />
          <p className="mt-5 max-w-xl text-sm leading-7 text-emerald-900/80">
            专注环保咨询服务与环保数字化产品建设，围绕企业合规管理、绿色制造与危险废物管理场景数字化，提供更稳健、更规范、更高效的环保管理支持。
          </p>
        </div>

        <div className="grid gap-4 text-sm text-emerald-900/85">
          <div className="flex items-center gap-3 rounded-2xl border border-emerald-100 p-4">
            <Phone className="h-4 w-4 text-emerald-800" />
            <span>联系电话：13660969154</span>
          </div>
          <div className="flex items-center gap-3 rounded-2xl border border-emerald-100 p-4">
            <Mail className="h-4 w-4 text-emerald-800" />
            <span>企业邮箱：yidianhuanbao@yeah.com</span>
          </div>
          <div className="flex items-center gap-3 rounded-2xl border border-emerald-100 p-4">
            <MapPin className="h-4 w-4 text-emerald-800" />
            <span>公司地址：广州市天河区天慧路10号A409室</span>
          </div>
        </div>
      </div>
      <div className="border-t border-emerald-100 bg-emerald-50/40 py-6 text-center text-sm text-emerald-700">
        &copy; {new Date().getFullYear()} 广州市亿点环保有限公司 &middot; YIDIAN CST
      </div>
    </footer>
  );
}

export default function YidianEcoSite() {
  const [page, setPage] = useState("home");

  let content;
  if (page === "about") content = <AboutPage />;
  else if (page === "services") content = <ServicesPage />;
  else if (page === "cases") content = <CasesPage />;
  else if (page === "products") content = <ProductsPage setPage={setPage} />;
  else if (page === "contact") content = <ContactPage />;
  else if (page === "demoLogin") content = <LoginPage onEnter={() => setPage("demo")} />;
  else if (page === "demo") content = <DemoPage onBack={() => setPage("demoLogin")} />;
  else content = <HomePage setPage={setPage} />;

  return (
    <div className="min-h-screen bg-white text-emerald-950">
      <TopNav page={page} setPage={setPage} />
      {content}
      <Footer />
    </div>
  );
}
