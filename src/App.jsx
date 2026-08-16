import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Topics from "./pages/Topics";
import ImportantDates from "./pages/ImportantDates";
import Speakers from "./pages/Speakers";
import ComingSoon from "./pages/ComingSoon";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/hakkinda" element={<About />} />
        <Route path="/konular" element={<Topics />} />
        <Route path="/onemli-tarihler" element={<ImportantDates />} />
        <Route path="/konusmacilar" element={<Speakers />} />

        {/* 2./3. hafta kapsamında geliştirilecek rotalar (placeholder) */}
        <Route path="/bildiri-gonder" element={<ComingSoon title="Bildiri / Proceedings Gönderimi" />} />
        <Route path="/kayit" element={<ComingSoon title="Kayıt & Ücretler" />} />
        <Route path="/katilimcilar" element={<ComingSoon title="Katılımcılar" />} />
        <Route path="/iletisim" element={<ComingSoon title="İletişim" />} />
        <Route path="*" element={<ComingSoon title="Sayfa Bulunamadı" />} />
      </Route>
    </Routes>
  );
}
