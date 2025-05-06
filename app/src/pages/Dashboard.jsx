import React from 'react';
import '../styles.css';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  return (
    <div className="container">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <Link to="#" className="btn btn-primary">Add Transaction</Link>
      </div>
      <div className="cards">
        <div className="card"><h2>Total Spend</h2><p>$1,234</p></div>
        <div className="card"><h2>Monthly Budget</h2><p>$2,000</p></div>
        <div className="card"><h2>Forecast</h2><p>$1,800</p></div>
      </div>
      <div className="cards">
        <div className="card"><h2>Transactions</h2><p>(Table goes here)</p></div>
        <div className="card"><h2>Insights</h2><p>(Chart goes here)</p></div>
      </div>
      <Link to="/about" className="btn btn-secondary">Info</Link>
      <Link to="/"      className="btn btn-secondary">Logout</Link>
    </div>
  );
}
