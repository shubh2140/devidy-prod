// import React from "react";

// export default function TransactionList({ transactions, users, onDelete }) {
//   const getUserName = (id) => users.find((u) => u.id === id)?.name || "Unknown";
//   return (
//     <div className="space-y-2">
//       {transactions.map((t) => (
//         <div key={t.id} className="flex justify-between items-center bg-white p-3 rounded-xl shadow-sm">
//           <div>
//             <div className="font-medium">{getUserName(t.userId)}</div>
//             <div className="text-xs text-gray-500">{t.note || "No note"} • {new Date(t.date).toLocaleString()}</div>
//           </div>
//           <div className="text-right">
//             <div className={t.type === "give" ? "text-green-500 font-semibold" : "text-red-500 font-semibold"}>
//               {t.type === "give" ? "+" : "-"}${t.amount.toFixed(2)}
//             </div>
//             <button onClick={() => onDelete(t.id)} className="text-xs text-blue-500 mt-1">Delete</button>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }


import React from "react";

export default function TransactionList({ transactions, users, onDelete }) {
  const getUserName = (id) => users.find((u) => u.id === id)?.name || "Unknown";
  
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
    return currencies[currencyCode] || "₹"; // Default to INR if currency not found
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    const isToday = date.toDateString() === today.toDateString();
    const isYesterday = date.toDateString() === yesterday.toDateString();
    
    if (isToday) {
      return `Today, ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } else if (isYesterday) {
      return `Yesterday, ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } else {
      return date.toLocaleDateString([], { 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit', 
        minute: '2-digit' 
      });
    }
  };

  return (
    <div className="space-y-3">
      {transactions.map((t) => (
        <div key={t.id} className="bg-white border border-gray-200 p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <div className="font-semibold text-gray-800">{getUserName(t.userId)}</div>
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                  t.type === "give" 
                    ? "bg-green-100 text-green-700" 
                    : "bg-red-100 text-red-700"
                }`}>
                  {t.type === "give" ? "Gave" : "Took"}
                </div>
              </div>
              
              <div className="text-sm text-gray-600 mb-2">
                {t.note ? (
                  <span className="font-medium">"{t.note}"</span>
                ) : (
                  <span className="italic">No description</span>
                )}
              </div>
              
              <div className="text-xs text-gray-500 flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {formatDateTime(t.date)}
              </div>
            </div>
            
            <div className="text-right ml-4 flex flex-col items-end">
              <div className={`text-lg font-bold mb-2 ${
                t.type === "give" ? "text-green-600" : "text-red-600"
              }`}>
                <span className="flex items-center gap-1">
                  {t.type === "give" ? (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 13l-5 5m0 0l-5-5m5 5V6" />
                    </svg>
                  )}
                  {getCurrencySymbol(t.currency)}{t.amount.toFixed(2)}
                </span>
              </div>
              
              <button 
                onClick={() => onDelete(t.id)} 
                className="px-3 py-1 text-xs text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-red-200 hover:border-red-300"
              >
                <div className="flex items-center gap-1">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Delete
                </div>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}