import api from "./api";

/**
 * İletişim formu servisi.
 * Veritabanındaki ContactMessages tablosuna karşılık gelir.
 * Cemre'nin isimlendirme deseni (kaynak adı, çoğul, kebab-case) korundu.
 *
 * Referans: POST /api/contact-messages
 */
const contactService = {
  send: (payload) => api.post("/contact-messages", payload),
};

export default contactService;
