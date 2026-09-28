import api from "./api";

/**
 * Bildiri / başvuru servisi.
 * Referans endpoint'ler (proje dokümanı Hafta 2):
 *   POST /api/submissions
 *   GET  /api/submissions
 *   GET  /api/submissions/{id}
 *
 * NOT (Gözde - Hafta 2):
 * Başvuruda dosya yükleme olduğu için istek gövdesi JSON değil, FormData olmak
 * zorunda. api.js içindeki varsayılan "Content-Type: application/json" başlığını
 * bu istek için ezmemiz gerekiyor. Header'ı elle yazmak yerine undefined'a
 * çekiyoruz; böylece tarayıcı multipart sınırını (boundary) kendisi üretir.
 * Elle "multipart/form-data" yazarsak boundary eksik kalır ve backend gövdeyi
 * ayrıştıramaz - bu, dosya yüklemede en sık yapılan hatadır.
 */
const submissionsService = {
  create: (formData) =>
    api.post("/submissions", formData, {
      headers: { "Content-Type": undefined },
    }),

  getAll: () => api.get("/submissions"),
  getById: (id) => api.get(`/submissions/${id}`),
};

export default submissionsService;
