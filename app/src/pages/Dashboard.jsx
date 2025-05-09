import React from 'react';
import Sidebar from '../components/Sidebar';
import { FaWallet, FaDollarSign, FaChartLine } from 'react-icons/fa';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useAuth } from '../contexts/authContext';

export default function Dashboard() {
  const { user } = useAuth();

  const stats = [
    { icon:FaWallet,     label:'Total Balance', value:'$240,399' },
    { icon:FaDollarSign, label:'Monthly Budget', value:'$20,000' },
    { icon:FaChartLine,  label:'Forecast',       value:'$18,000' },
  ];

  const weekly = [
    { day:'Sun', thisWeek:40, lastWeek:20 },
    { day:'Mon', thisWeek:30, lastWeek:25 },
    { day:'Tue', thisWeek:20, lastWeek:15 },
    { day:'Wed', thisWeek:35, lastWeek:30 },
    { day:'Thu', thisWeek:45, lastWeek:40 },
    { day:'Fri', thisWeek:50, lastWeek:42 },
    { day:'Sat', thisWeek:47, lastWeek:38 },
  ];

  return (
    <div className="dashboard-wrapper">
      <Sidebar />

      <div className="dashboard-main">
        <h1>Dashboard</h1>
        <p>Welcome, {user.email}!</p>

        {/* Stats */}
        <div className="dashboard-grid three">
          {stats.map((s,i)=>(
            <div key={i} className="card">
              <div className="card-header">
                <h3>{s.label}</h3>
              </div>
              <div className="card-value">{s.value}</div>
            </div>
          ))}
        </div>

        {/* Weekly Comparison */}
        <div className="card">
          <div className="card-header"><h3>Weekly Comparison</h3></div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={weekly}>
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip formatter={v=>[v+'k','']} />
              <Bar dataKey="thisWeek" name="This Week" fill="#28a745" />
              <Bar dataKey="lastWeek" name="Last Week" fill="#ccc" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="dashboard-footer">© 2025 Spara Services Inc.</div>
      </div>
    </div>
  );
}
