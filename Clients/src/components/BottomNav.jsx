import React from "react";
import { Home, BarChart2, CreditCard, User } from "lucide-react";

export default function BottomNav({ active, setActive }) {
  const btn = (key, Icon, label) => (
    <button
      onClick={() => setActive(key)}
      className={`flex flex-col items-center ${active === key ? "text-teal-600" : "text-gray-400"}`}
    >
      <div className={`${active === key ? "bg-black text-white" : "bg-gray-200"} p-2 rounded-xl`}>
        <Icon size={20} />
      </div>
      <span className="text-xs mt-1">{label}</span>
    </button>
  );

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg flex justify-around py-3 px-4">
      {btn("home", Home, "Home")}
      {btn("analytics", BarChart2, "Analytics")}
      {btn("cards", CreditCard, "Expenses")}
      {btn("profile", User, "Users")}
    </div>
  );
}
