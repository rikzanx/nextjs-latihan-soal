"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation"
import { bankSoal } from "../data/bankSoal";
import { useRouter } from "next/navigation";
import { Suspense } from "react";

export default function Latihan() {
  return (
    <Suspense fallback={<p className="p-6 text-center">Loading...</p>}>
      <LatihanContent />
    </Suspense>
  );
}



interface Soal {
  pertanyaan: string;
  jawaban: string[];
  benar: string;
}

const shuffle = <T,>(arr: T[]): T[] =>
  [...arr].sort(() => Math.random() - 0.5);

function LatihanContent() {
  const searchParams = useSearchParams();
  const judulPelajaran = searchParams.get("pelajaran") || "Latihan Soal";
  const [soalAcak, setSoalAcak] = useState<Soal[] | null>(null);
  const [jawabanUser, setJawabanUser] = useState<(string | null)[]>([]);
  const [cek, setCek] = useState(false);
  const [halaman, setHalaman] = useState(0);
  const [selesai, setSelesai] = useState(false);
  const [skor, setSkor] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const soalPelajaran = bankSoal[judulPelajaran] || [];
    // const acak = shuffle(soalPelajaran).map((s) => ({
    //   ...s,
    //   jawaban: shuffle(s.jawaban),
    // }));
    setSoalAcak(soalPelajaran);
    setJawabanUser(Array(soalPelajaran.length).fill(null));
  }, [judulPelajaran]);

  if (!soalAcak) return <p className="p-6">Memuat soal...</p>;

  const soal = soalAcak[halaman];

  const handleSelect = (value: string) => {
    setJawabanUser((prev) => {
      const update = [...prev];
      update[halaman] = value;
      return update;
    });
  };

  const handleCheck = () => {
    setCek(true);
  };

  const handleNext = () => {
    setCek(false);
    if (halaman < soalAcak.length - 1) setHalaman(halaman + 1);
  };

  const handlePrev = () => {
    setCek(false);
    if (halaman > 0) setHalaman(halaman - 1);
  };

  const handleFinish = () => {
    const hitung = soalAcak.filter(
      (s, i) => jawabanUser[i] === s.benar
    ).length;
    setSkor(hitung);
    setSelesai(true);
  };
  const ulangiLatihan = () => {
    const soalPelajaran = bankSoal[judulPelajaran] || [];
    const acak = shuffle(soalPelajaran).map(s => ({
      ...s,
      jawaban: shuffle(s.jawaban),
    }));
    setSoalAcak(acak);
    setJawabanUser(Array(soalPelajaran.length).fill(null));
    setHalaman(0);
    setSkor(0);
    setCek(false);
    setSelesai(false);
  };
  if (soalAcak.length === 0) {
    return (
      <main className="p-4 max-w-lg mx-auto text-center">
        <h1 className="text-xl font-bold mb-4 text-red-600">
          Belum ada soal untuk "{judulPelajaran}"
        </h1>
        <button
          onClick={() => router.push("/")}
          className="px-5 py-3 bg-blue-600 text-white rounded-lg"
        >
          Kembali
        </button>
      </main>
    );
  }

  if (selesai && soalAcak) {
    return (
      <main className="p-4 max-w-lg mx-auto">
        <h1 className="text-2xl font-bold text-green-600 mb-4 text-center">
          Hasil Latihan
        </h1>

        <p className="text-lg font-semibold mb-5 text-center">
          Skor Kamu: {skor} / {soalAcak.length}
        </p>

        <div className="space-y-4">
          {soalAcak.map((s, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 shadow-md p-4 rounded-xl">
              <p className="font-semibold mb-2">{i + 1}. {s.pertanyaan}</p>

              {s.jawaban.map((j, idx) => {
                const userAns = jawabanUser[i];
                const isCorrect = j === s.benar;
                const isUser = j === userAns;

                let style = "px-3 py-1 rounded-md mb-1";
                if (isUser && isCorrect) style += " text-green-600 font-bold";
                else if (isUser && !isCorrect) style += " text-red-600 font-bold";
                else if (!isUser && isCorrect) style += " text-blue-600 font-bold";

                return (
                  <p key={idx} className={style}>
                    {j} {isUser && "← Pilihanmu"} {isCorrect && " ✔"}
                  </p>
                );
              })}
            </div>
          ))}
        </div>

        <div className="text-center mt-6">
          <button
            onClick={ulangiLatihan}
            className="px-5 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 active:scale-95"
          >
            Ulangi Latihan
          </button>
          <button
            onClick={() => router.push("/")}
            className="px-5 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 active:scale-95 ml-3"
          >
            Kembali ke Pilihan Pelajaran
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="p-4 max-w-lg mx-auto">
      <h1 className="text-xl font-bold text-center mb-1 text-indigo-700">
        {judulPelajaran}
      </h1>
      <h2 className="text-lg font-bold mb-3 text-center">
        Soal {halaman + 1} dari {soalAcak.length}
      </h2>

      <div className="bg-white dark:bg-gray-800 shadow-md p-4 rounded-xl mb-5">
        <p className="font-semibold mb-3 text-base">
          {soal.pertanyaan}
        </p>

        <div className="space-y-2">
          {soal.jawaban.map((j, i) => (
            <label
              key={i}
              className="flex items-center gap-2 px-3 py-2 border rounded-lg cursor-pointer transition active:scale-95"
            >
              <input
                type="radio"
                name={`soal-${halaman}`}
                checked={jawabanUser[halaman] === j}
                onChange={() => handleSelect(j)}
                className="h-4 w-4"
              />
              <span className="text-sm">{j}</span>
            </label>
          ))}
        </div>

        {cek && (
          <p
            className={`font-bold mt-3 text-center ${
              jawabanUser[halaman] === soal.benar
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {jawabanUser[halaman] === soal.benar ? "Benar ✔" : "Salah ✘"}
          </p>
        )}
      </div>

      <div className="grid grid-cols-3 gap-2">
        <button
          onClick={handlePrev}
          disabled={halaman === 0}
          className="py-2 rounded-lg text-white bg-gray-500 disabled:opacity-40"
        >
          Prev
        </button>

        <button
          onClick={handleCheck}
          className="py-2 rounded-lg text-white bg-yellow-500"
        >
          Check
        </button>

        {halaman === soalAcak.length - 1 ? (
          <button
            onClick={handleFinish}
            className="py-2 rounded-lg text-white bg-green-600"
          >
            Selesai
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="py-2 rounded-lg text-white bg-blue-600"
          >
            Next
          </button>
        )}
      </div>
    </main>
  );

}
