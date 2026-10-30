"use client";

import { useEffect, useState, useMemo, useRef } from "react";
import {
  DollarSign, ShoppingCart, Receipt, CalendarDays, ChevronDown,
  CreditCard, QrCode, Barcode, Calendar, Filter, Users,
  ShoppingBag, Wallet, BarChart2, Package, Settings, Star,
  ChevronLeft, Award, HelpCircle, CheckCircle2, ChevronRight
} from "lucide-react";

// Smooth count-up animation for numbers
function AnimatedValue({ 
  value, 
  isCurrency = false, 
  isPercent = false,
  decimalPlaces = 2
}: { 
  value: number; 
  isCurrency?: boolean; 
  isPercent?: boolean;
  decimalPlaces?: number;
}) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const duration = 1600; // 1.6s

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // easeOutCubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      setDisplay(value * easeProgress);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setDisplay(value);
      }
    };

    requestAnimationFrame(step);
  }, [value]);

  if (isCurrency) {
    return (
      <span>
        R${" "}
        {display.toLocaleString("pt-BR", {
          minimumFractionDigits: decimalPlaces,
          maximumFractionDigits: decimalPlaces,
        })}
      </span>
    );
  }

  if (isPercent) {
    return (
      <span>
        {display.toLocaleString("pt-BR", {
          minimumFractionDigits: decimalPlaces,
          maximumFractionDigits: decimalPlaces,
        })}
        %
      </span>
    );
  }

  return <span>{Math.floor(display).toLocaleString("pt-BR")}</span>;
}

export default function ApplyfyDashboard() {
  const [mounted, setMounted] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState<"semana" | "ontem" | "mes">("semana");
  const [userName, setUserName] = useState("Samuel Morinni");
  const [isEditingName, setIsEditingName] = useState(false);
  const [vendasOpen, setVendasOpen] = useState(true);
  const [hoveredPoint, setHoveredPoint] = useState<{
    date: string;
    value: number;
    x: number;
    y: number;
  } | null>(null);

  const chartRef = useRef<SVGSVGElement>(null);

  // Force Applyfy official favicon and title in the browser tab
  useEffect(() => {
    setMounted(true);
    document.title = "ApplyFy - crie, venda e escale";

    let link = document.querySelector("link[rel*='icon']") as HTMLLinkElement;
    if (!link) {
      link = document.createElement("link");
      link.rel = "shortcut icon";
      document.head.appendChild(link);
    }
    link.type = "image/png";
    link.href = "/painel/favicon.png?v=2";
  }, []);

  // Dates updated to late October 2026 (matching current date 30/10)
  const chartData = useMemo(() => [
    { date: "23/10", value: 3120.40 },
    { date: "24/10", value: 3840.50 },
    { date: "25/10", value: 3490.90 },
    { date: "26/10", value: 4890.20 },
    { date: "27/10", value: 5410.00 },
    { date: "28/10", value: 6120.80 },
    { date: "29/10", value: 5890.55 },
    { date: "30/10", value: 6778.45 },
  ], []);

  // SVG Chart Calculations
  const svgWidth = 700;
  const svgHeight = 220;
  const maxChartVal = 8000;
  const yTicks = [8000, 6000, 4000, 2000, 0];

  const points = useMemo(() => {
    return chartData.map((d, i) => {
      const x = 50 + (i / (chartData.length - 1)) * (svgWidth - 70);
      const y = svgHeight - 30 - (d.value / maxChartVal) * (svgHeight - 60);
      return { x, y, data: d };
    });
  }, [chartData]);

  // Smooth SVG Bézier path generator
  const linePath = useMemo(() => {
    if (points.length < 2) return "";
    let path = `M ${points[0].x.toFixed(1)} ${points[0].y.toFixed(1)}`;
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i === 0 ? i : i - 1];
      const p1 = points[i];
      const p2 = points[i + 1];
      const p3 = points[i + 2 < points.length ? i + 2 : i + 1];

      const cp1x = p1.x + (p2.x - p0.x) / 6;
      const cp1y = p1.y + (p2.y - p0.y) / 6;
      const cp2x = p2.x - (p3.x - p1.x) / 6;
      const cp2y = p2.y - (p3.y - p1.y) / 6;

      path += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
    }
    return path;
  }, [points]);

  const areaPath = useMemo(() => {
    if (points.length < 2) return "";
    const lastPoint = points[points.length - 1];
    return `${linePath} L ${lastPoint.x.toFixed(1)} ${svgHeight - 30} L ${points[0].x.toFixed(1)} ${svgHeight - 30} Z`;
  }, [linePath, points]);

  if (!mounted) return null;

  return (
    <div className="min-h-screen flex bg-[#0B0B0B] text-white font-sans antialiased selection:bg-[#FFC247]/30 selection:text-white">
      
      {/* ======================================================== */}
      {/* 1. LEFT SIDEBAR                                          */}
      {/* ======================================================== */}
      <aside className="w-[245px] shrink-0 border-r border-[#1E1E1E] flex flex-col justify-between bg-[#121212] select-none z-20">
        <div>
          {/* Logo Applyfy */}
          <div className="pt-7 pb-6 px-6 border-b border-[#1E1E1E]/60 flex items-center">
            <img 
              src="/painel/logo.png" 
              alt="Applyfy" 
              className="w-[170px] h-auto object-contain transition-transform hover:scale-[1.02] cursor-pointer" 
            />
          </div>

          {/* Navigation Menu */}
          <nav className="p-3.5 space-y-1.5 text-[14px]">
            {/* Dashboard (Active) */}
            <button
              onClick={() => setSelectedPeriod("semana")}
              className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-[12px] font-bold bg-[#FFC247] text-black shadow-[0_2px_10px_rgba(255,194,71,0.25)] transition-all cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 flex items-center justify-center">
                  <div className="grid grid-cols-2 gap-0.5">
                    <span className="w-2 h-2 rounded-[2px] bg-black"></span>
                    <span className="w-2 h-2 rounded-[2px] bg-black"></span>
                    <span className="w-2 h-2 rounded-[2px] bg-black"></span>
                    <span className="w-2 h-2 rounded-[2px] bg-black"></span>
                  </div>
                </div>
                <span>Dashboard</span>
              </div>
            </button>

            {/* Marketplace */}
            <div className="flex items-center justify-between px-3.5 py-2.5 rounded-[12px] font-medium text-gray-300 hover:text-white hover:bg-[#1A1A1A] transition-colors cursor-pointer group">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-5 h-5 text-gray-400 group-hover:text-white" />
                <span>Marketplace</span>
              </div>
            </div>

            {/* Vendas (Expandable) */}
            <div>
              <button
                onClick={() => setVendasOpen(!vendasOpen)}
                className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-[12px] font-medium text-gray-300 hover:text-white hover:bg-[#1A1A1A] transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <ShoppingCart className="w-5 h-5 text-gray-400 group-hover:text-white" />
                  <span>Vendas</span>
                </div>
                <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${vendasOpen ? "rotate-180 text-white" : ""}`} />
              </button>

              {/* Sub items */}
              {vendasOpen && (
                <div className="ml-9 pl-2 border-l border-[#262626] my-1 space-y-1 text-[13px] text-gray-400">
                  <div className="py-1.5 px-2 hover:text-[#FFC247] cursor-pointer transition-colors flex items-center justify-between">
                    <span>Transações</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FFC247]"></span>
                  </div>
                  <div className="py-1.5 px-2 hover:text-[#FFC247] cursor-pointer transition-colors">
                    <span>Assinaturas</span>
                  </div>
                  <div className="py-1.5 px-2 hover:text-[#FFC247] cursor-pointer transition-colors">
                    <span>Fretes</span>
                  </div>
                  <div className="py-1.5 px-2 hover:text-[#FFC247] cursor-pointer transition-colors">
                    <span>Encomendas</span>
                  </div>
                </div>
              )}
            </div>

            {/* Financeiro */}
            <div className="flex items-center justify-between px-3.5 py-2.5 rounded-[12px] font-medium text-gray-300 hover:text-white hover:bg-[#1A1A1A] transition-colors cursor-pointer group">
              <div className="flex items-center gap-3">
                <Wallet className="w-5 h-5 text-gray-400 group-hover:text-white" />
                <span>Financeiro</span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-gray-400" />
            </div>

            {/* Relatórios */}
            <div className="flex items-center justify-between px-3.5 py-2.5 rounded-[12px] font-medium text-gray-300 hover:text-white hover:bg-[#1A1A1A] transition-colors cursor-pointer group">
              <div className="flex items-center gap-3">
                <BarChart2 className="w-5 h-5 text-gray-400 group-hover:text-white" />
                <span>Relatórios</span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-gray-400" />
            </div>

            {/* Clientes */}
            <div className="flex items-center justify-between px-3.5 py-2.5 rounded-[12px] font-medium text-gray-300 hover:text-white hover:bg-[#1A1A1A] transition-colors cursor-pointer group">
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-gray-400 group-hover:text-white" />
                <span>Clientes</span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-gray-400" />
            </div>

            {/* Produtos */}
            <div className="flex items-center justify-between px-3.5 py-2.5 rounded-[12px] font-medium text-gray-300 hover:text-white hover:bg-[#1A1A1A] transition-colors cursor-pointer group">
              <div className="flex items-center gap-3">
                <Package className="w-5 h-5 text-gray-400 group-hover:text-white" />
                <span>Produtos</span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-gray-400" />
            </div>

            {/* Configurações */}
            <div className="flex items-center justify-between px-3.5 py-2.5 rounded-[12px] font-medium text-gray-300 hover:text-white hover:bg-[#1A1A1A] transition-colors cursor-pointer group">
              <div className="flex items-center gap-3">
                <Settings className="w-5 h-5 text-gray-400 group-hover:text-white" />
                <span>Configurações</span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-gray-400" />
            </div>
          </nav>
        </div>

        {/* Bottom White Card: Indique e Ganhe */}
        <div className="p-3.5">
          <div className="bg-white text-black rounded-[16px] p-3.5 flex flex-col items-center justify-center cursor-pointer shadow-lg hover:bg-gray-100 transition-colors text-center">
            <div className="flex items-center gap-2 mb-0.5">
              <Star className="w-4 h-4 text-black fill-black" />
              <span className="text-[13px] font-bold text-black tracking-tight">Indique e Ganhe</span>
            </div>
            <span className="text-[11px] text-gray-500 underline font-medium">Saiba mais</span>
          </div>
        </div>
      </aside>

      {/* ======================================================== */}
      {/* 2. MAIN BODY & HEADER                                    */}
      {/* ======================================================== */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        
        {/* TOP BAR / LEVEL PROGRESS & USER PROFILE */}
        <header className="h-[68px] border-b border-[#1E1E1E] bg-[#0E0E0E] px-8 flex items-center justify-between select-none">
          <div></div>

          <div className="flex items-center gap-6">
            {/* Level Trophy / Target Bar */}
            <div className="hidden sm:flex items-center gap-3 bg-[#161616] border border-[#242424] px-4 py-2 rounded-full shadow-inner">
              <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-[#D99A00] to-[#FFD566] flex items-center justify-center text-black shadow-xs">
                <Award className="w-3.5 h-3.5 stroke-[2.5]" />
              </div>

              <div className="flex items-center gap-2.5 text-[12px]">
                <span className="font-semibold text-white tracking-tight">
                  <AnimatedValue value={38450.80} isCurrency decimalPlaces={2} />
                </span>
                
                {/* Visual Progress Bar */}
                <div className="w-24 h-2 bg-[#2A2A2A] rounded-full overflow-hidden p-0.5">
                  <div className="h-full bg-gradient-to-r from-[#FFC247] to-[#FFA800] rounded-full w-[76%] transition-all duration-1000"></div>
                </div>

                <span className="text-gray-400 font-medium">R$ 50.000,00</span>
              </div>
            </div>

            {/* User Profile */}
            <div 
              onClick={() => setIsEditingName(!isEditingName)}
              className="flex items-center gap-2.5 cursor-pointer hover:opacity-90 transition-opacity"
              title="Clique para editar nome"
            >
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#262626] to-[#161616] border border-[#333] flex items-center justify-center text-white font-bold text-sm shadow-xs overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" 
                  alt={userName}
                  className="w-full h-full object-cover" 
                />
              </div>

              {isEditingName ? (
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  onBlur={() => setIsEditingName(false)}
                  autoFocus
                  className="bg-[#222] text-white text-sm px-2 py-0.5 rounded border border-[#FFC247] outline-hidden"
                />
              ) : (
                <span className="text-[14px] font-semibold text-white flex items-center gap-1.5">
                  {userName}
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </span>
              )}
            </div>
          </div>
        </header>

        {/* MAIN DASHBOARD CONTENT */}
        <main className="p-6 md:p-8 max-w-[1300px] w-full mx-auto space-y-6">

          {/* BANNER: A elite do mercado tem um novo ponto de encontro */}
          <div className="relative w-full h-[140px] md:h-[185px] rounded-[22px] overflow-hidden border border-[#222] shadow-[0_4px_24px_rgba(0,0,0,0.5)]">
            <img 
              src="/painel/banner.png" 
              alt="A elite do mercado tem um novo ponto de encontro" 
              className="w-full h-full object-cover select-none" 
            />
          </div>

          {/* GREETING & FILTERS ROW */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pt-1">
            <div>
              <h1 className="text-[26px] sm:text-[30px] font-bold text-white tracking-tight flex items-center gap-2">
                Olá, {userName}
              </h1>
              <p className="text-[14px] text-gray-400 mt-0.5 font-medium">
                Acompanhe o histórico de sua conta
              </p>
            </div>

            {/* Filter buttons */}
            <div className="flex items-center gap-3 text-[13px] font-medium">
              <button 
                onClick={() => setSelectedPeriod(selectedPeriod === "semana" ? "ontem" : "semana")}
                className="flex items-center gap-2.5 px-4 py-2 rounded-xl border border-[#262626] bg-[#141414] hover:bg-[#1A1A1A] transition-colors cursor-pointer text-gray-200 shadow-xs"
              >
                <Calendar className="w-3.5 h-3.5 text-[#FFC247]" />
                <span>{selectedPeriod === "semana" ? "Última semana" : "Vendas ontem"}</span>
                <ChevronDown className="w-3.5 h-3.5 text-gray-400 ml-1" />
              </button>

              <button className="flex items-center gap-2 px-5 py-2 rounded-xl border border-[#262626] bg-[#141414] hover:bg-[#1A1A1A] transition-colors cursor-pointer text-gray-200 shadow-xs">
                <span>Produtos</span>
              </button>
            </div>
          </div>

          {/* 4 KPI CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Card 1: Valor líquido */}
            <div className="bg-[#121212] border border-[#222] rounded-[20px] p-5 flex flex-col justify-between h-[135px] shadow-[0_2px_12px_rgba(0,0,0,0.3)] hover:border-[#333] transition-colors">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full border border-gray-600 flex items-center justify-center text-white">
                  <DollarSign className="w-4 h-4 text-white" />
                </div>
                <span className="text-[13px] font-bold text-white">Valor líquido</span>
              </div>
              <div className="text-[26px] font-bold tracking-tight text-[#FFC247]">
                <AnimatedValue value={38450.80} isCurrency decimalPlaces={2} />
              </div>
            </div>

            {/* Card 2: Vendas */}
            <div className="bg-[#121212] border border-[#222] rounded-[20px] p-5 flex flex-col justify-between h-[135px] shadow-[0_2px_12px_rgba(0,0,0,0.3)] hover:border-[#333] transition-colors">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full flex items-center justify-center text-white">
                  <ShoppingCart className="w-5 h-5 text-white" />
                </div>
                <span className="text-[13px] font-bold text-white">Vendas</span>
              </div>
              <div className="text-[26px] font-bold tracking-tight text-white">
                <AnimatedValue value={1340} />
              </div>
            </div>

            {/* Card 3: Ticket médio */}
            <div className="bg-[#121212] border border-[#222] rounded-[20px] p-5 flex flex-col justify-between h-[135px] shadow-[0_2px_12px_rgba(0,0,0,0.3)] hover:border-[#333] transition-colors">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full flex items-center justify-center text-white">
                  <Receipt className="w-5 h-5 text-white" />
                </div>
                <span className="text-[13px] font-bold text-white">Ticket médio</span>
              </div>
              <div className="text-[26px] font-bold tracking-tight text-white">
                <AnimatedValue value={28.69} isCurrency decimalPlaces={2} />
              </div>
            </div>

            {/* Card 4: Vendas ontem */}
            <div className="bg-[#121212] border border-[#222] rounded-[20px] p-5 flex flex-col justify-between h-[135px] shadow-[0_2px_12px_rgba(0,0,0,0.3)] hover:border-[#333] transition-colors">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full flex items-center justify-center text-white">
                  <CalendarDays className="w-5 h-5 text-white" />
                </div>
                <span className="text-[13px] font-bold text-white">Vendas ontem</span>
              </div>
              <div className="text-[26px] font-bold tracking-tight text-white">
                <AnimatedValue value={5890.20} isCurrency decimalPlaces={2} />
              </div>
            </div>

          </div>

          {/* MID ROW: TRANSAÇÕES CHART (LEFT 68%) + SAÚDE DA CONTA (RIGHT 32%) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
            
            {/* TRANSAÇÕES CHART CARD */}
            <div className="lg:col-span-8 bg-[#121212] border border-[#222] rounded-[22px] p-6 flex flex-col justify-between shadow-[0_2px_14px_rgba(0,0,0,0.3)]">
              <h2 className="text-[17px] font-bold text-white tracking-tight mb-4">
                Transações
              </h2>

              {/* Chart SVG */}
              <div className="relative w-full h-[230px] my-auto">
                <svg
                  ref={chartRef}
                  viewBox={`0 0 ${svgWidth} ${svgHeight}`}
                  className="w-full h-full overflow-visible"
                >
                  <defs>
                    <linearGradient id="applyfyGlow" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#FFC247" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#FFC247" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  {/* Horizontal Grid lines & Y-axis values */}
                  {yTicks.map((val, idx) => {
                    const y = svgHeight - 30 - (val / maxChartVal) * (svgHeight - 60);
                    return (
                      <g key={idx}>
                        <text
                          x="42"
                          y={y + 4}
                          fill="#777"
                          fontSize="11"
                          textAnchor="end"
                          fontFamily="sans-serif"
                        >
                          R$ {val.toLocaleString("pt-BR")}
                        </text>
                        <line
                          x1="48"
                          y1={y}
                          x2={svgWidth - 10}
                          y2={y}
                          stroke="#222"
                          strokeDasharray="3 3"
                        />
                      </g>
                    );
                  })}

                  {/* Area fill */}
                  <path d={areaPath} fill="url(#applyfyGlow)" />

                  {/* Line curve */}
                  <path
                    d={linePath}
                    fill="none"
                    stroke="#FFC247"
                    strokeWidth="3.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {/* Data Points */}
                  {points.map((p, i) => (
                    <g key={i}>
                      <circle
                        cx={p.x}
                        cy={p.y}
                        r="4.5"
                        fill="#FFC247"
                        stroke="#0B0B0B"
                        strokeWidth="2"
                        className="cursor-pointer transition-transform hover:scale-150"
                        onMouseEnter={() => setHoveredPoint({ date: p.data.date, value: p.data.value, x: p.x, y: p.y })}
                        onMouseLeave={() => setHoveredPoint(null)}
                      />
                      {/* X-axis date labels */}
                      <text
                        x={p.x}
                        y={svgHeight - 10}
                        fill="#777"
                        fontSize="11"
                        textAnchor="middle"
                        fontFamily="sans-serif"
                        transform={`rotate(-45, ${p.x}, ${svgHeight - 10})`}
                      >
                        {p.data.date}
                      </text>
                    </g>
                  ))}
                </svg>

                {/* Hover Tooltip */}
                {hoveredPoint && (
                  <div
                    style={{
                      left: `${(hoveredPoint.x / svgWidth) * 100}%`,
                      top: `${(hoveredPoint.y / svgHeight) * 100}%`,
                    }}
                    className="absolute -translate-x-1/2 -translate-y-[120%] bg-[#1E1E1E] text-white text-[11px] py-1 px-2.5 rounded-lg border border-[#333] shadow-xl pointer-events-none z-30 whitespace-nowrap"
                  >
                    <div className="font-semibold text-gray-300">{hoveredPoint.date}</div>
                    <div className="font-bold text-[#FFC247]">
                      R$ {hoveredPoint.value.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                    </div>
                  </div>
                )}
              </div>

              {/* Centered Período Label */}
              <div className="text-center pt-2">
                <span className="text-[11.5px] text-gray-500 font-medium">Período</span>
              </div>
            </div>

            {/* SAÚDE DA CONTA CARD */}
            <div className="lg:col-span-4 bg-[#121212] border border-[#222] rounded-[22px] p-6 flex flex-col justify-between shadow-[0_2px_14px_rgba(0,0,0,0.3)]">
              <div>
                <h2 className="text-[17px] font-bold text-white tracking-tight mb-6">
                  Saúde da conta
                </h2>

                <div className="space-y-6">
                  {/* Pagamentos aprovados */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[13px]">
                      <span className="text-gray-300 font-medium">Pagamentos aprovados</span>
                      <span className="text-[#FFC247] font-bold">
                        <AnimatedValue value={42180.00} isCurrency decimalPlaces={2} />
                      </span>
                    </div>
                    <div className="w-full h-2 bg-[#222] rounded-full overflow-hidden">
                      <div className="h-full bg-[#FFC247] w-[91%] rounded-full transition-all duration-1000"></div>
                    </div>
                  </div>

                  {/* Reembolsos */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[13px]">
                      <span className="text-gray-300 font-medium">Reembolsos</span>
                      <span className="text-red-400 font-bold">
                        <AnimatedValue value={1.15} isPercent decimalPlaces={2} />
                      </span>
                    </div>
                    <div className="w-full h-2 bg-[#222] rounded-full overflow-hidden">
                      <div className="h-full bg-red-400 w-[4%] rounded-full"></div>
                    </div>
                  </div>

                  {/* Chargeback */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[13px]">
                      <span className="text-gray-300 font-medium">Chargeback</span>
                      <span className="text-red-400 font-bold">
                        <AnimatedValue value={0.38} isPercent decimalPlaces={2} />
                      </span>
                    </div>
                    <div className="w-full h-2 bg-[#222] rounded-full overflow-hidden">
                      <div className="h-full bg-red-400 w-[2%] rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Status footer inside card */}
              <div className="pt-4 border-t border-[#1E1E1E] flex items-center gap-2 text-[12px] text-green-400 font-medium">
                <CheckCircle2 className="w-4 h-4" />
                <span>Conta em excelente estado de conformidade</span>
              </div>
            </div>

          </div>

          {/* BOTTOM CARD: MEIO DE PAGAMENTO */}
          <div className="bg-[#121212] border border-[#222] rounded-[22px] p-6 shadow-[0_2px_14px_rgba(0,0,0,0.3)]">
            <div className="grid grid-cols-3 gap-4 pb-4 border-b border-[#222] text-[13px] font-bold text-white tracking-tight">
              <span>Meio de pagamento</span>
              <span className="text-center">Aprovação</span>
              <span className="text-right">Valor</span>
            </div>

            <div className="divide-y divide-[#1A1A1A]">
              {/* Cartão de crédito */}
              <div className="grid grid-cols-3 gap-4 py-4 items-center">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#1A1A1A] border border-[#2A2A2A] flex items-center justify-center">
                    <CreditCard className="w-4 h-4 text-[#FFC247]" />
                  </div>
                  <span className="text-[14px] font-semibold text-white">Cartão de crédito</span>
                </div>
                <div className="text-[14px] font-bold text-green-400 text-center">
                  <AnimatedValue value={85} isPercent decimalPlaces={0} />
                </div>
                <div className="text-[14px] font-bold text-white text-right">
                  <AnimatedValue value={27420.10} isCurrency decimalPlaces={2} />
                </div>
              </div>

              {/* Pix */}
              <div className="grid grid-cols-3 gap-4 py-4 items-center">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#1A1A1A] border border-[#2A2A2A] flex items-center justify-center">
                    <QrCode className="w-4 h-4 text-[#FFC247]" />
                  </div>
                  <span className="text-[14px] font-semibold text-white">Pix</span>
                </div>
                <div className="text-[14px] font-bold text-green-400 text-center">
                  <AnimatedValue value={94} isPercent decimalPlaces={0} />
                </div>
                <div className="text-[14px] font-bold text-white text-right">
                  <AnimatedValue value={12890.40} isCurrency decimalPlaces={2} />
                </div>
              </div>

              {/* Boleto */}
              <div className="grid grid-cols-3 gap-4 py-4 items-center">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#1A1A1A] border border-[#2A2A2A] flex items-center justify-center">
                    <Barcode className="w-4 h-4 text-[#FFC247]" />
                  </div>
                  <span className="text-[14px] font-semibold text-white">Boleto</span>
                </div>
                <div className="text-[14px] font-bold text-[#FFC247] text-center">
                  <AnimatedValue value={42} isPercent decimalPlaces={0} />
                </div>
                <div className="text-[14px] font-bold text-white text-right">
                  <AnimatedValue value={1870.30} isCurrency decimalPlaces={2} />
                </div>
              </div>
            </div>
          </div>

        </main>
      </div>

      {/* FLOATING ACTION HELP BUTTON (APPLYFY N LOGO) */}
      <div 
        title="Suporte Applyfy"
        className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-[#FFC247] text-black flex items-center justify-center shadow-[0_4px_16px_rgba(255,194,71,0.4)] cursor-pointer hover:scale-110 active:scale-95 transition-all z-50 font-black text-xl"
      >
        <span>N</span>
      </div>

    </div>
  );
}
