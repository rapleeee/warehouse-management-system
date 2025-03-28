import React from 'react';

const DashboardCard = ({ 
    icon, 
    title, 
    value, 
    percentage, 
    bgColor = 'bg-blue-500', 
    textColor = 'text-blue-600' 
}:any) => {
    return (
        <div className="bg-neutral-800 shadow-md rounded-lg p-6 flex items-center">
            <div className={`${bgColor} text-white p-4 rounded-full mr-4`}>
                {icon}
            </div>
            <div>
                <h3 className="text-gray-500 text-sm">{title}</h3>
                <p className={`text-2xl font-bold ${textColor}`}>{value}</p>
                <p className="text-green-500 text-sm">+{percentage}% this week</p>
            </div>
        </div>
    );
};

export default DashboardCard;