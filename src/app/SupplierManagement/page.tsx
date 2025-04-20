"use client";
import React, { useState } from "react";
import { supplierData, Supplier } from "@/data/supplier";
import { FaEdit, FaTrash } from "react-icons/fa";

const SupplierManagement = () => {
  const [suppliers, setSuppliers] = useState<Supplier[]>(supplierData);

  const [nama_perusahaan, setNamaPerusahaan] = useState("");
  const [alamat, setAlamat] = useState("");
  const [no_tlp, setTelepon] = useState("");
  const [editId, setEditId] = useState<number | null>(null);

  const resetForm = () => {
    setNamaPerusahaan("");
    setAlamat("");
    setTelepon("");
    setEditId(null);
  };

  const handleAddOrUpdate = () => {
    if (!nama_perusahaan || !alamat || !no_tlp) {
      alert("Semua field harus diisi!");
      return;
    }

    if (editId !== null) {
      setSuppliers(
        suppliers.map((s) =>
          s.id === editId ? { id: s.id, nama_perusahaan, alamat, no_tlp } : s
        )
      );
    } else {
      const newSupplier: Supplier = {
        id: Date.now(),
        nama_perusahaan,
        alamat,
        no_tlp,
      };
      setSuppliers([...suppliers, newSupplier]);
    }

    resetForm();
  };

  const handleEdit = (supplier: Supplier) => {
    setEditId(supplier.id);
    setNamaPerusahaan(supplier.nama_perusahaan);
    setAlamat(supplier.alamat);
    setTelepon(supplier.no_tlp);
  };

  const handleDelete = (id: number) => {
    if (confirm("Yakin ingin menghapus supplier ini?")) {
      setSuppliers(suppliers.filter((s) => s.id !== id));
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gradient-to-b from-neutral-900 to-neutral-950 text-gray-100">
      <h1 className="text-4xl font-bold mb-8 text-left">
        Supplier Management
      </h1>

      <div className="bg-neutral-800 rounded-xl p-6 mb-10 shadow-xl max-w-6xl ">
        <h2 className="text-lg font-semibold mb-4 text-white">Tambah / Edit Supplier</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Nama Perusahaan</label>
            <input
              type="text"
              value={nama_perusahaan}
              onChange={(e) => setNamaPerusahaan(e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-neutral-700 text-white border border-neutral-600 focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Alamat</label>
            <input
              type="text"
              value={alamat}
              onChange={(e) => setAlamat(e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-neutral-700 text-white border border-neutral-600 focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Nomor Telepon</label>
            <input
              type="text"
              value={no_tlp}
              onChange={(e) => setTelepon(e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-neutral-700 text-white border border-neutral-600 focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleAddOrUpdate}
            className={`px-6 py-2 rounded-md text-white font-medium transition ${
              editId
                ? "bg-yellow-500 hover:bg-yellow-600"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {editId ? "Simpan Perubahan" : "Tambah Supplier"}
          </button>
        </div>
      </div>

      <div className="overflow-x-auto max-w-6xl ">
        <table className="w-full border-collapse bg-neutral-800 text-sm rounded-xl overflow-hidden shadow-md">
          <thead className="bg-neutral-700 text-gray-200">
            <tr>
              <th className="py-3 px-4 text-left">No</th>
              <th className="py-3 px-4 text-left">Nama Perusahaan</th>
              <th className="py-3 px-4 text-left">Alamat</th>
              <th className="py-3 px-4 text-left">No. Telepon</th>
              <th className="py-3 px-4 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {suppliers.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-6 text-gray-400">
                  Belum ada data supplier.
                </td>
              </tr>
            ) : (
              suppliers.map((s, i) => (
                <tr
                  key={s.id}
                  className={`border-t border-neutral-700 hover:bg-neutral-700/40 ${
                    s.id === editId ? "bg-blue-900/30" : ""
                  }`}
                >
                  <td className="py-3 px-4 text-gray-300">{i + 1}</td>
                  <td className="py-3 px-4">{s.nama_perusahaan}</td>
                  <td className="py-3 px-4">{s.alamat}</td>
                  <td className="py-3 px-4">{s.no_tlp}</td>
                  <td className="py-3 px-4 text-center">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => handleEdit(s)}
                        className="flex items-center gap-1 bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-md transition"
                      >
                        <FaEdit className="text-sm" />
                        <span className="hidden md:inline">Edit</span>
                      </button>
                      <button
                        onClick={() => handleDelete(s.id)}
                        className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md transition"
                      >
                        <FaTrash className="text-sm" />
                        <span className="hidden md:inline">Hapus</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SupplierManagement;
