"use client";
import DashboardCard from "@/components/Card";
import React, { useState } from "react";
import { 
    FaBoxOpen, 
    FaBox, 
    FaWarehouse, 
    FaExchangeAlt 
} from "react-icons/fa";

const SparepartsDashboard = () => {
    const [sparePartsData] = useState({
        totalSpareparts: 2500,
        sparepartsIn: 250,
        sparepartsOut: 180,
        totalWarehouseStock: 3700
    });

    const dashboardCards = [
        {
            icon: <FaBoxOpen className="text-2xl" />,
            title: "Total Spare Parts",
            value: sparePartsData.totalSpareparts,
            percentage: 40,
            bgColor: "bg-purple-500 dark:bg-purple-700",
            textColor: "text-purple-600 dark:text-purple-300"
        },
        {
            icon: <FaBox className="text-2xl" />,
            title: "Spare Parts Masuk",
            value: sparePartsData.sparepartsIn,
            percentage: 35,
            bgColor: "bg-green-500 dark:bg-green-700",
            textColor: "text-green-600 dark:text-green-300"
        },
        {
            icon: <FaExchangeAlt className="text-2xl" />,
            title: "Spare Parts Keluar",
            value: sparePartsData.sparepartsOut,
            percentage: 30,
            bgColor: "bg-yellow-500 dark:bg-yellow-700",
            textColor: "text-yellow-600 dark:text-yellow-300"
        },
        {
            icon: <FaWarehouse className="text-2xl" />,
            title: "Stok Gudang",
            value: sparePartsData.totalWarehouseStock,
            percentage: 25,
            bgColor: "bg-blue-500 dark:bg-blue-700",
            textColor: "text-blue-600 dark:text-blue-300"
        }
    ];

    const [categoryOutData] = useState([
        { category: "Mesin Lokomotif", quantity: 75, percentage: 42 },
        { category: "Gerbong", quantity: 45, percentage: 25 },
        { category: "Sistem Rem", quantity: 30, percentage: 17 },
        { category: "Elektrik", quantity: 30, percentage: 16 }
    ]);

    const [requestData] = useState([
        { requestId: "REQ-001", departemen: "Divisi Mesin", kategori: "Komponen Lokomotif", status: "Menunggu Persetujuan", rfidCode: "RFID-LOK-001" },
        { requestId: "REQ-002", departemen: "Divisi Gerbong", kategori: "Komponen Gerbong", status: "Diproses", rfidCode: "RFID-GRB-002" },
        { requestId: "REQ-003", departemen: "Divisi Elektrik", kategori: "Komponen Elektrik", status: "Menunggu Konfirmasi", rfidCode: "RFID-ELK-003" }
    ]);

    return (
        <div className="p-12 bg-neutral-100 dark:bg-neutral-900 min-h-screen dark:text-white">
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mb-6">
                {dashboardCards.map((card, index) => (
                    <DashboardCard 
                        key={index}
                        icon={card.icon}
                        title={card.title}
                        value={card.value}
                        percentage={card.percentage}
                        bgColor={card.bgColor}
                        textColor={card.textColor}
                    />
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-neutral-800 shadow-md rounded-lg p-6 col-span-2 overflow-x-auto">
                    <h3 className="text-lg font-semibold mb-4">Request Barang</h3>
                    <table className="table-bordered bg-neutral-600 w-full text-sm">
                        <thead className="bg-neutral-700 dark:bg-neutral-800">
                            <tr className="text-left">
                                <th className="py-2">No</th>
                                <th className="py-2">Request ID</th>
                                <th className="py-2">Departemen</th>
                                <th className="py-2">Kategori</th>
                                <th className="py-2">Status</th>
                                <th className="py-2">RFID/Kode Barang</th>
                            </tr>
                        </thead>
                        <tbody>
                            {requestData.map((request, index) => (
                                <tr key={request.requestId} className="hover:bg-neutral-800 dark:hover:bg-gray-700">
                                    <td className="py-2">{index + 1}</td>
                                    <td className="py-2">{request.requestId}</td>
                                    <td className="py-2">{request.departemen}</td>
                                    <td className="py-2">{request.kategori}</td>
                                    <td className="py-2">
                                        <span 
                                            className={`
                                                px-2 py-1 rounded-full text-xs
                                                ${request.status === "Diproses" ? "bg-yellow-200 text-yellow-800 dark:bg-yellow-700 dark:text-yellow-200" :
                                                  request.status === "Menunggu Konfirmasi" ? "bg-blue-200 text-blue-800 dark:bg-blue-700 dark:text-blue-200" :
                                                  "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200"}
                                            `}
                                        >
                                            {request.status}
                                        </span>
                                    </td>
                                    <td className="py-2">{request.rfidCode}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Kategori Barang Keluar */}
                <div className="bg-white dark:bg-neutral-800 shadow-md rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-4">Kategori Barang Keluar</h3>
                    {categoryOutData.map((category) => (
                        <div key={category.category} className="mb-4">
                            <div className="flex justify-between text-sm mb-1">
                                <span>{category.category}</span>
                                <span>{category.quantity} ({category.percentage}%)</span>
                            </div>
                            <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                <div 
                                    className="bg-blue-500 dark:bg-blue-400 rounded-full h-2 progress-bar"
                                    style={{ width: `${category.percentage}%` }}
                                ></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SparepartsDashboard;
