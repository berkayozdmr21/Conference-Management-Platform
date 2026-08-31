import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Topics from "./pages/Topics";
import ImportantDates from "./pages/ImportantDates";
import Speakers from "./pages/Speakers";
import Submission from "./pages/Submission";
import Participants from "./pages/Participants";
import Contact from "./pages/Contact";
import ComingSoon from "./pages/ComingSoon";
import ConferenceBooks from "./pages/ConferenceBooks";
import Registration from "./pages/Registration";
import Program from "./pages/Program";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/hakkinda" element={<About />} />
        <Route path="/konular" element={<Topics />} />
        <Route path="/onemli-tarihler" element={<ImportantDates />} />
        <Route path="/program" element={<Program />} />
        <Route path="/konusmacilar" element={<Speakers />} />

        <Route path="/kitaplar" element={<ConferenceBooks />} />

        {/* Hafta 2 (Gözde): bu üç rota ComingSoon placeholder'ından gerçek
            sayfalara çevrildi. Yol adları Cemre'nin Header'da kullandığı
            adreslerle birebir aynı bırakıldı; böylece mevcut hiçbir link kırılmadı. */}
        <Route path="/bildiri-gonder" element={<Submission />} />
        <Route path="/katilimcilar" element={<Participants />} />
        <Route path="/iletisim" element={<Contact />} />

        {/* Kayıt & Ücretler proje planına göre 3. hafta kapsamında. */}
        
        <Route path="/kayit" element={<Registration />} />
        <Route path="*" element={<ComingSoon title="Sayfa Bulunamadı" />} />
      </Route>
    </Routes>
  );
}