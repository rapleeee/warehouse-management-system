"use client"
import React, { useEffect, useState } from "react";
import SidebarItem from "@/components/SidebarItem";
import {
    FaBars,
    FaChartBar,
    FaClipboardList,
    FaWarehouse,
    FaUserCircle,
    FaHistory,
    FaUsers,
    FaCog,
    FaFileInvoice,
    FaShoppingCart,
} from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { BsCalendar3 } from "react-icons/bs";

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(true);
    const [currentTime, setCurrentTime] = useState<string | null>(null);
    const [currentDate, setCurrentDate] = useState<string | null>(null);

    useEffect(() => {
        const updateClock = () => {
            const now = new Date();

            // Format tanggal: "Jumat, 28 Maret 2025"
            const formattedDate = new Intl.DateTimeFormat("id-ID", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
            }).format(now);

            // Format waktu: "HH:mm:ss"
            const formattedTime = new Intl.DateTimeFormat("id-ID", {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: false, // Gunakan format 24 jam
            }).format(now);

            setCurrentDate(formattedDate);
            setCurrentTime(formattedTime);
        };

        updateClock(); // Jalankan pertama kali
        const timer = setInterval(updateClock, 1000); // Update setiap detik

        return () => clearInterval(timer); // Bersihkan interval saat komponen di-unmount
    }, []);

    return (
        <div className="flex">
            <div
                className={`
                    bg-neutral-800 text-white min-h-screen transition-all duration-300 fixed top-0 left-0 z-40
                    ${isOpen ? "w-64 md:w-64" : "w-16 md:w-16"}
                    h-full overflow-hidden
                `}
            >
                <div className="p-4 flex items-center justify-between">
                    {isOpen && <h2 className="text-lg font-bold">Warehouse Sistem</h2>}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="text-xl ml-auto"
                        aria-label="Toggle sidebar"
                    >
                        <FaBars />
                    </button>
                </div>

                <ul className={`space-y-4 p-4 ${isOpen ? "block" : "flex flex-col items-center"}`}>
                    <SidebarItem icon={<MdDashboard />} text="Dashboard" isOpen={isOpen} href="/" />
                    <SidebarItem icon={<FaShoppingCart />} text="Request Barang" isOpen={isOpen} href="/RequestBarang" />
                    <SidebarItem icon={<FaClipboardList />} text="Barang Keluar" isOpen={isOpen} href="/BarangKeluar" />
                    <SidebarItem icon={<FaWarehouse />} text="Stock Barang" isOpen={isOpen} href="/StockBarang" />
                    <SidebarItem icon={<FaFileInvoice />} text="Supplier Management" isOpen={isOpen} href="/Supplier" />
                    <SidebarItem icon={<FaHistory />} text="History Transaksi" isOpen={isOpen} href="/History" />
                    <SidebarItem icon={<FaUsers />} text="User Management" isOpen={isOpen} href="/User" />
                    <SidebarItem icon={<FaChartBar />} text="Reports" isOpen={isOpen} href="/Reports" />
                    <SidebarItem icon={<FaCog />} text="Settings" isOpen={isOpen} href="/Settings" />
                </ul>
            </div>

            <div
                className={`
                    flex items-center justify-between bg-neutral-800 text-white p-4 w-full fixed top-0 left-0 z-30
                    transition-all duration-300
                    ${isOpen ? "md:pl-64" : "md:pl-16"}
                `}
            >
                <input
                    type="text"
                    placeholder="Search..."
                    className="bg-neutral-700 text-white px-4 py-2 rounded-md hidden md:block"
                />

                <div className="flex items-center gap-4">
                    <div className="hidden md:flex gap-2">
                        <BsCalendar3  className="text-xl text-neutral-200" />
                        {currentDate ? <span className="font-medium">{currentDate}</span> : <span>Loading...</span>}
                        <span className="ml-4">{currentTime}</span>
                    </div>
                    <FaUserCircle className="text-2xl" />
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
