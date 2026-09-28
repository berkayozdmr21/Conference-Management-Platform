import api from "./api";

/**
 * Katılımcı servisi.
 * Katılımcılar = başvurusu admin tarafından "Approved" yapılmış kişiler.
 * Ziyaretçi tarafı yalnızca okuma yapar, bu yüzden tek bir GET yeterli.
 *
 * Referans: GET /api/participants
 */
const participantsService = {
  getAll: () => api.get("/participants"),
};

export default participantsService;
