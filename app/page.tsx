"use client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const pelajaranList = [
    "Pengantar Sistem Informasi",
    "Sistem Operasi",
    "Matematika Dasar",
    "Algoritma dan Pemrograman",
    "Pendidikan Agama Islam",
    "Pendidikan Kewarganegaraan"
  ];

  const pilihPelajaran = (nama: string) => {
    router.push(`/latihan?pelajaran=${encodeURIComponent(nama)}`);
  };

  return (
    <main className="p-6 max-w-sm mx-auto text-center">
      <h1 className="text-2xl font-bold text-indigo-700 mb-6">
        Pilih Pelajaran
      </h1>

      <div className="space-y-3">
        {pelajaranList.map((p, i) => (
          <button
            key={i}
            onClick={() => pilihPelajaran(p)}
            className="w-full py-3 bg-blue-600 text-white rounded-lg 
                       hover:bg-blue-700 active:scale-95 font-semibold"
          >
            {p}
          </button>
        ))}
      </div>
    </main>
  );
}