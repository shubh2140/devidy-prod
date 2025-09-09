// import React from "react";

// export default function BalanceCard({ total }) {
//   return (
//     <div className="px-4">
//       <div className="rounded-2xl bg-gradient-to-r from-green-400 via-teal-400 to-yellow-300 p-5 text-white shadow-md">
//         <p className="text-sm opacity-80">Total Balance</p>
//         <h2 className="text-3xl font-bold">${total.toFixed(2)}</h2>
//       </div>
//     </div>
//   );
// }


import React from "react";

export default function BalanceCard({ total, currency = "INR" }) {
  // Currency mapping
  const getCurrencySymbol = (currencyCode) => {
    const currencies = {
      "INR": "₹",
      "USD": "$",
      "EUR": "€",
      "GBP": "£",
      "JPY": "¥",
      "AUD": "A$",
      "CAD": "C$",
      "CHF": "CHF",
    };
    return currencies[currencyCode] || "₹";
  };

  const getCurrencyName = (currencyCode) => {
    const currencies = {
      "INR": "Indian Rupees",
      "USD": "US Dollars",
      "EUR": "Euros",
      "GBP": "British Pounds",
      "JPY": "Japanese Yen",
      "AUD": "Australian Dollars",
      "CAD": "Canadian Dollars",
      "CHF": "Swiss Francs",
    };
    return currencies[currencyCode] || "Indian Rupees";
  };

  const isPositive = total >= 0;
  const currencySymbol = getCurrencySymbol(currency);
  const currencyName = getCurrencyName(currency);

  return (
    <div className="px-4">
      <div className={`rounded-2xl p-6 text-white shadow-lg relative overflow-hidden ${
        isPositive 
          ? "bg-gradient-to-br from-green-500 via-emerald-500 to-teal-500" 
          : "bg-gradient-to-br from-red-500 via-pink-500 to-rose-500"
      }`}>
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 right-4">
            <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </div>
          <div className="absolute bottom-4 left-4">
            <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
              <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/>
            </svg>
          </div>
        </div>

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-2">
            <div>
              <p className="text-sm opacity-90 font-medium">Total Balance</p>
              <p className="text-xs opacity-70">{currencyName}</p>
            </div>
            <div className={`p-2 rounded-full ${
              isPositive ? "bg-white/20" : "bg-white/20"
            }`}>
              {isPositive ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                </svg>
              )}
            </div>
          </div>

          <div className="flex items-baseline gap-1">
            <h2 className="text-4xl font-bold tracking-tight">
              {currencySymbol}{Math.abs(total).toFixed(2)}
            </h2>
            {!isPositive && (
              <span className="text-lg font-semibold opacity-90">debt</span>
            )}
          </div>

          {/* Status indicator */}
          <div className="mt-3 flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${
              isPositive ? "bg-green-200" : "bg-red-200"
            }`}></div>
            <span className="text-xs opacity-80 font-medium">
              {isPositive 
                ? "You're in the positive!" 
                : "You owe money to others"
              }
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}