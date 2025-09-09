import React, { useContext } from "react";
import { ExpenseContext } from "../context/ExpenseContext";

export default function UserDetail({ userId }) {
  const { users, transactions, deleteTransaction, settleWithUser } =
    useContext(ExpenseContext);
  const user = users.find((u) => u.id === userId);
  const userTx = transactions.filter((t) => t.userId === userId);

  if (!user)
    return (
      <div className="w-[360px] mx-auto p-4 pb-40">
        <div className="text-gray-500">User not found</div>
      </div>
    );

  return (
    <div className="w-[360px] mx-auto p-4 pb-40">
      {/* User Header */}
      <div className="flex items-center gap-4 mb-4">
        <div className="relative">
          {user.avatar ? (
            <img
              src={user.avatar}
              alt={user.name || "User"}
              className="w-12 h-12 rounded-full object-cover border border-gray-200"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold text-xl">
              {user.name?.charAt(0)?.toUpperCase() ||
                user.uid?.charAt(0)?.toUpperCase() ||
                "👤"}
            </div>
          )}

          {/* Online/Offline Status Indicator */}
          <span
            className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white ${
              user.status === "online" ? "bg-green-500" : "bg-gray-400"
            }`}
          />
        </div>

        <div className="flex-1">
          <div className="font-semibold text-lg text-gray-900">
            {user.name || user.uid}
          </div>
          <div className="text-sm text-gray-500">
            Balance: ${user.balance?.toFixed(2) || "0.00"}
          </div>
          <div className="text-xs text-gray-400">
            Status: {user.status || "offline"}
          </div>
          {user.uid && (
            <div className="text-xs text-gray-400">ID: {user.uid}</div>
          )}
        </div>
      </div>

      {/* User Actions */}
      <div className="flex gap-3 mb-6">
        <button
          onClick={() => settleWithUser(userId)}
          className="flex-1 bg-teal-500 hover:bg-teal-600 text-white py-2.5 rounded-lg font-medium transition duration-200"
        >
          Settle Up
        </button>
        <button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2.5 rounded-lg font-medium transition duration-200">
          Send Money
        </button>
      </div>

      {/* Additional User Info */}
      {(user.email || user.role || user.lastActiveAt) && (
        <div className="bg-gray-50 rounded-xl p-4 mb-4">
          <h4 className="font-semibold text-gray-800 mb-2">User Information</h4>
          {user.email && (
            <div className="text-sm text-gray-600 mb-1">
              <span className="font-medium">Email:</span> {user.email}
            </div>
          )}
          {user.role && (
            <div className="text-sm text-gray-600 mb-1">
              <span className="font-medium">Role:</span> {user.role}
            </div>
          )}
          {user.lastActiveAt && (
            <div className="text-sm text-gray-600">
              <span className="font-medium">Last Active:</span>{" "}
              {new Date(user.lastActiveAt * 1000).toLocaleString()}
            </div>
          )}
        </div>
      )}

      {/* Transactions Section */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-semibold text-gray-800">Transaction History</h4>
          <span className="text-sm text-gray-500">
            {userTx.length} transaction{userTx.length !== 1 ? "s" : ""}
          </span>
        </div>

        {userTx.length === 0 ? (
          <div className="bg-gray-50 rounded-xl p-6 text-center">
            <div className="text-gray-400 text-4xl mb-2">💸</div>
            <div className="text-gray-500 text-sm">No transactions yet</div>
          </div>
        ) : (
          <div className="space-y-3">
            {userTx.map((t) => (
              <div
                key={t.id}
                className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition duration-200"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="font-medium text-gray-900 mb-1">
                      {t.note || "No description"}
                    </div>
                    <div className="text-xs text-gray-500">
                      {new Date(t.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                    {t.category && (
                      <div className="text-xs text-blue-600 mt-1">
                        📁 {t.category}
                      </div>
                    )}
                  </div>

                  <div className="text-right ml-4">
                    <div
                      className={`font-semibold text-lg ${
                        t.type === "give" ? "text-red-500" : "text-green-500"
                      }`}
                    >
                      {t.type === "give" ? "-" : "+"}${t.amount.toFixed(2)}
                    </div>
                    <button
                      onClick={() => deleteTransaction(t.id)}
                      className="text-xs text-red-500 hover:text-red-700 mt-1 flex items-center gap-1 transition duration-200"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <h4 className="font-semibold text-gray-800 mb-3">Quick Actions</h4>
        <div className="grid grid-cols-2 gap-3">
          <button className="flex flex-col items-center p-3 bg-green-50 hover:bg-green-100 rounded-lg transition duration-200">
            <div className="text-2xl mb-1">💰</div>
            <span className="text-xs text-green-700 font-medium">
              Add Money
            </span>
          </button>
          <button className="flex flex-col items-center p-3 bg-red-50 hover:bg-red-100 rounded-lg transition duration-200">
            <div className="text-2xl mb-1">💸</div>
            <span className="text-xs text-red-700 font-medium">Pay Money</span>
          </button>
          <button className="flex flex-col items-center p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition duration-200">
            <div className="text-2xl mb-1">📊</div>
            <span className="text-xs text-blue-700 font-medium">
              View Reports
            </span>
          </button>
          <button className="flex flex-col items-center p-3 bg-purple-50 hover:bg-purple-100 rounded-lg transition duration-200">
            <div className="text-2xl mb-1">💬</div>
            <span className="text-xs text-purple-700 font-medium">
              Send Message
            </span>
          </button>
        </div>
      </div>

      {/* Balance Summary */}
      {user.balance !== 0 && (
        <div
          className={`mt-4 p-4 rounded-xl ${
            user.balance > 0
              ? "bg-green-50 border border-green-200"
              : "bg-red-50 border border-red-200"
          }`}
        >
          <div className="text-center">
            <div className="text-sm text-gray-600 mb-1">
              {user.balance > 0 ? "You are owed" : "You owe"}
            </div>
            <div
              className={`text-2xl font-bold ${
                user.balance > 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              ${Math.abs(user.balance).toFixed(2)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
