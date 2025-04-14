"use client";
import React, { useState } from "react";

interface Supplier {
  id: number;
  nama: string;
  alamat: string;
  telepon: string;
}

const SupplierManagement = () => {
  const [suppliers, setSuppliers] = useState<Supplier[]>([
    { id: 1, nama: "PT ABC", alamat: "Jl. Sudirman", telepon: "081234567890" },
    { id: 2, nama: "PT XYZ", alamat: "Jl. Merdeka", telepon: "081398765432" },
  ]);

  const [nama, setNama] = useState("");
  const [alamat, setAlamat] = useState("");
  const [telepon, setTelepon] = useState("");
  const [editId, setEditId] = useState<number | null>(null);

  const resetForm = () => {
    setNama("");
    setAlamat("");
    setTelepon("");
    setEditId(null);
  };

  const handleAddOrUpdate = () => {
    if (!nama || !alamat || !telepon) {
      alert("Semua field harus diisi!");
      return;
    }

    if (editId !== null) {
      // Update supplier
      setSuppliers(suppliers.map(s =>
        s.id === editId ? { id: s.id, nama, alamat, telepon } : s
      ));
    } else {
      // Tambah supplier
      const newSupplier: Supplier = {
        id: Date.now(),
        nama,
        alamat,
        telepon,
      };
      setSuppliers([...suppliers, newSupplier]);
    }

    resetForm();
  };

  const handleEdit = (supplier: Supplier) => {
    setEditId(supplier.id);
    setNama(supplier.nama);
    setAlamat(supplier.alamat);
    setTelepon(supplier.telepon);
  };

  const handleDelete = (id: number) => {
    if (confirm("Yakin ingin menghapus supplier ini?")) {
      setSuppliers(suppliers.filter(s => s.id !== id));
    }
  };

  return (
    <div className="p-6 text-gray-200">
      <h1 className="text-2xl font-bold mb-4">📦 Supplier Management</h1>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Nama Supplier"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          className="p-2 rounded-md bg-neutral-800 text-white border border-gray-600 w-full"
        />
        <input
          type="text"
          placeholder="Alamat"
          value={alamat}
          onChange={(e) => setAlamat(e.target.value)}
          className="p-2 rounded-md bg-neutral-800 text-white border border-gray-600 w-full"
        />
        <input
          type="text"
          placeholder="Nomor Telepon"
          value={telepon}
          onChange={(e) => setTelepon(e.target.value)}
          className="p-2 rounded-md bg-neutral-800 text-white border border-gray-600 w-full"
        />
        <button
          onClick={handleAddOrUpdate}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
        >
          {editId ? "💾 Simpan Perubahan" : "➕ Tambah Supplier"}
        </button>
      </div>

      <table className="w-full border-collapse border border-gray-700 bg-neutral-900 rounded-lg">
        <thead className="bg-neutral-800 text-gray-300">
          <tr>
            <th className="border border-gray-700 px-4 py-2">No</th>
            <th className="border border-gray-700 px-4 py-2">Nama</th>
            <th className="border border-gray-700 px-4 py-2">Alamat</th>
            <th className="border border-gray-700 px-4 py-2">Telepon</th>
            <th className="border border-gray-700 px-4 py-2">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {suppliers.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center py-4 text-gray-400">Belum ada data</td>
            </tr>
          ) : (
            suppliers.map((s, i) => (
              <tr key={s.id} className="hover:bg-neutral-800">
                <td className="border border-gray-700 px-4 py-2 text-center">{i + 1}</td>
                <td className="border border-gray-700 px-4 py-2">{s.nama}</td>
                <td className="border border-gray-700 px-4 py-2">{s.alamat}</td>
                <td className="border border-gray-700 px-4 py-2">{s.telepon}</td>
                <td className="border border-gray-700 px-4 py-2 text-center space-x-2">
                  <button
                    onClick={() => handleEdit(s)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded-md"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => handleDelete(s.id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded-md"
                  >
                    🗑️ Hapus
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SupplierManagement;
