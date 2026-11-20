import { storage } from "./storage.js";
import { CurrencyRate } from "../types/index.js";

export const EXCHANGE_RATES: Record<string, CurrencyRate> = {
  USD: { rate: 1.0, symbol: "$", code: "USD", name: "US Dollar (USD)" },
  INR: { rate: 84.5, symbol: "₹", code: "INR", name: "Indian Rupee (INR)" },
  EUR: { rate: 0.92, symbol: "€", code: "EUR", name: "Euro (EUR)" },
  GBP: { rate: 0.79, symbol: "£", code: "GBP", name: "British Pound (GBP)" },
  CAD: { rate: 1.36, symbol: "CA$", code: "CAD", name: "Canadian Dollar (CAD)" },
  AUD: { rate: 1.52, symbol: "A$", code: "AUD", name: "Australian Dollar (AUD)" },
  SGD: { rate: 1.34, symbol: "S$", code: "SGD", name: "Singapore Dollar (SGD)" },
  AED: { rate: 3.67, symbol: "AED ", code: "AED", name: "UAE Dirham (AED)" },
  JPY: { rate: 154.0, symbol: "¥", code: "JPY", name: "Japanese Yen (JPY)" },
  CHF: { rate: 0.88, symbol: "CHF ", code: "CHF", name: "Swiss Franc (CHF)" }
};

export function detectUserCurrency(): string {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
    const lang = (navigator.language || "").toLowerCase();

    if (tz.includes("Calcutta") || tz.includes("Kolkata") || lang.endsWith("-in")) return "INR";
    if (tz.includes("London") || lang.endsWith("-gb")) return "GBP";
    if (tz.includes("Paris") || tz.includes("Berlin") || tz.includes("Rome") || tz.includes("Madrid") || tz.includes("Amsterdam") || tz.includes("Brussels") || tz.includes("Vienna")) return "EUR";
    if (tz.includes("Toronto") || tz.includes("Vancouver") || tz.includes("Montreal") || lang.endsWith("-ca")) return "CAD";
    if (tz.includes("Sydney") || tz.includes("Melbourne") || tz.includes("Brisbane") || tz.includes("Perth") || lang.endsWith("-au")) return "AUD";
    if (tz.includes("Singapore") || lang.endsWith("-sg")) return "SGD";
    if (tz.includes("Dubai") || tz.includes("Abu_Dhabi") || lang.endsWith("-ae")) return "AED";
    if (tz.includes("Tokyo") || lang.endsWith("-jp")) return "JPY";
    if (tz.includes("Zurich") || lang.endsWith("-ch")) return "CHF";

    return "USD";
  } catch (e) {
    return "USD";
  }
}

export function getActiveCurrency(): string {
  const state = storage.getState();
  if (state.currency && EXCHANGE_RATES[state.currency]) {
    return state.currency;
  }
  const detected = detectUserCurrency();
  state.currency = detected;
  storage.saveState(state);
  return detected;
}

export function setActiveCurrency(currencyCode: string): void {
  if (!EXCHANGE_RATES[currencyCode]) return;
  const state = storage.getState();
  state.currency = currencyCode;
  storage.saveState(state);
  window.dispatchEvent(new CustomEvent("currency_changed", { detail: { currency: currencyCode } }));
}

export function convertFromUSD(amountUSD: number, targetCurrency: string = getActiveCurrency()): number {
  const info = EXCHANGE_RATES[targetCurrency] || EXCHANGE_RATES.USD;
  return amountUSD * info.rate;
}

export function formatCurrencyFromUSD(amountUSD: number, targetCurrency: string = getActiveCurrency(), roundToHundreds: boolean = true): string {
  const info = EXCHANGE_RATES[targetCurrency] || EXCHANGE_RATES.USD;
  let converted = amountUSD * info.rate;

  if (roundToHundreds) {
    if (targetCurrency === "JPY") {
      converted = Math.round(converted / 1000) * 1000;
    } else if (targetCurrency === "INR") {
      converted = Math.round(converted / 10000) * 10000;
    } else {
      converted = Math.round(converted / 1000) * 1000;
    }
  }

  const locale = targetCurrency === "INR" ? "en-IN" : "en-US";

  try {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: info.code,
      maximumFractionDigits: 0
    }).format(converted);
  } catch (e) {
    return `${info.symbol}${Math.round(converted).toLocaleString()}`;
  }
}

export function formatSalaryRange(minUSD: number, maxUSD: number, targetCurrency: string = getActiveCurrency()): string {
  const minFormatted = formatCurrencyFromUSD(minUSD, targetCurrency);
  const maxFormatted = formatCurrencyFromUSD(maxUSD, targetCurrency);
  return `${minFormatted} – ${maxFormatted} / yr`;
}

export function formatTuition(annualUSD: number, targetCurrency: string = getActiveCurrency()): string {
  if (!annualUSD || annualUSD === 0) return "Tuition-Free / Fully Funded";
  return `${formatCurrencyFromUSD(annualUSD, targetCurrency)} / yr`;
}

export function initCurrencySelector(): void {
  const container = document.getElementById("currency-selector-container");
  if (!container) return;

  const current = getActiveCurrency();

  container.innerHTML = `
    <div class="currency-picker-wrapper" title="Currency automatically localized to your region. Click to change.">
      <span class="currency-globe-icon">
        <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
      </span>
      <select id="global-currency-select" class="currency-select" aria-label="Select currency">
        ${Object.keys(EXCHANGE_RATES).map(code => `
          <option value="${code}" ${code === current ? "selected" : ""}>
            ${code} (${EXCHANGE_RATES[code].symbol.trim()})
          </option>
        `).join("")}
      </select>
    </div>
  `;

  const select = document.getElementById("global-currency-select") as HTMLSelectElement | null;
  if (select) {
    select.addEventListener("change", (e: Event) => {
      const target = e.target as HTMLSelectElement;
      setActiveCurrency(target.value);
    });
  }
}
