"use client";
import React, { useState } from "react";
import { FaBarcode } from "react-icons/fa";

const BarangKeluar = () => {
    const [barangKeluar, setBarangKeluar] = useState([
        { id: 1, nama: "Interlocking Mekanik", jumlah: 75, pengeluar: "", tanggalKeluar: "", status: "Menunggu Scan", rfid: "", rfidInput: "" },
        { id: 2, nama: "Grounding", jumlah: 45, pengeluar: "", tanggalKeluar: "", status: "Menunggu Scan", rfid: "", rfidInput: "" },
        { id: 3, nama: "Suku Cadang Gardu Traksi", jumlah: 30, pengeluar: "", tanggalKeluar: "", status: "Menunggu Scan", rfid: "", rfidInput: "" },
        { id: 4, nama: "Kabel Negatif", jumlah: 30, pengeluar: "", tanggalKeluar: "", status: "Menunggu Scan", rfid: "", rfidInput: "" },
    ]);

    const [pengeluar, setPengeluar] = useState("");

    const handleScanRFID = (id: number) => {
        setBarangKeluar((prev) =>
            prev.map((item) => {
                if (item.id === id) {
                    if (!item.rfidInput || !pengeluar) {
                        alert("Masukkan RFID dan nama pengeluar!");
                        return item;
                    }

                    return {
                        ...item,
                        rfid: item.rfidInput,
                        status: "Dikeluarkan",
                        pengeluar,
                        tanggalKeluar: new Date().toLocaleString(),
                        rfidInput: ""
                    };
                }
                return item;
            })
        );
        setPengeluar("");
    };

    const handleRfidInputChange = (id: number, value: string) => {
        setBarangKeluar((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, rfidInput: value } : item
            )
        );
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
                                            value={item.rfidInput}
                                            onChange={(e) => handleRfidInputChange(item.id, e.target.value)}
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
