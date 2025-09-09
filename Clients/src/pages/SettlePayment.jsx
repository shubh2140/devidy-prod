import React, { useContext, useState } from "react";
import { ExpenseContext } from "../context/ExpenseContext";

export default function SettlePayment({ userId }) {
  const { users, addTransaction } = useContext(ExpenseContext);
  const user = users.find(u => u.id === userId);
  const [amount, setAmount] = useState("");

  if (!user) return null;

  const handleSettle = () => {
    if (!amount) return;
    // if you settle, choose type "take" if user owes you, or "give" if you owe them.
    // Here we create a transaction of type 'take' to add positive to your balance
    addTransaction(userId, amount, "take", "Settle payment");
    setAmount("");
  };

  return (
    <div className="w-[360px] mx-auto p-4 pb-40">
      <h3 className="font-semibold mb-4">Settle with {user.name}</h3>
      <input value={amount} onChange={(e)=>setAmount(e.target.value)} type="number" placeholder="Amount" className="w-full p-2 border rounded mb-3" />
      <button onClick={handleSettle} className="w-full bg-teal-500 text-white py-2 rounded-lg">Settle Payment</button>
    </div>
  );
}
