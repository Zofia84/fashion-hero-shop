"use client";

import { useState } from "react";

const BASE = "https://images.unsplash.com/photo-";
const FIT = "?w=240&h=300&fit=crop&auto=format&q=80";

type ProductStatus = "active" | "low" | "promo";

interface Product {
  id: number;
  name: string;
  color: string;
  price: string;
  stock: number;
  status: ProductStatus;
  img: string;
  fallback: string;
}

const INITIAL_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Sukienka midi w kwiaty",
    color: "Blush Pink",
    price: "249 zł",
    stock: 14,
    status: "active",
    img: BASE + "1590574744351-1fbfdf036906" + FIT,
    fallback: "linear-gradient(135deg, #fce4ec 0%, #f8bbd0 100%)",
  },
  {
    id: 2,
    name: "Płaszcz wełniany Oversize",
    color: "Charcoal",
    price: "499 zł",
    stock: 3,
    status: "low",
    img: BASE + "1550101361-43e550ffbf66" + FIT,
    fallback: "linear-gradient(135deg, #eceff1 0%, #cfd8dc 100%)",
  },
  {
    id: 3,
    name: "Spodnie wide-leg lniane",
    color: "Oatmeal",
    price: "189 zł",
    stock: 8,
    status: "active",
    img: BASE + "1767362829004-a2d7da9eaabf" + FIT,
    fallback: "linear-gradient(135deg, #fdf3e7 0%, #f5e0c5 100%)",
  },
  {
    id: 4,
    name: "Koszula oversized z lnem",
    color: "Cloud White",
    price: "159 zł",
    stock: 22,
    status: "active",
    img: BASE + "1763935557931-ca5e1dfc9eae" + FIT,
    fallback: "linear-gradient(135deg, #f9f9f9 0%, #eee 100%)",
  },
  {
    id: 5,
    name: "Sweter z warkoczem",
    color: "Storm Blue",
    price: "279 zł",
    stock: 6,
    status: "low",
    img: BASE + "1771736821210-d3582c3ec870" + FIT,
    fallback: "linear-gradient(135deg, #e3f0fb 0%, #bcd6f0 100%)",
  },
  {
    id: 6,
    name: "Jeansowa kurtka vintage",
    color: "Washed Black",
    price: "329 zł",
    stock: 11,
    status: "active",
    img: BASE + "1601036572102-f8cd483c9518" + FIT,
    fallback: "linear-gradient(135deg, #e8eaf6 0%, #c5cae9 100%)",
  },
];

const PRICING = { credits: 50, days: 7 };

type ModalStep = "pricing" | "confirm" | "success";

function Badge({ status }: { status: ProductStatus }) {
  if (status === "low")
    return (
      <span className="inline-flex items-center gap-1 text-[11px] font-semibold tracking-wide uppercase px-2 py-0.5 rounded-full border border-yellow-300 bg-yellow-50 text-yellow-700">
        ⚠ Mało sztuk
      </span>
    );
  if (status === "promo")
    return (
      <span className="inline-flex items-center gap-1 text-[11px] font-semibold tracking-wide uppercase px-2 py-0.5 rounded-full border border-violet-300 bg-violet-50 text-violet-700">
        ⚡ Promowane
      </span>
    );
  return (
    <span className="inline-flex items-center gap-1 text-[11px] font-semibold tracking-wide uppercase px-2 py-0.5 rounded-full border border-emerald-600 bg-emerald-50 text-emerald-700">
      ● Aktywny
    </span>
  );
}

function ProgressDots({ active }: { active: ModalStep }) {
  const steps: ModalStep[] = ["pricing", "confirm", "success"];
  const ai = steps.indexOf(active);
  return (
    <div className="flex items-center gap-1.5 px-6 pb-4">
      {steps.map((_, i) => (
        <div
          key={i}
          className={`h-1.5 rounded-full transition-all duration-200 ${
            i === ai
              ? "w-[18px] bg-black"
              : i < ai
              ? "w-1.5 bg-gray-400"
              : "w-1.5 bg-gray-200"
          }`}
        />
      ))}
    </div>
  );
}

export default function DashboardPage() {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [credits, setCredits] = useState(2500);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [step, setStep] = useState<ModalStep>("pricing");

  function openModal(product: Product) {
    setSelectedProduct(product);
    setStep("pricing");
  }

  function closeModal() {
    setSelectedProduct(null);
  }

  function goToConfirm() {
    setStep("confirm");
  }

  function goBack() {
    setStep("pricing");
  }

  function goToSuccess() {
    if (!selectedProduct) return;
    const newCredits = credits - PRICING.credits;
    setCredits(newCredits);
    setProducts((prev) =>
      prev.map((p) =>
        p.id === selectedProduct.id ? { ...p, status: "promo" } : p
      )
    );
    setStep("success");
  }

  const isOpen = selectedProduct !== null;

  return (
    <div className="min-h-screen bg-[#fafafa] font-sans">
      {/* Nav */}
      <nav className="bg-white border-b border-gray-200 flex items-center justify-between px-8 h-[60px] sticky top-0 z-50">
        <div className="text-[18px] font-extrabold tracking-tight uppercase">
          Fashion<span className="opacity-40 font-normal">Hero</span>
        </div>
        <div className="flex items-center gap-5 text-[13px] text-gray-500">
          <div className="bg-[#fafafa] border border-gray-200 rounded-full px-3.5 py-1 font-semibold text-[13px] text-black">
            💳 <strong>{credits}</strong> kredytów
          </div>
          <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-[12px] font-bold tracking-wide cursor-pointer">
            MK
          </div>
        </div>
      </nav>

      {/* Page */}
      <main className="max-w-[960px] mx-auto px-6 py-9 pb-20">
        {/* Header */}
        <div className="mb-8">
          <div className="text-[12px] text-gray-400 uppercase tracking-wide mb-2">
            Dashboard → <span className="text-black">Moje produkty</span>
          </div>
          <h1 className="text-[26px] font-extrabold tracking-tight mb-1">
            Moje produkty
          </h1>
          <p className="text-[14px] text-gray-500">
            Zarządzaj listingami i promuj wybrane produkty
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: "Aktywne listingi", value: "24", unit: "produkty" },
            { label: "Sprzedaż (mies.)", value: "11 430", unit: "zł" },
            { label: "Dostępne kredyty", value: String(credits), unit: "krd" },
          ].map((s) => (
            <div
              key={s.label}
              className="bg-white border border-gray-200 rounded-lg p-5"
            >
              <div className="text-[11px] uppercase tracking-widest text-gray-400 mb-1.5">
                {s.label}
              </div>
              <div className="text-[22px] font-extrabold tracking-tight">
                {s.value}{" "}
                <span className="text-[13px] font-normal text-gray-400">
                  {s.unit}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Product list */}
        <div className="flex items-center justify-between mb-4">
          <div className="text-[15px] font-bold tracking-tight">
            Lista produktów
          </div>
          <div className="text-[13px] text-gray-400">Pokazuję 6 z 24</div>
        </div>

        <div className="flex flex-col gap-px bg-gray-200 border border-gray-200 rounded-lg overflow-hidden">
          {products.map((p) => (
            <div
              key={p.id}
              className="bg-white flex items-center gap-4 px-5 py-4 hover:bg-gray-50 transition-colors"
            >
              <div
                className="w-14 h-[72px] rounded flex-shrink-0 overflow-hidden"
                style={{ background: p.fallback }}
              >
                <img
                  src={p.img}
                  alt={p.name}
                  className="w-full h-full object-cover block"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              </div>

              <div className="flex-1 min-w-0">
                <div className="text-[14px] font-semibold truncate mb-0.5">
                  {p.name}
                </div>
                <div className="flex items-center gap-3 text-[12px] text-gray-400">
                  <span>{p.color}</span>
                  <span>{p.stock} szt.</span>
                  <Badge status={p.status} />
                </div>
              </div>

              <div className="text-[15px] font-bold text-right min-w-[72px]">
                {p.price}
              </div>

              <button
                onClick={() => openModal(p)}
                className="flex-shrink-0 bg-black text-white border-none rounded px-4 py-2 text-[12px] font-bold tracking-wide uppercase cursor-pointer hover:bg-gray-800 active:scale-[0.98] transition-all whitespace-nowrap"
              >
                Promuj
              </button>
            </div>
          ))}
        </div>
      </main>

      {/* Modal overlay */}
      {isOpen && selectedProduct && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-6"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
        >
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-[420px] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Step: pricing */}
            {step === "pricing" && (
              <>
                <div className="flex items-start justify-between p-6 pb-0">
                  <div>
                    <div className="text-[11px] font-bold tracking-widest uppercase text-gray-400 mb-2">
                      Krok 1 z 3 — Wybór pakietu
                    </div>
                    <div className="text-[20px] font-extrabold tracking-tight">
                      Promuj produkt
                    </div>
                  </div>
                  <button
                    onClick={closeModal}
                    className="text-gray-400 hover:text-black text-xl leading-none ml-3 mt-1"
                  >
                    ✕
                  </button>
                </div>

                <ProgressDots active="pricing" />

                <div className="px-6">
                  {/* Product preview */}
                  <div className="flex items-center gap-3.5 p-3.5 bg-[#fafafa] border border-gray-200 rounded-lg mb-5">
                    <div
                      className="w-12 h-[60px] rounded flex-shrink-0 overflow-hidden"
                      style={{ background: selectedProduct.fallback }}
                    >
                      <img
                        src={selectedProduct.img}
                        alt={selectedProduct.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = "none";
                        }}
                      />
                    </div>
                    <div>
                      <div className="text-[13px] font-semibold">
                        {selectedProduct.name}
                      </div>
                      <div className="text-[12px] text-gray-400">
                        {selectedProduct.price}
                      </div>
                    </div>
                  </div>

                  {/* Pricing card */}
                  <div className="border-2 border-black rounded-lg p-5 mb-4 relative">
                    <div className="absolute -top-2.5 left-4 bg-black text-white text-[10px] font-bold tracking-widest uppercase px-2.5 py-0.5 rounded-full">
                      Najpopularniejszy
                    </div>
                    <div className="text-[16px] font-bold mb-1">
                      Boost 7-dniowy
                    </div>
                    <div className="text-[13px] text-gray-400 mb-4">
                      Twój produkt pojawi się wyżej w wynikach wyszukiwania i w
                      sekcji Promowane przez 7 dni.
                    </div>
                    <div className="flex items-baseline gap-1.5 mb-4">
                      <div className="text-[36px] font-black tracking-tighter">
                        {PRICING.credits}
                      </div>
                      <div className="text-[14px] text-gray-400">
                        kredytów / {PRICING.days} dni
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      {[
                        "Wyższe pozycje w wyszukiwarce",
                        'Baner "Promowane" na karcie produktu',
                        "Widoczność w sekcji Polecane",
                        "Raport wyświetleń po zakończeniu",
                      ].map((f) => (
                        <div
                          key={f}
                          className="flex items-center gap-2.5 text-[13px]"
                        >
                          <span className="font-bold text-emerald-600">✓</span>
                          {f}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between py-2.5 border-t border-gray-200 text-[12px] text-gray-400">
                    <span>Twoje kredyty</span>
                    <strong className="text-black">{credits} krd</strong>
                  </div>
                </div>

                <div className="flex flex-col gap-2.5 p-6 pt-5">
                  <button
                    onClick={goToConfirm}
                    className="w-full py-3 px-6 rounded bg-black text-white text-[13px] font-bold tracking-wide uppercase hover:bg-gray-800 transition-colors"
                  >
                    Akceptuj — użyj {PRICING.credits} kredytów
                  </button>
                  <button
                    onClick={closeModal}
                    className="w-full py-3 px-6 rounded bg-transparent text-gray-400 border border-gray-200 text-[13px] font-bold tracking-wide uppercase hover:bg-[#fafafa] hover:text-black transition-colors"
                  >
                    Anuluj
                  </button>
                  <div className="text-[11px] text-gray-400 text-center">
                    Nie pobieramy środków — to test nowej funkcji
                  </div>
                </div>
              </>
            )}

            {/* Step: confirm */}
            {step === "confirm" && (
              <>
                <div className="flex items-start justify-between p-6 pb-0">
                  <div>
                    <div className="text-[11px] font-bold tracking-widest uppercase text-gray-400 mb-2">
                      Krok 2 z 3 — Potwierdzenie
                    </div>
                    <div className="text-[20px] font-extrabold tracking-tight">
                      Czy na pewno?
                    </div>
                  </div>
                  <button
                    onClick={closeModal}
                    className="text-gray-400 hover:text-black text-xl leading-none ml-3 mt-1"
                  >
                    ✕
                  </button>
                </div>

                <ProgressDots active="confirm" />

                <div className="px-6 pb-2">
                  <div className="w-14 h-14 rounded-full bg-yellow-100 flex items-center justify-center text-[26px] mb-4">
                    💳
                  </div>
                  <p className="text-[14px] text-gray-500 leading-relaxed">
                    Zamierzasz użyć{" "}
                    <strong className="text-black">{PRICING.credits} kredytów</strong> na
                    promowanie produktu{" "}
                    <strong className="text-black">
                      {selectedProduct.name}
                    </strong>{" "}
                    przez {PRICING.days} dni.
                  </p>

                  <div className="bg-[#fafafa] border border-gray-200 rounded-lg p-4 text-[13px] mt-4 flex flex-col gap-1.5">
                    {[
                      ["Produkt", selectedProduct.name],
                      ["Czas trwania", `${PRICING.days} dni`],
                      ["Koszt", `${PRICING.credits} kredytów`],
                    ].map(([label, val]) => (
                      <div key={label} className="flex justify-between">
                        <span className="text-gray-400">{label}</span>
                        <span className="font-semibold">{val}</span>
                      </div>
                    ))}
                    <div className="flex justify-between pt-1.5 mt-1 border-t border-gray-200">
                      <span className="text-gray-400">Saldo po operacji</span>
                      <span className="font-extrabold text-[15px]">
                        {credits - PRICING.credits} krd
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2.5 p-6 pt-5">
                  <button
                    onClick={goToSuccess}
                    className="w-full py-3 px-6 rounded bg-black text-white text-[13px] font-bold tracking-wide uppercase hover:bg-gray-800 transition-colors"
                  >
                    Tak, promuj ⚡
                  </button>
                  <button
                    onClick={goBack}
                    className="w-full py-3 px-6 rounded bg-transparent text-red-500 border border-red-200 text-[13px] font-bold tracking-wide uppercase hover:bg-red-50 transition-colors"
                  >
                    ← Wróć
                  </button>
                </div>
              </>
            )}

            {/* Step: success */}
            {step === "success" && (
              <>
                <div className="flex justify-end p-6 pb-0">
                  <button
                    onClick={closeModal}
                    className="text-gray-400 hover:text-black text-xl leading-none"
                  >
                    ✕
                  </button>
                </div>

                <ProgressDots active="success" />

                <div className="px-6 text-center pb-2">
                  <span className="text-[52px] mb-4 block animate-bounce">
                    🚀
                  </span>
                  <div className="text-[22px] font-extrabold tracking-tight mb-2">
                    Dziękujemy!
                  </div>
                  <p className="text-[14px] text-gray-500 leading-relaxed max-w-[300px] mx-auto mb-5">
                    Promowanie produktu{" "}
                    <strong>{selectedProduct.name}</strong> pojawi się wkrótce.
                    Powiadomimy Cię, gdy funkcja będzie dostępna.
                  </p>
                  <div className="inline-flex items-center gap-1.5 bg-violet-50 border border-violet-200 text-violet-700 text-[12px] font-bold px-3.5 py-1.5 rounded-full tracking-wide">
                    ⚡ Dostępne wkrótce
                  </div>
                </div>

                <div className="flex flex-col gap-2.5 p-6 pt-5">
                  <button
                    onClick={closeModal}
                    className="w-full py-3 px-6 rounded bg-black text-white text-[13px] font-bold tracking-wide uppercase hover:bg-gray-800 transition-colors"
                  >
                    Gotowe
                  </button>
                  <div className="text-[11px] text-gray-400 text-center">
                    Twoja opinia pomoże nam zbudować tę funkcję szybciej
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
