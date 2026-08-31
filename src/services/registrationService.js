import api from "./api";

// Referans: GET /api/registration-fees
// NOT: Backend endpointi henüz doğrulanmadı.
// Backend hazır olduğunda endpoint ve response yapısı kontrol edilmelidir.
const registrationService = {
  getAll: () => api.get("/registration-fees"),
};

export default registrationService;