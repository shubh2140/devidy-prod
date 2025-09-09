import React, { useState } from "react";
import { ExpenseProvider } from "./context/ExpenseContext";
import Home from "./pages/Home";
import Analytics from "./pages/Analytics";
import MyCards from "./pages/MyCards";
import Profile from "./pages/Profile";
import UserDetail from "./pages/UserDetail";
import SettlePayment from "./pages/SettlePayment";
import BottomNav from "./components/BottomNav";

function AppInner() {
  const [active, setActive] = useState("home");
  const [openUserId, setOpenUserId] = useState(null);
  // For detail screens we keep active = 'detail' or 'settle'
  const openUser = (id) => {
    // console.log("Open user", id)
    // setOpenUserId(id);
    // setActive("detail");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {active === "home" && <Home />}
      {active === "analytics" && <Analytics />}
      {active === "cards" && <MyCards openUser={openUser} />}
      {active === "profile" && <Profile />}
      {active === "detail" && openUserId && <UserDetail userId={openUserId} />}
      {active === "settle" && openUserId && <SettlePayment userId={openUserId} />}

      <BottomNav active={active === "detail" ? "cards" : active} setActive={(k) => { setActive(k); if (k !== "detail" && k !== "settle") setOpenUserId(null); }} />
    </div>
  );
}

export default function App() {
  return (
    <ExpenseProvider>
      <AppInner />
    </ExpenseProvider>
  );
}
