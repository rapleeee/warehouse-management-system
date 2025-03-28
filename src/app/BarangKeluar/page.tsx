"use client";
import React, { useState } from "react";
import { FaCheck, FaBarcode } from "react-icons/fa";

const BarangKeluar = () => {
    // State untuk daftar barang keluar
    const [barangKeluar, setBarangKeluar] = useState([
        { id: 1, nama: "Oli Mesin", jumlah: 5, pengeluar: "", tanggalKeluar: "", status: "Menunggu Scan", rfid: "" },
        { id: 2, nama: "Busi Motor", jumlah: 10, pengeluar: "", tanggalKeluar: "", status: "Menunggu Scan", rfid: "" },
    ]);

    // State untuk RFID input
    const [rfidInput, setRfidInput] = useState("");
    const [pengeluar, setPengeluar] = useState("");

    // Handle scan RFID
    const handleScanRFID = (id: number) => {
        if (!rfidInput || !pengeluar) {
            alert("Masukkan RFID dan nama pengeluar!");
            return;
        }

        setBarangKeluar(
            barangKeluar.map((item) =>
                item.id === id
                    ? {
                        ...item,
                        status: "Dikeluarkan",
                        rfid: rfidInput,
                        pengeluar: pengeluar,
                        tanggalKeluar: new Date().toLocaleString(),
                    }
                    : item
            )
        );

        // Reset input RFID dan Pengeluar
        setRfidInput("");
        setPengeluar("");
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6 text-gray-200">📦 Barang Keluar</h1>
            <div className="mb-4 flex gap-3">
                <input
                    type="text"
                    value={pengeluar}
                    onChange={(e) => setPengeluar(e.target.value)}
                    placeholder="Nama Pengeluar"
                    className="p-2 rounded-md bg-neutral-800 text-white w-full border border-gray-600"
                />
            </div>
            {/* Tabel Barang Keluar */}
            <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-700 bg-neutral-900 rounded-lg text-gray-300">
                    <thead className="bg-neutral-800 text-gray-200 uppercase">
                        <tr>
                            <th className="border border-gray-700 px-4 py-2">No</th>
                            <th className="border border-gray-700 px-4 py-2">Nama Barang</th>
                            <th className="border border-gray-700 px-4 py-2">Jumlah</th>
                            <th className="border border-gray-700 px-4 py-2">RFID</th>
                            <th className="border border-gray-700 px-4 py-2">Pengeluar</th>
                            <th className="border border-gray-700 px-4 py-2">Status</th>
                            <th className="border border-gray-700 px-4 py-2">Tanggal Keluar</th>
                            <th className="border border-gray-700 px-4 py-2">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {barangKeluar.map((item, index) => (
                            <tr key={item.id} className="hover:bg-neutral-800">
                                <td className="border border-gray-700 px-4 py-2 text-center">{index + 1}</td>
                                <td className="border border-gray-700 px-4 py-2">{item.nama}</td>
                                <td className="border border-gray-700 px-4 py-2 text-center">{item.jumlah}</td>
                                <td className="border border-gray-700 px-4 py-2 text-center">{item.rfid || "Belum Scan"}</td>
                                <td className="border border-gray-700 px-4 py-2 text-center">{item.pengeluar || "Belum Ada"}</td>
                                <td className={`border border-gray-700 px-4 py-2 text-center font-bold 
                                    ${item.status === "Dikeluarkan" ? "text-green-400" : "text-yellow-400"}`}>
                                    {item.status}
                                </td>
                                <td className="border border-gray-700 px-4 py-2 text-center">{item.tanggalKeluar || "Belum Keluar"}</td>
                                <td className="border border-gray-700 px-4 py-2 text-center">
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="text"
                                            value={rfidInput}
                                            onChange={(e) => setRfidInput(e.target.value)}
                                            placeholder="Scan RFID"
                                            className="p-1 rounded-md bg-[#D4EBF8] text-neutral-800 border border-gray-600 w-32"
                                        />
                                        <button
                                            onClick={() => handleScanRFID(item.id)}
                                            className="bg-[#0A3981] hover:bg-blue-600 text-white px-3 py-1 rounded-md flex items-center gap-2"
                                        >
                                            <FaBarcode /> Scan
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default BarangKeluar;
