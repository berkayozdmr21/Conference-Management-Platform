export const mockConference = {
  title: "ICOMATH-Style Uluslararası Matematik ve Bilgisayar Bilimleri Konferansı",
  shortTitle: "ICOMATH-Style 2027",
  description:
    "Uygulamalı matematik, yapay zeka ve yazılım mühendisliği alanlarında akademik çalışmaların paylaşıldığı, çevrimiçi ve fiziksel katılıma açık uluslararası bir konferans.",
  startDate: "2027-06-14",
  endDate: "2027-06-17",
  location: "İstanbul, Türkiye",
  submissionDeadline: "2027-03-01",
};

export const mockTopics = [
  { id: 1, code: "05C", name: "Applied Mathematics" },
  { id: 2, code: "26A", name: "Analysis" },
  { id: 3, code: "60E", name: "Probability and Statistics" },
  { id: 4, code: "51N", name: "Geometry" },
  { id: 5, code: "68T", name: "Artificial Intelligence" },
  { id: 6, code: "68N", name: "Software Engineering" },
  { id: 7, code: "68P", name: "Data Science" },
  { id: 8, code: "94A", name: "Cybersecurity" },
  { id: 9, code: "68M", name: "Computer Engineering" },
  { id: 10, code: "00A", name: "Diğer" },
];

export const mockImportantDates = [
  { id: 1, title: "Bildiri Gönderimi Başlangıcı", date: "2027-01-10" },
  { id: 2, title: "Son Bildiri Gönderim Tarihi", date: "2027-03-01" },
  { id: 3, title: "Kabul Bildirimleri", date: "2027-04-05" },
  { id: 4, title: "Erken Kayıt Son Tarihi", date: "2027-04-20" },
  { id: 5, title: "Konferans Tarihleri", date: "2027-06-14" },
];

export const mockSpeakers = [
  {
    id: 1,
    name: "Prof. Dr. Elif Aksoy",
    title: "Davetli Konuşmacı",
    university: "Boğaziçi Üniversitesi",
    country: "Türkiye",
    photo: null,
    description: "Uygulamalı matematik ve optimizasyon alanında çalışmaktadır.",
  },
  {
    id: 2,
    name: "Prof. Dr. Marco Ferrante",
    title: "Davetli Konuşmacı",
    university: "University of Padova",
    country: "İtalya",
    photo: null,
    description: "Olasılık teorisi ve stokastik süreçler üzerine araştırmalar yapmaktadır.",
  },
  {
    id: 3,
    name: "Doç. Dr. Hana Kobayashi",
    title: "Davetli Konuşmacı",
    university: "Tokyo Institute of Technology",
    country: "Japonya",
    photo: null,
    description: "Yapay zeka ve makine öğrenmesi güvenliği üzerine çalışmaktadır.",
  },
  {
    id: 4,
    name: "Doç.Dr. Murat Aymelek",
    title: "Davetli Konuşmacı",
    university: "University of Strathclyde",
    country: "Birleşik Krallık",
    photo: null,
    description: "Veri bilimi ve iş analitiği alanında çalışmalar yürütmektedir.",
  },
];
/**
 * --- Hafta 2 eklemeleri (Gözde) ---
 * Cemre'nin mevcut mock verisi olduğu gibi korundu; yalnızca 2. hafta
 * sayfalarının (Katılımcılar, İletişim) ihtiyaç duyduğu veri eklendi.
 * Katılımcılar = başvurusu "Approved" yapılmış kişiler olduğu için
 * alan adları Submissions tablosuyla bilinçli olarak aynı tutuldu.
 */
export const mockParticipants = [
  {
    id: 1,
    name: "Berkay Özdemir",
    country: "Türkiye",
    studyTitle: "Deep Learning Based Anomaly Detection",
    participationType: "Online",
    session: "Artificial Intelligence",
    sessionCode: "68T",
  },
  {
    id: 2,
    name: "Doç. Dr. Murat Aymelek",
    country: "Birleşik Krallık",
    studyTitle: "Business Analytics in Maritime Logistics",
    participationType: "Fiziksel Katılım",
    session: "Data Science",
    sessionCode: "68P",
  },
  {
    id: 3,
    name: "Prof. Dr. Elif Aksoy",
    country: "Türkiye",
    studyTitle: "Convex Optimization Methods for Large Scale Systems",
    participationType: "Fiziksel Katılım",
    session: "Applied Mathematics",
    sessionCode: "05C",
  },
  {
    id: 4,
    name: "Ayşe Demirtaş",
    country: "Almanya",
    studyTitle: "Post-Quantum Cryptography: A Practical Review",
    participationType: "Online",
    session: "Cybersecurity",
    sessionCode: "94A",
  },
  {
    id: 5,
    name: "Marco Ferrante",
    country: "İtalya",
    studyTitle: "Stochastic Processes on Random Graphs",
    participationType: "Fiziksel Katılım",
    session: "Probability and Statistics",
    sessionCode: "60E",
  },
];

export const mockContactInfo = {
  email: "info@icomath-style2027.org",
  phone: "+90 (312) 000 00 00",
  address: "Fen Fakültesi, Matematik Bölümü, İstanbul, Türkiye",
};
