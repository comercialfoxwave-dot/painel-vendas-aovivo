"use client";

import { useEffect, useState, useMemo, useRef } from "react";
import { 
  User, 
  Users, 
  ShoppingCart, 
  Percent, 
  Tag, 
  CircleDollarSign, 
  Calendar, 
  Maximize2, 
  Bell, 
  ChevronDown, 
  Sparkles,
  Eye,
  EyeOff,
  TrendingUp
} from "lucide-react";

export default function MercadoLivreLiveDashboard() {
  const [mounted, setMounted] = useState(false);
  const [liveTime, setLiveTime] = useState("");
  const [privacyMode, setPrivacyMode] = useState(false);
  
  // Period toggle: "hoje" (17 de outubro) or "ontem" (16 de outubro)
  const [selectedPeriod, setSelectedPeriod] = useState<"hoje" | "ontem">("hoje");

  // Interactive chart hover states
  const [hoverData, setHoverData] = useState<{
    index: number;
    xPercent: number;
    hour: string;
    hoje: number;
    ontem: number;
  } | null>(null);

  const chartContainerRef = useRef<HTMLDivElement>(null);

  // Exact dates as requested: Hoje = 17 de outubro | Ontem = 16 de outubro
  const hojeDateLabel = "17 de outubro";
  const ontemDateLabel = "16 de outubro";

  // Live ticking clock
  useEffect(() => {
    setMounted(true);
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const seconds = String(now.getSeconds()).padStart(2, "0");
      setLiveTime(`${hours} : ${minutes} : ${seconds}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    // Forçar favicon oficial do Mercado Livre na aba do navegador
    let link = document.querySelector("link[rel*='icon']") as HTMLLinkElement;
    if (!link) {
      link = document.createElement("link");
      link.rel = "shortcut icon";
      document.head.appendChild(link);
    }
    link.type = "image/png";
    link.href = "/meli-favicon.png?v=3";

    return () => clearInterval(interval);
  }, []);

  // 24h Data series:
  // Ontem (16 de outubro): R$ 2.376,97
  // Hoje (17 de outubro): Live high performance day reaching R$ 8.348,87
  const hourlyData = useMemo(() => [
    { hour: "00:00", label: "00h", ontem: 1620.00, hoje: 649.74 },
    { hour: "01:00", label: "01h", ontem: 1580.00, hoje: 980.00 },
    { hour: "02:00", label: "02h", ontem: 1510.50, hoje: 1162.87 },
    { hour: "04:00", label: "04h", ontem: 1480.00, hoje: 1490.00 },
    { hour: "06:00", label: "06h", ontem: 1720.00, hoje: 2150.00 },
    { hour: "08:00", label: "08h", ontem: 1980.00, hoje: 3180.40 },
    { hour: "10:00", label: "10h", ontem: 2140.00, hoje: 4290.00 },
    { hour: "12:00", label: "12h", ontem: 2080.50, hoje: 5340.50 },
    { hour: "14:00", label: "14h", ontem: 2190.00, hoje: 6190.00 },
    { hour: "16:00", label: "16h", ontem: 2376.97, hoje: 6980.20 },
    { hour: "18:00", label: "18h", ontem: 2290.00, hoje: 7540.00 },
    { hour: "20:00", label: "20h", ontem: 2180.50, hoje: 7990.50 },
    { hour: "22:00", label: "22h", ontem: 2040.00, hoje: 8348.87 },
    { hour: "24:00", label: "24h", ontem: 1980.00, hoje: 8348.87 },
  ], []);

  const isOntem = selectedPeriod === "ontem";

  // Values according to selected period
  const currentHeroValue = isOntem ? "R$ 2.376,97" : "R$ 8.348,87";
  const currentHeroTitle = isOntem ? "Vendas de ontem (consolidado)" : "Vendas de hoje ao vivo";
  const currentDateDisplay = isOntem 
    ? `${ontemDateLabel}, 23 : 59 : 59` 
    : `${hojeDateLabel}, ${liveTime || "23 : 40 : 12"}`;

  // Metrics:
  // Hoje (17/out): 18 vendas = R$ 8.348,87 (preço médio R$ 463,83)
  // Ontem (16/out): 12 vendas = R$ 2.376,97 (preço médio R$ 198,08)
  const currentMetrics = useMemo(() => {
    if (isOntem) {
      return {
        visitas: "1.640",
        compradores: "12",
        vendas: "12",
        conversao: "2,4%",
        unidades: "12",
        precoMedio: "R$ 198,08",
      };
    }
    return {
      visitas: "2.450",
      compradores: "18",
      vendas: "18",
      conversao: "2,8%",
      unidades: "18",
      precoMedio: "R$ 463,83",
    };
  }, [isOntem]);

  // Top Products:
  // Hoje (17/out): 18 vendas somando exatamente R$ 8.348,87
  // Ontem (16/out): 12 vendas somando exatamente R$ 2.376,97
  const topProducts = useMemo(() => {
    if (isOntem) {
      return [
        {
          rank: 1,
          title: "Smartphone Xiaomi Poco X7 Pro 5G 512GB",
          salesCount: "5 vendas",
          salesValue: "R$ 989,97",
          badge: "🔥",
          type: "gold-phone"
        },
        {
          rank: 2,
          title: "Smartphone Motorola Edge 70 5G 256GB",
          salesCount: "3 vendas",
          salesValue: "R$ 594,00",
          badge: "📦",
          type: "red-phone"
        },
        {
          rank: 3,
          title: "Fritadeira Air Fryer Philco 16 Litros",
          salesCount: "2 vendas",
          salesValue: "R$ 396,00",
          badge: null,
          type: "earphones"
        },
        {
          rank: 4,
          title: "Tênis Esportivo Running Pro Air Cushion",
          salesCount: "1 venda",
          salesValue: "R$ 198,00",
          badge: "📦",
          type: "sneaker"
        },
        {
          rank: 5,
          title: "Smart TV PRO 4K Ultra HD AI 55''",
          salesCount: "1 venda",
          salesValue: "R$ 199,00",
          badge: null,
          type: "smart-tv"
        }
      ];
    }
    // Hoje (17/out): 18 vendas somando R$ 8.348,87
    return [
      {
        rank: 1,
        title: "Smartphone Xiaomi Poco X7 Pro 5G 512GB",
        salesCount: "7 vendas",
        salesValue: "R$ 3.493,00",
        badge: "🔥",
        type: "gold-phone"
      },
      {
        rank: 2,
        title: "Smart TV PRO 4K Ultra HD AI 55''",
        salesCount: "4 vendas",
        salesValue: "R$ 2.196,00",
        badge: "🔥",
        type: "smart-tv"
      },
      {
        rank: 3,
        title: "Smartphone Motorola Edge 70 5G 256GB",
        salesCount: "3 vendas",
        salesValue: "R$ 1.497,00",
        badge: "📦",
        type: "red-phone"
      },
      {
        rank: 4,
        title: "Fritadeira Elétrica Forno Oven 10L Air Fryer",
        salesCount: "2 vendas",
        salesValue: "R$ 649,74",
        badge: null,
        type: "earphones"
      },
      {
        rank: 5,
        title: "Tênis Esportivo Running Pro Air Cushion",
        salesCount: "2 vendas",
        salesValue: "R$ 513,13",
        badge: "📦",
        type: "sneaker"
      }
    ];
  }, [isOntem]);

  // SVG Chart Dimensions
  const maxVal = 9000;
  const svgWidth = 600;
  const svgHeight = 200;

  // Ontem curve points (all 14 points across 24h)
  const pointsOntem = useMemo(() => {
    return hourlyData.map((d, i) => {
      const x = (i / (hourlyData.length - 1)) * svgWidth;
      const y = svgHeight - (d.ontem / maxVal) * (svgHeight - 20) - 10;
      return { x, y, data: d };
    });
  }, [hourlyData]);

  // Hoje curve points (reaching R$ 8.348,87)
  const liveHojePoints = useMemo(() => {
    return hourlyData.map((d, i) => {
      const x = (i / (hourlyData.length - 1)) * svgWidth;
      const val = d.hoje ?? 8348.87;
      const y = svgHeight - (val / maxVal) * (svgHeight - 20) - 10;
      return { x, y, data: d };
    });
  }, [hourlyData]);

  const createSmoothPath = (pts: { x: number; y: number }[]) => {
    if (pts.length < 2) return "";
    let path = `M ${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i === 0 ? i : i - 1];
      const p1 = pts[i];
      const p2 = pts[i + 1];
      const p3 = pts[i + 2 < pts.length ? i + 2 : i + 1];

      const cp1x = p1.x + (p2.x - p0.x) / 6;
      const cp1y = p1.y + (p2.y - p0.y) / 6;
      const cp2x = p2.x - (p3.x - p1.x) / 6;
      const cp2y = p2.y - (p3.y - p1.y) / 6;

      path += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
    }
    return path;
  };

  const pathOntem = useMemo(() => createSmoothPath(pointsOntem), [pointsOntem]);
  const areaOntem = useMemo(() => `${pathOntem} L ${svgWidth} ${svgHeight} L 0 ${svgHeight} Z`, [pathOntem]);

  // Hoje smooth curve path reaching R$ 8.348,87
  const pathHoje = useMemo(() => createSmoothPath(liveHojePoints), [liveHojePoints]);
  const areaHoje = useMemo(() => `${pathHoje} L ${svgWidth} ${svgHeight} L 0 ${svgHeight} Z`, [pathHoje]);

  // Handle dynamic hover tracking across the chart
  const handleChartMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!chartContainerRef.current) return;
    const rect = chartContainerRef.current.getBoundingClientRect();
    const clientX = e.clientX - rect.left;
    const xPercent = Math.max(0, Math.min(1, clientX / rect.width));
    
    const index = Math.round(xPercent * (hourlyData.length - 1));
    const point = hourlyData[index];
    
    setHoverData({
      index,
      xPercent: (index / (hourlyData.length - 1)) * 100,
      hour: point.hour,
      hoje: point.hoje ?? 8348.87,
      ontem: point.ontem,
    });
  };

  const handleChartMouseLeave = () => {
    setHoverData(null);
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#F4F4F7] text-[#333] flex flex-col font-sans select-none">
      
      {/* ======================================================== */}
      {/* 1. TOP YELLOW BANNER & HERO SECTION                      */}
      {/* ======================================================== */}
      <section className="bg-[#FFE600] w-full pt-4 pb-16 px-4 sm:px-8 lg:px-12 relative">
        {/* Top bar with MAX WIDTH matching the dashboard grid below */}
        <div className="max-w-[1440px] mx-auto flex items-center justify-between pb-3">
          
          {/* Logo Mercado Livre: Exactly calibrated height (neither tiny nor huge) */}
          <div className="flex items-center">
            <img 
              src="/meli-logo-tight.png" 
              alt="Mercado Livre" 
              className="h-9 sm:h-10 w-auto object-contain cursor-pointer transition-transform hover:scale-[1.02]"
            />
          </div>

          {/* Right menu navigation */}
          <div className="flex items-center gap-4 sm:gap-6 text-[13.5px] text-gray-800 font-medium">
            
            {/* User profile: Vitor Carvalho */}
            <div className="flex items-center gap-2 cursor-pointer hover:opacity-85 transition-opacity">
              <div className="w-7 h-7 rounded-full overflow-hidden border border-black/15 bg-white flex items-center justify-center shadow-xs">
                <img 
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" 
                  alt="Vitor Carvalho" 
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-gray-900 font-semibold flex items-center gap-1">
                Vitor Carvalho
                <ChevronDown className="w-3.5 h-3.5 text-gray-700" />
              </span>
            </div>

            <span className="cursor-pointer hover:text-black">Vender</span>
            <span className="cursor-pointer hover:text-black">Ajuda</span>

            {/* Notification Bell */}
            <div className="relative cursor-pointer hover:text-black">
              <Bell className="w-[19px] h-[19px] text-gray-800" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border border-[#FFE600]"></span>
            </div>

            {/* Assistente Pill */}
            <div className="bg-black text-white px-3.5 py-1.5 rounded-full flex items-center gap-1.5 text-xs font-semibold cursor-pointer hover:bg-neutral-800 transition-colors shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
              <span>Assistente</span>
            </div>

            {/* Privacy toggle button */}
            <button 
              onClick={() => setPrivacyMode(!privacyMode)}
              title="Alternar entre Dados Reais e Skeletons da Imagem"
              className="hidden md:flex items-center gap-1 text-xs bg-black/10 hover:bg-black/15 text-gray-800 px-2.5 py-1.5 rounded-full transition-colors font-medium cursor-pointer"
            >
              {privacyMode ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Hero Title & Live Clock */}
        <div className="flex flex-col items-center justify-center mt-2 mb-2 text-center">
          <h1 className="text-[26px] sm:text-[34px] font-bold text-gray-900 tracking-tight">
            {currentHeroTitle}
          </h1>

          {/* Date & Live Ticking Time Badge */}
          <div className="mt-2 z-20">
            <div className="bg-[#EAEAEA] text-gray-700 text-[11.5px] sm:text-[13px] font-medium px-4 py-1 rounded-full shadow-[0_1px_3px_rgba(0,0,0,0.06)] border border-gray-300/60 inline-flex items-center gap-1.5 tracking-wide">
              <span>{isOntem ? `${ontemDateLabel} (ontem),` : `${hojeDateLabel},`}</span>
              <span className="font-semibold text-gray-900">{isOntem ? "23 : 59 : 59" : (liveTime || "00 : 15 : 42")}</span>
            </div>
          </div>
        </div>

        {/* Overlapping Hero Card + Maximize Button Container */}
        <div className="relative max-w-[560px] mx-auto mt-2 flex items-center justify-center">
          {/* Main Hero Card */}
          <div className="bg-white rounded-[26px] shadow-[0_10px_35px_rgba(0,0,0,0.07)] border border-gray-100/90 px-12 sm:px-16 py-4 sm:py-5 min-w-[340px] sm:min-w-[440px] text-center z-20 transition-all">
            <div className="text-[38px] sm:text-[50px] font-normal text-gray-900 tracking-normal leading-none font-sans">
              {privacyMode ? (
                <div className="h-10 w-52 bg-gray-200 rounded-full mx-auto animate-pulse my-1"></div>
              ) : (
                currentHeroValue
              )}
            </div>
          </div>

          {/* Maximize Icon Button (floating to the right) */}
          <button 
            onClick={() => {
              if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen().catch(() => {});
              } else {
                document.exitFullscreen().catch(() => {});
              }
            }}
            title="Tela cheia"
            className="absolute right-0 sm:-right-16 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white shadow-[0_4px_16px_rgba(0,0,0,0.08)] border border-gray-200/60 flex items-center justify-center text-gray-700 hover:text-black hover:scale-105 active:scale-95 transition-all z-20 cursor-pointer"
          >
            <Maximize2 className="w-5 h-5 stroke-[2.2]" />
          </button>
        </div>

        {/* Smooth Organic Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none pointer-events-none">
          <svg 
            className="w-full h-14 sm:h-20 text-[#F4F4F7] fill-current" 
            viewBox="0 0 1440 90" 
            preserveAspectRatio="none"
          >
            <path d="M0,90 L0,20 C360,75 1080,75 1440,20 L1440,90 Z" />
          </svg>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 2. MAIN 3-CARD DASHBOARD GRID                            */}
      {/* ======================================================== */}
      <main className="max-w-[1440px] w-full mx-auto px-4 sm:px-6 lg:px-8 -mt-2 sm:-mt-4 mb-16 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          
          {/* ------------------------------------------------------ */}
          {/* CARD 1: MÉTRICAS-CHAVE (Col 1-3)                       */}
          {/* ------------------------------------------------------ */}
          <div className="lg:col-span-3 bg-white rounded-[22px] p-5 sm:p-6 shadow-[0_2px_14px_rgba(0,0,0,0.04)] border border-gray-200/70 flex flex-col">
            <h2 className="text-[15px] font-bold text-gray-900 text-center mb-5 tracking-tight">
              Métricas-chave
            </h2>

            {/* 2x3 Grid with dividers */}
            <div className="grid grid-cols-2 flex-1 border border-gray-100 rounded-xl overflow-hidden divide-x divide-y divide-gray-100">
              
              {/* 1. Visitas únicas */}
              <div className="flex flex-col items-center justify-center p-3 text-center hover:bg-gray-50/50 transition-colors">
                <div className="w-9 h-9 rounded-full bg-[#EBF3FE] flex items-center justify-center text-[#2563EB] mb-2">
                  <User className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-medium text-gray-600 mb-1.5 leading-tight">
                  Visitas únicas
                </span>
                {privacyMode ? (
                  <div className="h-3.5 w-14 bg-gray-200 rounded-full"></div>
                ) : (
                  <span className="text-[13.5px] font-bold text-gray-900 tracking-tight">
                    {currentMetrics.visitas}
                  </span>
                )}
              </div>

              {/* 2. Total de compradores */}
              <div className="flex flex-col items-center justify-center p-3 text-center hover:bg-gray-50/50 transition-colors">
                <div className="w-9 h-9 rounded-full bg-[#EBF3FE] flex items-center justify-center text-[#2563EB] mb-2">
                  <Users className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-medium text-gray-600 mb-1.5 leading-tight">
                  Total de compradores
                </span>
                {privacyMode ? (
                  <div className="h-3.5 w-14 bg-gray-200 rounded-full"></div>
                ) : (
                  <span className="text-[13.5px] font-bold text-gray-900 tracking-tight">
                    {currentMetrics.compradores}
                  </span>
                )}
              </div>

              {/* 3. Quantidade de vendas */}
              <div className="flex flex-col items-center justify-center p-3 text-center hover:bg-gray-50/50 transition-colors">
                <div className="w-9 h-9 rounded-full bg-[#EBF3FE] flex items-center justify-center text-[#2563EB] mb-2">
                  <ShoppingCart className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-medium text-gray-600 mb-1.5 leading-tight">
                  Quantidade de vendas
                </span>
                {privacyMode ? (
                  <div className="h-3.5 w-14 bg-gray-200 rounded-full"></div>
                ) : (
                  <span className="text-[13.5px] font-bold text-gray-900 tracking-tight">
                    {currentMetrics.vendas}
                  </span>
                )}
              </div>

              {/* 4. Conversão */}
              <div className="flex flex-col items-center justify-center p-3 text-center hover:bg-gray-50/50 transition-colors">
                <div className="w-9 h-9 rounded-full bg-[#EBF3FE] flex items-center justify-center text-[#2563EB] mb-2">
                  <Percent className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-medium text-gray-600 mb-1.5 leading-tight">
                  Conversão
                </span>
                {privacyMode ? (
                  <div className="h-3.5 w-14 bg-gray-200 rounded-full"></div>
                ) : (
                  <span className="text-[13.5px] font-bold text-gray-900 tracking-tight">
                    {currentMetrics.conversao}
                  </span>
                )}
              </div>

              {/* 5. Unidades vendidas */}
              <div className="flex flex-col items-center justify-center p-3 text-center hover:bg-gray-50/50 transition-colors">
                <div className="w-9 h-9 rounded-full bg-[#EBF3FE] flex items-center justify-center text-[#2563EB] mb-2">
                  <Tag className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-medium text-gray-600 mb-1.5 leading-tight">
                  Unidades vendidas
                </span>
                {privacyMode ? (
                  <div className="h-3.5 w-14 bg-gray-200 rounded-full"></div>
                ) : (
                  <span className="text-[13.5px] font-bold text-gray-900 tracking-tight">
                    {currentMetrics.unidades}
                  </span>
                )}
              </div>

              {/* 6. Preço médio */}
              <div className="flex flex-col items-center justify-center p-3 text-center hover:bg-gray-50/50 transition-colors">
                <div className="w-9 h-9 rounded-full bg-[#EBF3FE] flex items-center justify-center text-[#2563EB] mb-2">
                  <CircleDollarSign className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-medium text-gray-600 mb-1.5 leading-tight">
                  Preço médio
                </span>
                {privacyMode ? (
                  <div className="h-3.5 w-14 bg-gray-200 rounded-full"></div>
                ) : (
                  <span className="text-[13.5px] font-bold text-gray-900 tracking-tight">
                    {currentMetrics.precoMedio}
                  </span>
                )}
              </div>

            </div>
          </div>

          {/* ------------------------------------------------------ */}
          {/* CARD 2: TENDÊNCIAS EM VENDAS BRUTAS (Col 4-9)          */}
          {/* ------------------------------------------------------ */}
          <div className="lg:col-span-6 bg-white rounded-[22px] p-5 sm:p-6 shadow-[0_2px_14px_rgba(0,0,0,0.04)] border border-gray-200/70 flex flex-col justify-between">
            {/* Header in PORTUGUESE */}
            <div>
              <h2 className="text-[15px] font-bold text-gray-900 text-center mb-4 tracking-tight">
                Tendências em vendas brutas
              </h2>

              {/* Sub-header Legend with CLICKABLE "Hoje (17/out)" and "Ontem (16/out)" buttons! */}
              <div className="flex items-center justify-between mb-4 px-1 text-[12px]">
                <span className="text-gray-500 font-medium">Vendas (R$)</span>
                
                <div className="flex items-center gap-2">
                  {/* Clickable Hoje Tab (17 de outubro) */}
                  <button 
                    onClick={() => setSelectedPeriod("hoje")}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold cursor-pointer transition-all ${
                      selectedPeriod === "hoje"
                        ? "bg-blue-100 text-blue-700 border border-blue-300 shadow-2xs scale-105"
                        : "text-gray-600 hover:bg-gray-100 border border-transparent"
                    }`}
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-[#2563EB]"></span>
                    <span>Hoje (17/out) • R$ 8.348,87</span>
                  </button>

                  {/* Clickable Ontem Tab (16 de outubro) */}
                  <button 
                    onClick={() => setSelectedPeriod("ontem")}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold cursor-pointer transition-all ${
                      selectedPeriod === "ontem"
                        ? "bg-pink-100 text-[#E03B8B] border border-pink-300 shadow-2xs scale-105"
                        : "text-gray-600 hover:bg-gray-100 border border-transparent"
                    }`}
                  >
                    <span className="w-2.5 h-2.5 rounded-sm bg-[#E03B8B]"></span>
                    <span>Ontem (16/out) • R$ 2.376,97</span>
                  </button>

                  {/* Calendar Icon */}
                  <Calendar className="w-4 h-4 text-blue-500 cursor-pointer hover:opacity-80 ml-1" />
                </div>
              </div>
            </div>

            {/* Interactive SVG Line Chart Container with Mouse Move */}
            <div 
              ref={chartContainerRef}
              onMouseMove={handleChartMouseMove}
              onMouseLeave={handleChartMouseLeave}
              className="relative w-full h-[220px] sm:h-[250px] my-auto cursor-crosshair group"
            >
              
              {/* Dashed Horizontal Guide Lines + Y-axis labels */}
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                {[9000, 7200, 5400, 3600, 1800, 0].map((val, idx) => (
                  <div key={idx} className="flex items-center w-full">
                    {/* Y-axis badge / pill */}
                    <div className="w-14 flex-shrink-0 pr-2">
                      {privacyMode ? (
                        <div className="h-3 w-10 bg-gray-200 rounded-full"></div>
                      ) : (
                        <span className="text-[10px] font-medium text-gray-400">
                          R$ {val}
                        </span>
                      )}
                    </div>
                    {/* Dashed horizontal rule */}
                    <div className="flex-1 border-b border-dashed border-gray-200"></div>
                  </div>
                ))}
              </div>

              {/* The SVG Canvas for smooth curved lines */}
              <svg 
                className="absolute inset-0 w-full h-full pl-14 pr-2 overflow-visible" 
                viewBox={`0 0 ${svgWidth} ${svgHeight}`} 
                preserveAspectRatio="none"
              >
                <defs>
                  {/* Blue gradient fill for Hoje */}
                  <linearGradient id="blueGlow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2563EB" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#2563EB" stopOpacity="0.0" />
                  </linearGradient>

                  {/* Magenta gradient fill for Ontem */}
                  <linearGradient id="pinkGlow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#E03B8B" stopOpacity="0.20" />
                    <stop offset="100%" stopColor="#E03B8B" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* 1. Ontem Area & Curve (16 de outubro: Pink/Magenta #E03B8B) */}
                {selectedPeriod === "ontem" && (
                  <path
                    d={areaOntem}
                    fill="url(#pinkGlow)"
                  />
                )}
                
                <path
                  d={pathOntem}
                  fill="none"
                  stroke="#E03B8B"
                  strokeWidth={selectedPeriod === "ontem" ? "3.2" : "2.0"}
                  strokeOpacity={selectedPeriod === "ontem" ? "1" : "0.5"}
                  strokeLinecap="round"
                />

                {/* 2. Hoje Area & Curve (17 de outubro: Blue #2563EB - reaching R$ 8.348,87) */}
                {selectedPeriod === "hoje" && (
                  <path
                    d={areaHoje}
                    fill="url(#blueGlow)"
                  />
                )}

                <path
                  d={pathHoje}
                  fill="none"
                  stroke="#2563EB"
                  strokeWidth={selectedPeriod === "hoje" ? "3.2" : "2.0"}
                  strokeOpacity={selectedPeriod === "hoje" ? "1" : "0.5"}
                  strokeLinecap="round"
                />

                {/* Live pulsing indicator dot */}
                {!hoverData && (
                  isOntem ? (
                    /* Pulsing dot on Ontem peak (16/out) at 16:00: R$ 2.376,97 */
                    <g transform={`translate(${pointsOntem[9].x}, ${pointsOntem[9].y})`}>
                      <circle r="14" fill="#E03B8B" fillOpacity="0.25" className="animate-ping" />
                      <circle r="8" fill="#E03B8B" fillOpacity="0.4" />
                      <circle r="4.5" fill="#E03B8B" stroke="#FFFFFF" strokeWidth="2" />
                    </g>
                  ) : (
                    /* Pulsing dot on Hoje (17/out) at live peak: R$ 8.348,87 */
                    <g transform={`translate(${liveHojePoints[12].x}, ${liveHojePoints[12].y})`}>
                      <circle r="14" fill="#2563EB" fillOpacity="0.25" className="animate-ping" />
                      <circle r="8" fill="#2563EB" fillOpacity="0.4" />
                      <circle r="4.5" fill="#2563EB" stroke="#FFFFFF" strokeWidth="2" />
                    </g>
                  )
                )}

                {/* Interactive cursor line and points when hovering */}
                {hoverData && (
                  <>
                    <line 
                      x1={pointsOntem[hoverData.index].x} 
                      y1="0" 
                      x2={pointsOntem[hoverData.index].x} 
                      y2={svgHeight} 
                      stroke="#2563EB" 
                      strokeWidth="1.5" 
                      strokeDasharray="4 4"
                    />

                    {/* Point on Ontem curve */}
                    <circle 
                      cx={pointsOntem[hoverData.index].x} 
                      cy={pointsOntem[hoverData.index].y} 
                      r="6" 
                      fill="#E03B8B" 
                      stroke="#FFFFFF" 
                      strokeWidth="2.5" 
                    />

                    {/* Point on Hoje curve */}
                    <circle 
                      cx={liveHojePoints[hoverData.index].x} 
                      cy={liveHojePoints[hoverData.index].y} 
                      r="6" 
                      fill="#2563EB" 
                      stroke="#FFFFFF" 
                      strokeWidth="2.5" 
                    />
                  </>
                )}
              </svg>

              {/* Dynamic Interactive Tooltip that follows the mouse across the entire chart */}
              {hoverData ? (
                <div 
                  style={{
                    left: `calc(56px + ${hoverData.xPercent}% * ((100% - 64px) / 100))`,
                    top: "15%",
                  }}
                  className="absolute -translate-x-1/2 -translate-y-full bg-gray-950/95 backdrop-blur-xs text-white text-[11px] py-2 px-3.5 rounded-xl shadow-xl pointer-events-none z-30 flex flex-col gap-1 min-w-[170px] border border-white/10 transition-all duration-75"
                >
                  <div className="font-semibold text-gray-300 border-b border-white/10 pb-1 flex items-center justify-between">
                    <span>Horário</span>
                    <span className="text-yellow-300 font-bold">{hoverData.hour}</span>
                  </div>
                  <div className="flex items-center justify-between pt-0.5">
                    <span className="flex items-center gap-1.5 text-blue-300">
                      <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                      Hoje (17/out):
                    </span>
                    <span className="font-bold text-white text-[12px]">
                      R$ {hoverData.hoje.toFixed(2).replace(".", ",")}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-pink-300">
                      <span className="w-2 h-2 rounded-sm bg-[#E03B8B]"></span>
                      Ontem (16/out):
                    </span>
                    <span className="font-bold text-pink-300 text-[12px]">
                      R$ {hoverData.ontem.toFixed(2).replace(".", ",")}
                    </span>
                  </div>
                  <div className="text-[9.5px] text-green-400 font-semibold text-right pt-0.5 flex items-center justify-end gap-1">
                    <TrendingUp className="w-3 h-3 inline" />
                    <span>Hoje: Alta Performance</span>
                  </div>
                  <div className="w-2.5 h-2.5 bg-gray-950/95 rotate-45 mx-auto -mb-2 mt-0.5 border-r border-b border-white/10"></div>
                </div>
              ) : (
                /* Static Live Tooltip when idle */
                <div 
                  className="absolute left-[70%] top-[25%] -translate-x-1/2 -translate-y-full bg-gray-900/95 text-white text-[11px] py-1.5 px-3 rounded-lg shadow-lg pointer-events-none z-30 flex flex-col items-center transition-all"
                >
                  <div className="font-semibold text-yellow-300">
                    {isOntem ? "16 de outubro (Ontem)" : "17 de outubro (Hoje ao vivo)"}
                  </div>
                  <div className="font-bold text-white text-[12.5px]">
                    {currentHeroValue}
                  </div>
                  <div className="text-[9.5px] text-green-400">
                    {isOntem ? "Consolidado: 12 vendas" : "18 vendas ao vivo"}
                  </div>
                  <div className="w-2 h-2 bg-gray-900/95 rotate-45 -mb-1 mt-0.5"></div>
                </div>
              )}
            </div>

            {/* Bottom X-axis: Dots & Labels spanning 00h to 24h */}
            <div className="flex items-center justify-between pl-14 pr-2 pt-2 text-[11px] text-gray-400 font-medium">
              <div className="flex items-center justify-between flex-1 pr-6">
                {hourlyData.map((d, i) => (
                  <div 
                    key={i} 
                    className="flex flex-col items-center cursor-pointer group"
                    onMouseEnter={() => setHoverData({
                      index: i,
                      xPercent: (i / (hourlyData.length - 1)) * 100,
                      hour: d.hour,
                      hoje: d.hoje ?? 8348.87,
                      ontem: d.ontem,
                    })}
                  >
                    <div className={`w-1.5 h-1.5 rounded-full transition-colors mb-1 ${hoverData?.index === i ? "bg-[#2563EB] scale-125" : "bg-gray-300 group-hover:bg-[#2563EB]"}`}></div>
                    <span className={`text-[9.5px] transition-colors ${hoverData?.index === i ? "text-[#2563EB] font-bold" : "text-gray-400 group-hover:text-gray-700"}`}>
                      {d.label}
                    </span>
                  </div>
                ))}
              </div>
              <span className="text-[11px] text-gray-400 flex-shrink-0 font-medium">
                Horário
              </span>
            </div>
          </div>

          {/* ------------------------------------------------------ */}
          {/* CARD 3: PRODUTOS MAIS VENDIDOS (Col 10-12)             */}
          {/* ------------------------------------------------------ */}
          <div className="lg:col-span-3 bg-white rounded-[22px] p-5 sm:p-6 shadow-[0_2px_14px_rgba(0,0,0,0.04)] border border-gray-200/70 flex flex-col">
            <h2 className="text-[15px] font-bold text-gray-900 text-center mb-4 tracking-tight">
              Produtos mais vendidos
            </h2>

            <div className="flex flex-col gap-2.5 flex-1">
              {topProducts.map((prod) => {
                const isRank1 = prod.rank === 1;

                return (
                  <div 
                    key={prod.rank}
                    className={`rounded-xl p-2.5 sm:p-3 flex items-center gap-3 transition-all cursor-pointer ${
                      isRank1 
                        ? "bg-gradient-to-r from-[#FFF4B8] via-[#FFF8D6] to-[#FFFDF0] border border-[#FDE047] shadow-[0_2px_8px_rgba(253,224,71,0.25)]" 
                        : "hover:bg-gray-50/80 border border-transparent hover:border-gray-100"
                    }`}
                  >
                    {/* Rank Number */}
                    <span className={`w-4 text-center ${isRank1 ? "text-[20px] text-gray-950 font-bold" : "text-[15px] text-gray-600 font-semibold"}`}>
                      {prod.rank}
                    </span>

                    {/* Product Thumbnail with Badge */}
                    <div className="relative w-11 h-11 rounded-lg bg-white p-1 border border-gray-200/80 shadow-xs flex-shrink-0 flex items-center justify-center overflow-visible">
                      <ProductIcon type={prod.type} />
                      
                      {/* Badge (Flame or Package) */}
                      {prod.badge && (
                        <div className="absolute -bottom-1 -right-1 text-[11px] leading-none bg-white rounded-full p-0.5 shadow-xs border border-gray-100">
                          {prod.badge}
                        </div>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="flex flex-col min-w-0 flex-1">
                      {privacyMode ? (
                        <>
                          <div className="h-3 w-32 bg-gray-200 rounded-full mb-1.5"></div>
                          <div className="h-2.5 w-20 bg-gray-200 rounded-full"></div>
                        </>
                      ) : (
                        <>
                          <span className="text-[12px] font-semibold text-gray-900 truncate leading-snug">
                            {prod.title}
                          </span>
                          <span className="text-[11px] font-medium text-gray-500 mt-0.5">
                            {prod.salesCount} • <span className="font-semibold text-gray-800">{prod.salesValue}</span>
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </main>

      {/* Footer Info */}
      <footer className="w-full text-center py-4 text-xs text-gray-400 border-t border-gray-200/50 bg-white/50">
        Mercado Livre Brasil • Painel de Vendas em Tempo Real (Ao Vivo) • {isOntem ? `Ontem (${ontemDateLabel}): R$ 2.376,97` : `Hoje (${hojeDateLabel}): R$ 8.348,87`}
      </footer>

    </div>
  );
}

// Clean, high quality vector product illustrations (Zero CDN fail risk)
function ProductIcon({ type }: { type: string }) {
  switch (type) {
    case "gold-phone":
      return (
        <svg viewBox="0 0 40 40" className="w-full h-full">
          <rect x="10" y="4" width="20" height="32" rx="4" fill="#F4E0A5" stroke="#C5A059" strokeWidth="1.2" />
          <rect x="12" y="7" width="16" height="26" rx="2" fill="#202020" />
          <circle cx="20" cy="5.5" r="0.8" fill="#555" />
          <rect x="13" y="6" width="7" height="9" rx="1.5" fill="#D8BC78" opacity="0.8" />
          <circle cx="15" cy="8" r="1" fill="#111" />
          <circle cx="15" cy="12" r="1" fill="#111" />
          <circle cx="18" cy="10" r="0.8" fill="#111" />
        </svg>
      );
    case "red-phone":
      return (
        <svg viewBox="0 0 40 40" className="w-full h-full">
          <rect x="10" y="4" width="20" height="32" rx="4" fill="#D32F2F" stroke="#9A0007" strokeWidth="1.2" />
          <rect x="12" y="7" width="16" height="26" rx="2" fill="#1A1A1A" />
          <circle cx="20" cy="5.5" r="0.8" fill="#555" />
          <rect x="13" y="6" width="6" height="8" rx="1.5" fill="#B71C1C" />
          <circle cx="15" cy="8" r="1" fill="#000" />
          <circle cx="15" cy="11" r="1" fill="#000" />
        </svg>
      );
    case "earphones":
      return (
        <svg viewBox="0 0 40 40" className="w-full h-full">
          <rect x="8" y="10" width="24" height="20" rx="6" fill="#2A2A2A" stroke="#111" strokeWidth="1.2" />
          <ellipse cx="20" cy="14" rx="10" ry="2" fill="#3D3D3D" />
          <circle cx="20" cy="22" r="1.5" fill="#00E676" />
        </svg>
      );
    case "sneaker":
      return (
        <svg viewBox="0 0 40 40" className="w-full h-full">
          <path d="M6,26 L12,18 L18,17 L25,20 L34,24 L34,28 L6,28 Z" fill="#212121" stroke="#000" strokeWidth="1" />
          <path d="M5,27 L35,27 L34,30 L5,30 Z" fill="#EEEEEE" />
          <path d="M12,22 Q20,25 28,21" stroke="#FFFFFF" strokeWidth="2" fill="none" />
        </svg>
      );
    case "smart-tv":
    default:
      return (
        <svg viewBox="0 0 40 40" className="w-full h-full">
          <rect x="6" y="8" width="28" height="20" rx="1.5" fill="#263238" stroke="#111" strokeWidth="1.2" />
          <rect x="8" y="10" width="24" height="16" fill="#37474F" />
          <polygon points="12,30 28,30 20,28" fill="#78909C" />
        </svg>
      );
  }
}
