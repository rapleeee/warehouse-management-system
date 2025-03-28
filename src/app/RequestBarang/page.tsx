"use client";
import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";

const RequestBarang = () => {
    // Data Departemen dan Posisi untuk Dropdown
    const departemenOptions = ["Divisi Mesin", "Divisi Elektrik", "Divisi Gerbong"];
    const posisiOptions = ["Staff", "Supervisor", "Manager"];

    // State untuk daftar request barang
    const [requests, setRequests] = useState([
        { id: 1, nama: "Oli Mesin", departemen: "Divisi Mesin", pengaju: "Budi", posisi: "Staff", jumlah: 5, status: "Pending" },
        { id: 2, nama: "Busi Motor", departemen: "Divisi Elektrik", pengaju: "Ani", posisi: "Supervisor", jumlah: 10, status: "Approved" },
    ]);

    // State untuk input form
    const [newRequest, setNewRequest] = useState({ nama: "", departemen: "", pengaju: "", posisi: "", jumlah: "" });

    // Handle input perubahan
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setNewRequest({ ...newRequest, [e.target.name]: e.target.value });
    };

    // Handle submit request baru
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newRequest.nama || !newRequest.departemen || !newRequest.pengaju || !newRequest.posisi || !newRequest.jumlah) return;
        
        const newEntry = {
            id: requests.length + 1,
            ...newRequest,
            jumlah: parseInt(newRequest.jumlah),
            status: "Pending",
        };

        setRequests([...requests, newEntry]);
        setNewRequest({ nama: "", departemen: "", pengaju: "", posisi: "", jumlah: "" });
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Request Barang</h1>

            {/* Form Tambah Request */}
            <form onSubmit={handleSubmit} className="bg-neutral-800 p-4 rounded-md mb-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input 
                        type="text" 
                        name="nama" 
                        value={newRequest.nama} 
                        onChange={handleChange} 
                        placeholder="Nama Barang"
                        className="p-2 rounded-md bg-neutral-700 text-white w-full"
                        required
                    />
                    <select 
                        name="departemen" 
                        value={newRequest.departemen} 
                        onChange={handleChange} 
                        className="p-2 rounded-md bg-neutral-700 text-white w-full"
                        required
                        aria-label="Departemen"
                    >
                        <option value="">Pilih Departemen</option>
                        {departemenOptions.map((dep, index) => (
                            <option key={index} value={dep}>{dep}</option>
                        ))}
                    </select>
                    <input 
                        type="text" 
                        name="pengaju" 
                        value={newRequest.pengaju} 
                        onChange={handleChange} 
                        placeholder="Nama Pengaju"
                        className="p-2 rounded-md bg-neutral-700 text-white w-full"
                        required
                    />
                    <select 
                        name="posisi" 
                        value={newRequest.posisi} 
                        onChange={handleChange} 
                        className="p-2 rounded-md bg-neutral-700 text-white w-full"
                        required
                        aria-label="Posisi"
                    >
                        <option value="">Pilih Posisi</option>
                        {posisiOptions.map((pos, index) => (
                            <option key={index} value={pos}>{pos}</option>
                        ))}
                    </select>
                    <input 
                        type="number" 
                        name="jumlah" 
                        value={newRequest.jumlah} 
                        onChange={handleChange} 
                        placeholder="Jumlah"
                        className="p-2 rounded-md bg-neutral-700 text-white w-full"
                        required
                    />
                    <button 
                        type="submit" 
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md flex items-center justify-center gap-2"
                    >
                        <FaPlus /> Request
                    </button>
                </div>
            </form>

            {/* Daftar Request */}
            <table className="w-full bg-neutral-800 rounded-md overflow-hidden text-white">
                <thead className="bg-neutral-700">
                    <tr>
                        <th className="p-3 text-left">No</th>
                        <th className="p-3 text-left">Nama Barang</th>
                        <th className="p-3 text-left">Departemen</th>
                        <th className="p-3 text-left">Pengaju</th>
                        <th className="p-3 text-left">Posisi</th>
                        <th className="p-3 text-left">Jumlah</th>
                        <th className="p-3 text-left">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {requests.map((item, index) => (
                        <tr key={item.id} className="border-b border-neutral-700">
                            <td className="p-3">{index + 1}</td>
                            <td className="p-3">{item.nama}</td>
                            <td className="p-3">{item.departemen}</td>
                            <td className="p-3">{item.pengaju}</td>
                            <td className="p-3">{item.posisi}</td>
                            <td className="p-3">{item.jumlah}</td>
                            <td className="p-3">
                                <span className={`px-3 py-1 rounded-md text-white text-sm 
                                    ${item.status === "Pending" ? "bg-yellow-500" :
                                      item.status === "Approved" ? "bg-green-500" :
                                      "bg-red-500"}`}
                                >
                                    {item.status}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default RequestBarang;
