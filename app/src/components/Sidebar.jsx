import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaTachometerAlt, FaWallet, FaExchangeAlt, FaFileInvoiceDollar, FaChartPie, FaCog, FaSignOutAlt, FaHome } from 'react-icons/fa';
import { useAuth } from '../contexts/authContext';

export default function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  return (
    <aside className="sidebar">
      <Link to="/" className="back-home">
        <FaHome /> Home
      </Link>
      
      <nav>
        <Link to="/dashboard">
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

      <button onClick={handleLogout} className="logout-button">
        <FaSignOutAlt /> Logout
      </button>

      {user && (
        <div className="user-info">
          Signed in as {user.email}
        </div>
      )}
    </aside>
  );
}
