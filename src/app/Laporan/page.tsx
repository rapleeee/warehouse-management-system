"use client";
import React, { useState } from "react";

const Laporan = () => {
    const [pengeluarFilter, setPengeluarFilter] = useState("");
    const [tanggalFilter, setTanggalFilter] = useState("");

    // Dummy data sementara
    const dataLaporan = [
        { id: 1, nama: "Panel LBD (Linked Breaking Device)", jumlah: 20, pengeluar: "Budi", tanggal: "2025-04-12" },
        { id: 2, nama: "Modul Komunikasi Data", jumlah: 10, pengeluar: "Rani", tanggal: "2025-04-13" },
        { id: 3, nama: "Interlocking Mekanik", jumlah: 15, pengeluar: "Budi", tanggal: "2025-04-14" },
    ];

    const dataFilter = dataLaporan.filter(item => {
        return (
            (pengeluarFilter === "" || item.pengeluar.toLowerCase().includes(pengeluarFilter.toLowerCase())) &&
            (tanggalFilter === "" || item.tanggal === tanggalFilter)
        );
    });

    return (
        <div className="p-6 text-gray-200">
            <h1 className="text-2xl font-bold mb-4">📊 Laporan Barang Keluar</h1>

            <div className="flex gap-4 mb-6">
                <input
                    type="date"
                    value={tanggalFilter}
                    onChange={(e) => setTanggalFilter(e.target.value)}
                    className="p-2 rounded-md bg-neutral-800 text-white border border-gray-600"
                    placeholder="Filter Tanggal"
                />
                <input
                    type="text"
                    placeholder="Filter Pengeluar"
                    value={pengeluarFilter}
                    onChange={(e) => setPengeluarFilter(e.target.value)}
                    className="p-2 rounded-md bg-neutral-800 text-white border border-gray-600"
                />
            </div>

            <table className="w-full border-collapse border border-gray-700 bg-neutral-900 rounded-lg">
                <thead className="bg-neutral-800 text-gray-300">
                    <tr>
                        <th className="border border-gray-700 px-4 py-2">No</th>
                        <th className="border border-gray-700 px-4 py-2">Nama Barang</th>
                        <th className="border border-gray-700 px-4 py-2">Jumlah</th>
                        <th className="border border-gray-700 px-4 py-2">Pengeluar</th>
                        <th className="border border-gray-700 px-4 py-2">Tanggal</th>
                    </tr>
                </thead>
                <tbody>
                    {dataFilter.length === 0 ? (
                        <tr>
                            <td colSpan={5} className="text-center py-4 text-gray-400">Tidak ada data</td>
                        </tr>
                    ) : (
                        dataFilter.map((item, index) => (
                            <tr key={item.id} className="hover:bg-neutral-800">
                                <td className="border border-gray-700 px-4 py-2 text-center">{index + 1}</td>
                                <td className="border border-gray-700 px-4 py-2">{item.nama}</td>
                                <td className="border border-gray-700 px-4 py-2 text-center">{item.jumlah}</td>
                                <td className="border border-gray-700 px-4 py-2 text-center">{item.pengeluar}</td>
                                <td className="border border-gray-700 px-4 py-2 text-center">{item.tanggal}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            <div className="mt-6 flex gap-3">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md" onClick={() => alert("PDF berhasil diunduh!")}>📥 Export PDF</button>
                <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md" onClick={() => alert("Excel berhasil diunduh!")}>📥 Export Excel</button>
            </div>
        </div>
    );
};

export default Laporan;
