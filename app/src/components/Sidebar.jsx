import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaTachometerAlt, FaWallet, FaExchangeAlt, FaFileInvoiceDollar, FaChartPie, FaCog, FaSignOutAlt } from 'react-icons/fa';

export default function Sidebar() {
  const loc = useLocation();
  return (
    <aside className="sidebar">
      <Link to="/" className="back-home">← Home</Link>
      <nav>
        <Link to="/dashboard"     className={loc.pathname==='/dashboard'?'active':''}>
          <FaTachometerAlt /> Overview
        </Link>
        <Link to="/dashboard/balances">
          <FaWallet /> Balances
        </Link>
        <Link to="/dashboard/transactions">
          <FaExchangeAlt /> Transactions
        </Link>
        <Link to="/dashboard/bills">
          <FaFileInvoiceDollar /> Bills
        </Link>
        <Link to="/dashboard/expenses">
          <FaChartPie /> Expenses
        </Link>
        <Link to="/dashboard/settings">
          <FaCog /> Settings
        </Link>
      </nav>
      <Link to="/" className="back-home">
        <FaSignOutAlt /> Logout
      </Link>
    </aside>
  );
}
