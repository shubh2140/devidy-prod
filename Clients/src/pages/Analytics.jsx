import React, { useContext, useState } from "react";
import { ExpenseContext } from "../context/ExpenseContext";

export default function Analytics() {
  const { transactions, users } = useContext(ExpenseContext);
  const [selectedCurrency, setSelectedCurrency] = useState("INR");
  const [showCurrencyFilter, setShowCurrencyFilter] = useState(false);

  // Currency mapping
  const getCurrencySymbol = (currencyCode) => {
    const currencies = {
      INR: "₹",
      USD: "$",
      EUR: "€",
      GBP: "£",
      JPY: "¥",
      AUD: "A$",
      CAD: "C$",
      CHF: "CHF",
    };
    return currencies[currencyCode] || "₹";
  };

  const currencies = [
    { code: "ALL", name: "All Currencies", symbol: "💰" },
    { code: "INR", name: "Indian Rupee", symbol: "₹" },
    { code: "USD", name: "US Dollar", symbol: "$" },
    { code: "EUR", name: "Euro", symbol: "€" },
    { code: "GBP", name: "British Pound", symbol: "£" },
    { code: "JPY", name: "Japanese Yen", symbol: "¥" },
    { code: "AUD", name: "Australian Dollar", symbol: "A$" },
    { code: "CAD", name: "Canadian Dollar", symbol: "C$" },
    { code: "CHF", name: "Swiss Franc", symbol: "CHF" },
  ];

  // Get unique currencies from transactions
  const usedCurrencies = [
    ...new Set(transactions.map((t) => t.currency || "INR")),
  ];

  // Filter transactions by currency
  const filteredTransactions =
    selectedCurrency === "ALL"
      ? transactions
      : transactions.filter((t) => (t.currency || "INR") === selectedCurrency);

  const totalGiven = filteredTransactions
    .filter((t) => t.type === "give")
    .reduce((s, t) => s + t.amount, 0);
  const totalTaken = filteredTransactions
    .filter((t) => t.type === "take")
    .reduce((s, t) => s + t.amount, 0);
  const netAmount = totalTaken - totalGiven;

  // User-wise breakdown
  const userBreakdown = users
    .map((user) => {
      const userTransactions = filteredTransactions.filter(
        (t) => t.userId === user.id
      );

      const userGave = userTransactions
        .filter((t) => t.type === "give")
        .reduce((s, t) => s + t.amount, 0);

      const userTook = userTransactions
        .filter((t) => t.type === "take")
        .reduce((s, t) => s + t.amount, 0);

      return {
        ...user,
        gave: userGave,
        took: userTook,
        net: userGave - userTook, // ✅ Fixed formula
        transactionCount: userTransactions.length,
      };
    })
    .filter((user) => user.transactionCount > 0);

  const selectedCurrencyObj = currencies.find(
    (c) => c.code === selectedCurrency
  );

  // Get display currency symbol for mixed currency scenarios
  const getDisplayCurrencySymbol = () => {
    if (selectedCurrency === "ALL") {
      // If all currencies, show the most common currency symbol or just use ₹
      const currencyCounts = {};
      filteredTransactions.forEach((t) => {
        const curr = t.currency || "INR";
        currencyCounts[curr] = (currencyCounts[curr] || 0) + 1;
      });
      const mostUsedCurrency = Object.keys(currencyCounts).reduce(
        (a, b) => (currencyCounts[a] > currencyCounts[b] ? a : b),
        "INR"
      );
      return getCurrencySymbol(mostUsedCurrency);
    }
    return getCurrencySymbol(selectedCurrency);
  };

  return (
    <div className="w-[360px] mx-auto p-4 pb-40 bg-gray-50 min-h-screen">
      <header className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Analytics</h2>
            <p className="text-sm text-gray-600">Track your expense patterns</p>
          </div>

          {/* Currency Filter */}
          <div className="relative">
            <button
              onClick={() => setShowCurrencyFilter(!showCurrencyFilter)}
              className="flex items-center gap-2 px-3 py-2 bg-white hover:bg-gray-50 rounded-lg transition-colors text-sm border border-gray-200 shadow-sm"
            >
              <span>{selectedCurrencyObj?.symbol}</span>
              <span className="font-medium">{selectedCurrency}</span>
              <svg
                className={`w-4 h-4 text-gray-400 transform transition-transform ${
                  showCurrencyFilter ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {showCurrencyFilter && (
              <div className="absolute right-0 top-full mt-2 bg-white border border-gray-200 rounded-lg shadow-xl w-52 max-h-60 overflow-y-auto z-20">
                {currencies.map((curr) => {
                  // Only show currencies that have transactions (except ALL)
                  if (
                    curr.code !== "ALL" &&
                    !usedCurrencies.includes(curr.code)
                  ) {
                    return null;
                  }

                  return (
                    <button
                      key={curr.code}
                      onClick={() => {
                        setSelectedCurrency(curr.code);
                        setShowCurrencyFilter(false);
                      }}
                      className={`w-full p-3 text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition-colors ${
                        curr.code === selectedCurrency
                          ? "bg-green-50 text-green-700"
                          : ""
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-lg">{curr.symbol}</span>
                        <div>
                          <div className="font-medium text-sm">{curr.code}</div>
                          <div className="text-xs text-gray-500">
                            {curr.name}
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </header>

      {filteredTransactions.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl shadow-sm">
          <div className="text-gray-300 text-6xl mb-4">📊</div>
          <div className="text-gray-500 text-lg mb-2 font-medium">
            No data to analyze
          </div>
          <div className="text-sm text-gray-400">
            {selectedCurrency === "ALL"
              ? "Add some transactions to see analytics"
              : `No transactions found for ${selectedCurrency}`}
          </div>
        </div>
      ) : (
        <>
          {/* Summary Cards */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 p-5 rounded-xl shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-green-700">You Gave</p>
                <div className="p-2 bg-green-200 rounded-lg">
                  <svg
                    className="w-4 h-4 text-green-700"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 11l5-5m0 0l5 5m-5-5v12"
                    />
                  </svg>
                </div>
              </div>
              <div className="text-2xl font-bold text-green-600">
                {getDisplayCurrencySymbol()}
                {totalGiven.toFixed(2)}
              </div>
              <div className="text-xs text-green-600 mt-1">
                {filteredTransactions.filter((t) => t.type === "give").length}{" "}
                transactions
              </div>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-red-100 border border-red-200 p-5 rounded-xl shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-red-700">You Took</p>
                <div className="p-2 bg-red-200 rounded-lg">
                  <svg
                    className="w-4 h-4 text-red-700"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 13l-5 5m0 0l-5-5m5 5V6"
                    />
                  </svg>
                </div>
              </div>
              <div className="text-2xl font-bold text-red-600">
                {getDisplayCurrencySymbol()}
                {totalTaken.toFixed(2)}
              </div>
              <div className="text-xs text-red-600 mt-1">
                {filteredTransactions.filter((t) => t.type === "take").length}{" "}
                transactions
              </div>
            </div>
          </div>

          {/* Net Balance */}
          <div
            className={`p-6 rounded-xl shadow-lg mb-6 ${
              netAmount >= 0
                ? "bg-gradient-to-br from-pink-500 to-red-500 text-white"
                : "bg-gradient-to-br from-emerald-500 to-teal-500 text-white"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="text-sm opacity-90 font-medium">Net Balance</p>
                <p className="text-xs opacity-75">
                  {selectedCurrency === "ALL"
                    ? `${usedCurrencies.length} currencies`
                    : selectedCurrencyObj?.name}
                </p>
              </div>
              <div className="p-3 bg-white/20 rounded-full">
                {netAmount >= 0 ? (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
                    />
                  </svg>
                )}
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <div className="text-3xl font-bold">
                {getDisplayCurrencySymbol()}
                {Math.abs(netAmount).toFixed(2)}
              </div>
              {netAmount > 0 && (
                <span className="text-lg font-semibold opacity-90">owed</span>
              )}
            </div>
            <div className="mt-2 text-sm opacity-80">
              {netAmount >= 0 ? "You owe this amount 💸" : "You're ahead! 🎉"}
            </div>
          </div>

          {/* User Breakdown */}
          {userBreakdown.length > 0 && (
            <div className="bg-white rounded-xl shadow-lg p-5 mb-6">
              <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                User Breakdown
              </h3>

              <div className="space-y-3">
                {userBreakdown
                  .sort((a, b) => Math.abs(b.net) - Math.abs(a.net)) // Sort by highest net amount
                  .map((user) => (
                    <div
                      key={user.id}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all bg-gray-50/50"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                            {user.name.charAt(0).toUpperCase()}
                          </div>
                          <div className="font-semibold text-gray-800">
                            {user.name}
                          </div>
                        </div>
                        <div
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            user.net >= 0
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {user.net >= 0 ? "" : ""}
                          {getDisplayCurrencySymbol()}
                          {user.net.toFixed(2)}
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-3 text-center">
                        <div className="bg-green-50 rounded-lg p-2">
                          <div className="text-xs text-green-600 mb-1 font-medium">
                            Gave
                          </div>
                          <div className="text-sm font-bold text-green-600">
                            {getDisplayCurrencySymbol()}
                            {user.gave.toFixed(2)}
                          </div>
                        </div>
                        <div className="bg-red-50 rounded-lg p-2">
                          <div className="text-xs text-red-600 mb-1 font-medium">
                            Took
                          </div>
                          <div className="text-sm font-bold text-red-600">
                            {getDisplayCurrencySymbol()}
                            {user.took.toFixed(2)}
                          </div>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-2">
                          <div className="text-xs text-gray-600 mb-1 font-medium">
                            Count
                          </div>
                          <div className="text-sm font-bold text-gray-700">
                            {user.transactionCount}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* Quick Stats */}
          <div className="bg-gradient-to-r from-purple-500 to-green-500 text-white p-5 rounded-xl shadow-lg mb-6">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 00-2-2z"
                />
              </svg>
              Quick Stats
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 rounded-lg p-3">
                <div className="text-xs opacity-80 mb-1">
                  Total Transactions
                </div>
                <div className="text-2xl font-bold">
                  {filteredTransactions.length}
                </div>
              </div>
              <div className="bg-white/10 rounded-lg p-3">
                <div className="text-xs opacity-80 mb-1">Active Users</div>
                <div className="text-2xl font-bold">{userBreakdown.length}</div>
              </div>
              <div className="bg-white/10 rounded-lg p-3">
                <div className="text-xs opacity-80 mb-1">
                  Avg per Transaction
                </div>
                <div className="text-lg font-bold">
                  {getDisplayCurrencySymbol()}
                  {filteredTransactions.length > 0
                    ? (
                        (totalGiven + totalTaken) /
                        filteredTransactions.length
                      ).toFixed(2)
                    : "0.00"}
                </div>
              </div>
              <div className="bg-white/10 rounded-lg p-3">
                <div className="text-xs opacity-80 mb-1">Net Status</div>
                <div className="text-lg font-bold">
                  {netAmount >= 0 ? "📉 Negative" : "📈 Positive"}
                </div>
              </div>
            </div>
          </div>

          {/* Currency Breakdown (if multiple currencies) */}
          {usedCurrencies.length > 1 && selectedCurrency === "ALL" && (
            <div className="bg-white rounded-xl shadow-lg p-5">
              <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                  />
                </svg>
                Currency Breakdown
              </h3>

              <div className="space-y-3">
                {usedCurrencies
                  .sort((a, b) => {
                    // Sort by transaction count descending
                    const aCount = transactions.filter(
                      (t) => (t.currency || "INR") === a
                    ).length;
                    const bCount = transactions.filter(
                      (t) => (t.currency || "INR") === b
                    ).length;
                    return bCount - aCount;
                  })
                  .map((currCode) => {
                    const currTransactions = transactions.filter(
                      (t) => (t.currency || "INR") === currCode
                    );
                    const currGave = currTransactions
                      .filter((t) => t.type === "give")
                      .reduce((s, t) => s + t.amount, 0);
                    const currTook = currTransactions
                      .filter((t) => t.type === "take")
                      .reduce((s, t) => s + t.amount, 0);
                    const currNet = currTook - currGave;

                    return (
                      <div
                        key={currCode}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100 hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                            {getCurrencySymbol(currCode)}
                          </div>
                          <div>
                            <div className="font-medium text-gray-800">
                              {currCode}
                            </div>
                            <div className="text-xs text-gray-500">
                              {currTransactions.length} transactions
                            </div>
                          </div>
                        </div>
                        <div
                          className={`font-bold text-lg ${
                            currNet >= 0 ? "text-red-600" : "text-green-600"
                          }`}
                        >
                          {currNet >= 0 ? "+" : ""}
                          {getCurrencySymbol(currCode)}
                          {currNet.toFixed(2)}
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          )}
        </>
      )}

      {/* Click outside to close currency filter */}
      {showCurrencyFilter && (
        <div
          className="fixed inset-0 z-10"
          onClick={() => setShowCurrencyFilter(false)}
        />
      )}
    </div>
  );
}
