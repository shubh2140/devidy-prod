import React, { createContext, useState, useEffect } from "react";

export const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [transactions, setTransactions] = useState([]);

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedUsers = localStorage.getItem("splitwise_users");
    const savedTransactions = localStorage.getItem("splitwise_transactions");

    if (savedUsers) {
      setUsers(JSON.parse(savedUsers));
    }

    if (savedTransactions) {
      setTransactions(JSON.parse(savedTransactions));
    }
  }, []);

  // Save users to localStorage whenever users state changes
  useEffect(() => {
    if (users.length > 0) {
      localStorage.setItem("splitwise_users", JSON.stringify(users));
    }
  }, [users]);

  // Save transactions to localStorage whenever transactions state changes
  useEffect(() => {
    if (transactions.length > 0) {
      localStorage.setItem(
        "splitwise_transactions",
        JSON.stringify(transactions)
      );
    }
  }, [transactions]);

  const addUser = (name) => {
    const newUser = {
      id: Date.now(),
      name: name.trim(),
      balance: 0,
    };
    setUsers((prev) => [...prev, newUser]);
  };

  const updateUser = (userId, newName) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === userId ? { ...user, name: newName.trim() } : user
      )
    );
  };

  const deleteUser = (userId) => {
    // Remove user
    setUsers((prev) => prev.filter((user) => user.id !== userId));

    // Also remove all transactions related to this user
    setTransactions((prev) =>
      prev.filter((transaction) => transaction.userId !== userId)
    );

    // Update localStorage
    const updatedUsers = users.filter((user) => user.id !== userId);
    const updatedTransactions = transactions.filter(
      (transaction) => transaction.userId !== userId
    );

    if (updatedUsers.length === 0) {
      localStorage.removeItem("splitwise_users");
    }

    if (updatedTransactions.length === 0) {
      localStorage.removeItem("splitwise_transactions");
    }
  };

  const addTransaction = (
    userId,
    amount,
    type,
    note = "",
    currency = "INR"
  ) => {
    const transaction = {
      id: Date.now(),
      userId,
      amount: parseFloat(amount),
      type,
      note,
      currency,
      date: new Date().toISOString(),
    };

    setTransactions((prev) => [transaction, ...prev]);

    // Update user balance
    setUsers((prev) =>
      prev.map((user) => {
        if (user.id === userId) {
          const balanceChange =
            type === "give" ? parseFloat(amount) : -parseFloat(amount);
          return { ...user, balance: user.balance + balanceChange };
        }
        return user;
      })
    );
  };

  const deleteTransaction = (transactionId) => {
    const transaction = transactions.find((t) => t.id === transactionId);
    if (!transaction) return;

    // Remove transaction
    setTransactions((prev) => prev.filter((t) => t.id !== transactionId));

    // Reverse the balance change
    setUsers((prev) =>
      prev.map((user) => {
        if (user.id === transaction.userId) {
          const balanceChange =
            transaction.type === "give"
              ? -transaction.amount
              : transaction.amount;
          return { ...user, balance: user.balance + balanceChange };
        }
        return user;
      })
    );
  };

  const updateTransaction = (transactionId, newAmount, newType, newNote) => {
    const oldTransaction = transactions.find((t) => t.id === transactionId);
    if (!oldTransaction) return;

    // Reverse old transaction effect on balance
    setUsers((prev) =>
      prev.map((user) => {
        if (user.id === oldTransaction.userId) {
          const oldBalanceChange =
            oldTransaction.type === "give"
              ? -oldTransaction.amount
              : oldTransaction.amount;
          return { ...user, balance: user.balance + oldBalanceChange };
        }
        return user;
      })
    );

    // Update transaction
    setTransactions((prev) =>
      prev.map((transaction) =>
        transaction.id === transactionId
          ? {
              ...transaction,
              amount: parseFloat(newAmount),
              type: newType,
              note: newNote,
              updatedAt: new Date().toISOString(),
            }
          : transaction
      )
    );

    // Apply new transaction effect on balance
    setUsers((prev) =>
      prev.map((user) => {
        if (user.id === oldTransaction.userId) {
          const newBalanceChange =
            newType === "give" ? parseFloat(newAmount) : -parseFloat(newAmount);
          return { ...user, balance: user.balance + newBalanceChange };
        }
        return user;
      })
    );
  };

  const clearAllData = () => {
    setUsers([]);
    setTransactions([]);
    localStorage.removeItem("splitwise_users");
    localStorage.removeItem("splitwise_transactions");
  };

  const value = {
    users,
    transactions,
    addUser,
    updateUser,
    deleteUser,
    addTransaction,
    deleteTransaction,
    updateTransaction,
    clearAllData,
  };

  return (
    <ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>
  );
};
