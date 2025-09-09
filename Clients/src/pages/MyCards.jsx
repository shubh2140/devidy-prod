import React, { useContext, useState } from "react";
import { ExpenseContext } from "../context/ExpenseContext";
import UserCard from "../components/UserCard";

export default function MyCards({ openUser }) {
  const { users, transactions } = useContext(ExpenseContext);

  // Handle user click with error checking
  const handleUserClick = (user) => {
    if (typeof openUser === "function") {
      openUser(user);
    } else {
      console.error("openUser function not provided or not a function");
    }
  };
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

  // Filter users based on selected currency
  const getFilteredUsers = () => {
    if (selectedCurrency === "ALL") {
      return users;
    }

    // Only show users who have transactions in the selected currency
    return users.filter((user) => {
      const userTransactions = transactions.filter(
        (t) =>
          t.userId === user.id && (t.currency || "INR") === selectedCurrency
      );
      return userTransactions.length > 0;
    });
  };

  const filteredUsers = getFilteredUsers();
  const selectedCurrencyObj = currencies.find(
    (c) => c.code === selectedCurrency
  );

  return (
    <div className="w-[360px] mx-auto p-4 pb-40 bg-gray-50 min-h-screen">
      <header className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-800">My Expenses</h2>
            <p className="text-sm text-gray-600">Manage your Expenses</p>
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
                          ? "bg-blue-50 text-blue-700"
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

        {/* Filter info */}
        {selectedCurrency !== "ALL" && (
          <div className="mt-3 px-3 py-2 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-700">
              Showing users with {selectedCurrencyObj?.name} transactions only
            </p>
          </div>
        )}
      </header>

      <div className="space-y-4">
        {filteredUsers.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm">
            <div className="text-gray-300 text-6xl mb-4">👥</div>
            <div className="text-gray-500 text-lg mb-2 font-medium">
              {selectedCurrency === "ALL"
                ? "No users added yet"
                : `No users with ${selectedCurrency} transactions`}
            </div>
            <div className="text-sm text-gray-400">
              {selectedCurrency === "ALL"
                ? "Add some users to get started"
                : "Try selecting 'All Currencies' to see all users"}
            </div>
          </div>
        ) : (
          filteredUsers.map((user) => (
            <UserCard
              key={user.id}
              user={user}
              onOpen={handleUserClick}
              selectedCurrency={selectedCurrency}
              getCurrencySymbol={getCurrencySymbol}
            />
          ))
        )}
      </div>

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
