import React, { useContext, useState } from "react";
import { ExpenseContext } from "../context/ExpenseContext";
import BalanceCard from "../components/BalanceCard";
import TransactionList from "../components/TransactionList";

export default function Home() {
  const { users, transactions, addTransaction, deleteTransaction } =
    useContext(ExpenseContext);
  const [userId, setUserId] = useState("");
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("INR");
  const [type, setType] = useState("give");
  const [note, setNote] = useState("");
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isTypeDropdownOpen, setIsTypeDropdownOpen] = useState(false);
  const [isCurrencyDropdownOpen, setIsCurrencyDropdownOpen] = useState(false);

  const currencies = [
    { code: "INR", symbol: "₹", name: "Indian Rupee" },
    { code: "USD", symbol: "$", name: "US Dollar" },
    { code: "EUR", symbol: "€", name: "Euro" },
    { code: "GBP", symbol: "£", name: "British Pound" },
    { code: "JPY", symbol: "¥", name: "Japanese Yen" },
    { code: "AUD", symbol: "A$", name: "Australian Dollar" },
    { code: "CAD", symbol: "C$", name: "Canadian Dollar" },
    { code: "CHF", symbol: "CHF", name: "Swiss Franc" },
  ];

  const selectedCurrency = currencies.find((c) => c.code === currency);

  const total = users.reduce((s, u) => s + u.balance, 0);
  const selectedUser = users.find((u) => u.id === Number(userId));

  const handleAdd = (e) => {
    e.preventDefault();
    if (!userId || !amount) return;
    addTransaction(Number(userId), amount, type, note, currency);
    setAmount("");
    setNote("");
  };

  const handleUserSelect = (id, name) => {
    setUserId(id.toString());
    setIsUserDropdownOpen(false);
  };

  const handleTypeSelect = (selectedType, label) => {
    setType(selectedType);
    setIsTypeDropdownOpen(false);
  };

  const handleCurrencySelect = (currencyCode) => {
    setCurrency(currencyCode);
    setIsCurrencyDropdownOpen(false);
  };

  return (
    <div className="w-[360px] mx-auto pb-32">
      <header className="flex items-center justify-between p-4">
        <div className="flex items-center gap-2">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-xl">D</span>
          </div>
          <h1 className="font-bold text-lg">Dividy</h1>
        </div>
        <div className="flex gap-2">
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
            👤
          </div>
        </div>
      </header>

      <BalanceCard total={total} currency={currency} />

      <div className="px-4 mt-4">
        <form onSubmit={handleAdd} className="space-y-3">
          {/* Custom User Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setIsUserDropdownOpen(!isUserDropdownOpen);
                setIsTypeDropdownOpen(false);
                setIsCurrencyDropdownOpen(false);
              }}
              className="w-full p-3 border border-gray-300 rounded-lg bg-white text-left flex items-center justify-between hover:border-gray-400 transition-colors"
            >
              <span
                className={selectedUser ? "text-gray-900" : "text-gray-500"}
              >
                {selectedUser ? selectedUser.name : "Select user"}
              </span>
              <svg
                className={`w-5 h-5 text-gray-400 transform transition-transform ${
                  isUserDropdownOpen ? "rotate-180" : ""
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

            {isUserDropdownOpen && (
              <div className="absolute z-20 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                {users.map((user) => (
                  <button
                    key={user.id}
                    type="button"
                    onClick={() => handleUserSelect(user.id, user.name)}
                    className="w-full p-3 text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{user.name}</span>
                      <span
                        className={`text-sm ${
                          user.balance >= 0 ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {selectedCurrency.symbol}
                        {user.balance.toFixed(2)}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Amount Input with Currency */}
          <div className="relative flex-1">
            <div className="flex">
              <input
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                type="number"
                step="0.01"
                placeholder="0.00"
                className="flex-1 p-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent border-r-0"
              />

              {/* Currency Dropdown */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => {
                    setIsCurrencyDropdownOpen(!isCurrencyDropdownOpen);
                    setIsUserDropdownOpen(false);
                    setIsTypeDropdownOpen(false);
                  }}
                  className="px-4 py-3 border border-gray-300 rounded-r-lg bg-gray-50 hover:bg-gray-100 transition-colors flex items-center gap-2"
                >
                  <span className="font-medium text-sm">
                    {selectedCurrency.symbol}
                  </span>
                  <svg
                    className={`w-4 h-4 text-gray-400 transform transition-transform ${
                      isCurrencyDropdownOpen ? "rotate-180" : ""
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

                {isCurrencyDropdownOpen && (
                  <div className="absolute right-0 top-full mt-1 bg-white border border-gray-300 rounded-lg shadow-xl w-60 max-h-64 overflow-y-auto z-50">
                    {currencies.map((curr) => (
                      <button
                        key={curr.code}
                        type="button"
                        onClick={() => handleCurrencySelect(curr.code)}
                        className={`w-full p-3 text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition-colors ${
                          curr.code === currency
                            ? "bg-blue-50 text-blue-700"
                            : ""
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="font-bold text-lg min-w-[24px]">
                              {curr.symbol}
                            </span>
                            <div>
                              <div className="font-medium">{curr.code}</div>
                              <div className="text-xs text-gray-500">
                                {curr.name}
                              </div>
                            </div>
                          </div>
                          {curr.code === currency && (
                            <svg
                              className="w-4 h-4 text-blue-600"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Custom Type Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setIsTypeDropdownOpen(!isTypeDropdownOpen);
                setIsUserDropdownOpen(false);
                setIsCurrencyDropdownOpen(false);
              }}
              className="w-full p-3 border border-gray-300 rounded-lg bg-white flex items-center justify-center hover:border-gray-400 transition-colors"
            >
              <span className="text-sm font-medium flex items-center gap-1">
                {type === "give" ? (
                  <>
                    <span className="text-green-600">↗️</span>
                    Gave
                  </>
                ) : (
                  <>
                    <span className="text-red-600">↙️</span>
                    Took
                  </>
                )}
              </span>
              <svg
                className={`w-4 h-4 text-gray-400 transform transition-transform ml-1 ${
                  isTypeDropdownOpen ? "rotate-180" : ""
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

            {isTypeDropdownOpen && (
              <div className="absolute left-0 top-full mt-1 bg-white border border-gray-300 rounded-lg shadow-xl w-full z-50">
                <button
                  type="button"
                  onClick={() => handleTypeSelect("give", "I gave")}
                  className={`w-full p-3 text-center hover:bg-gray-50 border-b border-gray-100 text-sm transition-colors ${
                    type === "give" ? "bg-green-50 text-green-700" : ""
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-green-600">↗️</span>
                    <span>I gave</span>
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => handleTypeSelect("take", "I took")}
                  className={`w-full p-3 text-center hover:bg-gray-50 text-sm transition-colors ${
                    type === "take" ? "bg-red-50 text-red-700" : ""
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-red-600">↙️</span>
                    <span>I took</span>
                  </div>
                </button>
              </div>
            )}
          </div>

          <input
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Add a note (optional)"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />

          <button
            disabled={!userId || !amount}
            className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-3 rounded-xl hover:from-green-700 hover:to-blue-700 transition-all font-medium disabled:bg-gray-300 disabled:cursor-not-allowed transform active:scale-95"
          >
            <span className="flex items-center justify-center gap-2">
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
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              Add Expense
            </span>
          </button>
        </form>
      </div>

      <div className="px-4 mt-6">
        <h3 className="font-semibold mb-3 flex items-center gap-2">
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
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Recent Transactions
        </h3>
        {transactions.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-gray-300 text-4xl mb-3">💸</div>
            <div className="text-sm text-gray-500">No transactions yet</div>
            <div className="text-xs text-gray-400 mt-1">
              Add your first expense above
            </div>
          </div>
        ) : (
          <TransactionList
            transactions={transactions}
            users={users}
            onDelete={deleteTransaction}
          />
        )}
      </div>

      {/* Click outside to close dropdowns */}
      {(isUserDropdownOpen || isTypeDropdownOpen || isCurrencyDropdownOpen) && (
        <div
          className="fixed inset-0 z-10"
          onClick={() => {
            setIsUserDropdownOpen(false);
            setIsTypeDropdownOpen(false);
            setIsCurrencyDropdownOpen(false);
          }}
        />
      )}
    </div>
  );
}
