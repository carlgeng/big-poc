import React from 'react';

const DashboardCard = ({ title, value, icon, color }) => {
  const colorClasses = {
    primary: 'bg-primary-light/20 text-primary',
    secondary: 'bg-secondary-light/20 text-secondary',
    success: 'bg-success-light/20 text-success',
    green: 'bg-green-100 text-green-800',
  };

  return (
    <div className="card p-6">
      <div className="flex items-center">
        <div className={`w-12 h-12 rounded-full ${colorClasses[color]} flex items-center justify-center mr-4`}>
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon} />
          </svg>
        </div>
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-2xl font-semibold">{value}</p>
        </div>
      </div>
      </div>
  );
};

export default DashboardCard;