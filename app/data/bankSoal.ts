export const bankSoal: Record<string, {
  pertanyaan: string;
  jawaban: string[];
  benar: string;
}[]> = {
  "Matematika": [
    {
      pertanyaan: "Hasil 4 × 2?",
      jawaban: ["8", "6", "4", "12"],
      benar: "8"
    },
    {
      pertanyaan: "Bentuk pecahan dari 0.5?",
      jawaban: ["1/2", "1/5", "5/10", "2/5"],
      benar: "1/2"
    }
  ],

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