// // // import React from "react";

// // // export default function UserCard({ user, onOpen }) {
// // //   return (
// // //     <div
// // //       onClick={() => onOpen(user.id)}
// // //       className="bg-white p-4 rounded-xl shadow-md flex justify-between items-center cursor-pointer"
// // //     >
// // //       <div>
// // //         <div className="font-semibold">{user.name}</div>
// // //         <div className="text-xs text-gray-500">Total balance with {user.name}</div>
// // //       </div>
// // //       <div className={user.balance >= 0 ? "text-green-600 font-bold" : "text-red-600 font-bold"}>
// // //         {user.balance >= 0 ? "+" : "-"}${Math.abs(user.balance).toFixed(2)}
// // //       </div>
// // //     </div>
// // //   );
// // // }


// // import React, { useContext } from "react";
// // import { ExpenseContext } from "../context/ExpenseContext";

// // export default function UserCard({ user, onOpen, selectedCurrency = "INR", getCurrencySymbol }) {
// //   const { transactions } = useContext(ExpenseContext);

// //   // Filter transactions by user and currency
// //   const getUserTransactions = () => {
// //     const userTransactions = transactions.filter(t => t.userId === user.id);
    
// //     if (selectedCurrency === "ALL") {
// //       return userTransactions;
// //     }
    
// //     return userTransactions.filter(t => (t.currency || "INR") === selectedCurrency);
// //   };

// //   const userTransactions = getUserTransactions();
// //   const userGave = userTransactions.filter(t => t.type === "give").reduce((s, t) => s + t.amount, 0);
// //   const userTook = userTransactions.filter(t => t.type === "take").reduce((s, t) => s + t.amount, 0);
// //   const userNet = userTook - userGave;

// //   // Get display currency symbol
// //   const getDisplaySymbol = () => {
// //     if (selectedCurrency === "ALL") {
// //       // If showing all currencies, use the most common currency for this user
// //       const userCurrencies = userTransactions.map(t => t.currency || "INR");
// //       const currencyCount = {};
// //       userCurrencies.forEach(curr => {
// //         currencyCount[curr] = (currencyCount[curr] || 0) + 1;
// //       });
// //       const mostUsedCurrency = Object.keys(currencyCount).reduce((a, b) => 
// //         currencyCount[a] > currencyCount[b] ? a : b, "INR"
// //       );
// //       return getCurrencySymbol(mostUsedCurrency);
// //     }
// //     return getCurrencySymbol(selectedCurrency);
// //   };

// //   return (
// //     <div 
// //       className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 hover:shadow-md transition-all cursor-pointer"
// //       onClick={() => onOpen(user)}
// //     >
// //       <div className="flex items-center justify-between mb-3">
// //         <div className="flex items-center gap-3">
// //           <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
// //             {user.name.charAt(0).toUpperCase()}
// //           </div>
// //           <div>
// //             <div className="font-semibold text-gray-800">{user.name}</div>
// //             <div className="text-xs text-gray-500">
// //               {userTransactions.length} transactions
// //               {selectedCurrency !== "ALL" && ` in ${selectedCurrency}`}
// //             </div>
// //           </div>
// //         </div>
        
// //         <div className="text-right">
// //           <div className={`text-lg font-bold ${
// //             userNet >= 0 ? 'text-green-600' : 'text-red-600'
// //           }`}>
// //             {userNet >= 0 ? "+" : ""}{getDisplaySymbol()}{Math.abs(userNet).toFixed(2)}
// //           </div>
// //           <div className="text-xs text-gray-500">
// //             {userNet >= 0 ? "owes you" : "you owe"}
// //           </div>
// //         </div>
// //       </div>

// //       {userTransactions.length > 0 && (
// //         <div className="grid grid-cols-2 gap-3 pt-3 border-t border-gray-100">
// //           <div className="text-center">
// //             <div className="text-xs text-red-600 mb-1">You Gave</div>
// //             <div className="text-sm font-semibold text-red-600">
// //               {getDisplaySymbol()}{userGave.toFixed(2)}
// //             </div>
// //           </div>
// //           <div className="text-center">
// //             <div className="text-xs text-green-600 mb-1">You Took</div>
// //             <div className="text-sm font-semibold text-green-600">
// //               {getDisplaySymbol()}{userTook.toFixed(2)}
// //             </div>
// //           </div>
// //         </div>
// //       )}

// //       {/* Show multiple currencies if ALL is selected and user has multiple currencies */}
// //       {selectedCurrency === "ALL" && userTransactions.length > 0 && (
// //         (() => {
// //           const userCurrencies = [...new Set(userTransactions.map(t => t.currency || "INR"))];
// //           if (userCurrencies.length > 1) {
// //             return (
// //               <div className="mt-3 pt-3 border-t border-gray-100">
// //                 <div className="text-xs text-gray-500 mb-2">Multiple currencies:</div>
// //                 <div className="flex flex-wrap gap-1">
// //                   {userCurrencies.map(curr => (
// //                     <span 
// //                       key={curr}
// //                       className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium"
// //                     >
// //                       {getCurrencySymbol(curr)} {curr}
// //                     </span>
// //                   ))}
// //                 </div>
// //               </div>
// //             );
// //           }
// //           return null;
// //         })()
// //       )}
// //     </div>
// //   );
// // }


// import React, { useContext } from "react";
// import { ExpenseContext } from "../context/ExpenseContext";

// export default function UserCard({ user, onOpen, selectedCurrency = "INR", getCurrencySymbol }) {
//   const { transactions } = useContext(ExpenseContext);

//   // Handle click with error checking
//   const handleClick = () => {
//     if (typeof onOpen === 'function' && user) {
//       onOpen(user);
//     } else {
//       console.error('onOpen function not provided or user is undefined');
//     }
//   };

//   // Filter transactions by user and currency
//   const getUserTransactions = () => {
//     const userTransactions = transactions.filter(t => t.userId === user.id);
    
//     if (selectedCurrency === "ALL") {
//       return userTransactions;
//     }
    
//     return userTransactions.filter(t => (t.currency || "INR") === selectedCurrency);
//   };

//   const userTransactions = getUserTransactions();
//   const userGave = userTransactions.filter(t => t.type === "give").reduce((s, t) => s + t.amount, 0);
//   const userTook = userTransactions.filter(t => t.type === "take").reduce((s, t) => s + t.amount, 0);
//   const userNet = userTook - userGave;

//   // Get display currency symbol
//   const getDisplaySymbol = () => {
//     if (selectedCurrency === "ALL") {
//       // If showing all currencies, use the most common currency for this user
//       const userCurrencies = userTransactions.map(t => t.currency || "INR");
//       const currencyCount = {};
//       userCurrencies.forEach(curr => {
//         currencyCount[curr] = (currencyCount[curr] || 0) + 1;
//       });
//       const mostUsedCurrency = Object.keys(currencyCount).reduce((a, b) => 
//         currencyCount[a] > currencyCount[b] ? a : b, "INR"
//       );
//       return getCurrencySymbol(mostUsedCurrency);
//     }
//     return getCurrencySymbol(selectedCurrency);
//   };

//   return (
//     <div 
//       className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 hover:shadow-md transition-all cursor-pointer"
//       onClick={handleClick}
//     >
//       <div className="flex items-center justify-between mb-3">
//         <div className="flex items-center gap-3">
//           <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
//             {user.name.charAt(0).toUpperCase()}
//           </div>
//           <div>
//             <div className="font-semibold text-gray-800">{user.name}</div>
//             <div className="text-xs text-gray-500">
//               {userTransactions.length} transactions
//               {selectedCurrency !== "ALL" && ` in ${selectedCurrency}`}
//             </div>
//           </div>
//         </div>
        
//         <div className="text-right">
//           <div className={`text-lg font-bold ${
//             userNet >= 0 ? 'text-green-600' : 'text-red-600'
//           }`}>
//             {userNet >= 0 ? "+" : ""}{getDisplaySymbol()}{Math.abs(userNet).toFixed(2)}
//           </div>
//           <div className="text-xs text-gray-500">
//             {userNet >= 0 ? "owes you" : "you owe"}
//           </div>
//         </div>
//       </div>

//       {userTransactions.length > 0 && (
//         <div className="grid grid-cols-2 gap-3 pt-3 border-t border-gray-100">
//           <div className="text-center">
//             <div className="text-xs text-red-600 mb-1">You Gave</div>
//             <div className="text-sm font-semibold text-red-600">
//               {getDisplaySymbol()}{userGave.toFixed(2)}
//             </div>
//           </div>
//           <div className="text-center">
//             <div className="text-xs text-green-600 mb-1">You Took</div>
//             <div className="text-sm font-semibold text-green-600">
//               {getDisplaySymbol()}{userTook.toFixed(2)}
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Show multiple currencies if ALL is selected and user has multiple currencies */}
//       {selectedCurrency === "ALL" && userTransactions.length > 0 && (
//         (() => {
//           const userCurrencies = [...new Set(userTransactions.map(t => t.currency || "INR"))];
//           if (userCurrencies.length > 1) {
//             return (
//               <div className="mt-3 pt-3 border-t border-gray-100">
//                 <div className="text-xs text-gray-500 mb-2">Multiple currencies:</div>
//                 <div className="flex flex-wrap gap-1">
//                   {userCurrencies.map(curr => (
//                     <span 
//                       key={curr}
//                       className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium"
//                     >
//                       {getCurrencySymbol(curr)} {curr}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             );
//           }
//           return null;
//         })()
//       )}
//     </div>
//   );
// }

import React, { useContext } from "react";
import { ExpenseContext } from "../context/ExpenseContext";

export default function UserCard({ user, onOpen, selectedCurrency = "INR", getCurrencySymbol }) {
  const { transactions } = useContext(ExpenseContext);

  // Handle click with error checking
  const handleClick = () => {
    if (typeof onOpen === 'function' && user) {
      onOpen(user);
    } else {
      console.error('onOpen function not provided or user is undefined');
    }
  };

  // Filter transactions by user and currency
  const getUserTransactions = () => {
    const userTransactions = transactions.filter(t => t.userId === user.id);
    
    if (selectedCurrency === "ALL") {
      return userTransactions;
    }
    
    return userTransactions.filter(t => (t.currency || "INR") === selectedCurrency);
  };

  const userTransactions = getUserTransactions();
  const userGave = userTransactions.filter(t => t.type === "give").reduce((s, t) => s + t.amount, 0);
  const userTook = userTransactions.filter(t => t.type === "take").reduce((s, t) => s + t.amount, 0);
  const userNet = userTook - userGave;

  // Get display currency symbol
  const getDisplaySymbol = () => {
    if (selectedCurrency === "ALL") {
      // If showing all currencies, use the most common currency for this user
      const userCurrencies = userTransactions.map(t => t.currency || "INR");
      const currencyCount = {};
      userCurrencies.forEach(curr => {
        currencyCount[curr] = (currencyCount[curr] || 0) + 1;
      });
      const mostUsedCurrency = Object.keys(currencyCount).reduce((a, b) => 
        currencyCount[a] > currencyCount[b] ? a : b, "INR"
      );
      return getCurrencySymbol(mostUsedCurrency);
    }
    return getCurrencySymbol(selectedCurrency);
  };

  return (
    <div 
      className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 hover:shadow-md transition-all cursor-pointer"
      onClick={handleClick}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="font-semibold text-gray-800">{user.name}</div>
            <div className="text-xs text-gray-500">
              {userTransactions.length} transactions
              {selectedCurrency !== "ALL" && ` in ${selectedCurrency}`}
            </div>
          </div>
        </div>
        
        <div className="text-right">
          <div className={`text-lg font-bold ${
            userNet >= 0 ? 'text-red-600' : 'text-green-600'
          }`}>
            {userNet >= 0 ? "-" : "+"}{getDisplaySymbol()}{Math.abs(userNet).toFixed(2)}
          </div>
          <div className="text-xs text-gray-500">
            {userNet >= 0 ? "you owe" : "owes you"}
          </div>
        </div>
      </div>

      {userTransactions.length > 0 && (
        <div className="grid grid-cols-2 gap-3 pt-3 border-t border-gray-100">
          <div className="text-center">
            <div className="text-xs text-green-600 mb-1">You Gave</div>
            <div className="text-sm font-semibold text-green-600">
              {getDisplaySymbol()}{userGave.toFixed(2)}
            </div>
          </div>
          <div className="text-center">
            <div className="text-xs text-red-600 mb-1">You Took</div>
            <div className="text-sm font-semibold text-red-600">
              {getDisplaySymbol()}{userTook.toFixed(2)}
            </div>
          </div>
        </div>
      )}

      {/* Show multiple currencies if ALL is selected and user has multiple currencies */}
      {selectedCurrency === "ALL" && userTransactions.length > 0 && (
        (() => {
          const userCurrencies = [...new Set(userTransactions.map(t => t.currency || "INR"))];
          if (userCurrencies.length > 1) {
            return (
              <div className="mt-3 pt-3 border-t border-gray-100">
                <div className="text-xs text-gray-500 mb-2">Multiple currencies:</div>
                <div className="flex flex-wrap gap-1">
                  {userCurrencies.map(curr => (
                    <span 
                      key={curr}
                      className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium"
                    >
                      {getCurrencySymbol(curr)} {curr}
                    </span>
                  ))}
                </div>
              </div>
            );
          }
          return null;
        })()
      )}
    </div>
  );
}