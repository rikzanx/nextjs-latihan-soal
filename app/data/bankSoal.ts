import { soalPengantarSI } from "./soalPengantarSistemInformasi";
import { soalSistemOperasi } from "./soalSistemOperasi";

export const bankSoal: Record<string, {
  pertanyaan: string;
  jawaban: string[];
  benar: string;
}[]> = {
  "Pengantar Sistem Informasi": soalPengantarSI,
  "Sistem Operasi": soalSistemOperasi,
  "Bahasa Indonesia": [
    {
      pertanyaan: "Antonim dari 'besar'?",
      jawaban: ["kecil", "tinggi", "luas", "panjang"],
      benar: "kecil"
    },
    {
      pertanyaan: "Kalimat tanya diakhiri dengan…",
      jawaban: [".", "!", "?", ","],
      benar: "?"
    }
  ],

  "IPA Dasar": [
    {
      pertanyaan: "Air berubah menjadi gas disebut?",
      jawaban: ["Menguap", "Mencair", "Membeku", "Membusuk"],
      benar: "Menguap"
    }
  ]
};