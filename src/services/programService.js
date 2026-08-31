import api from "./api";

// Referans: GET /api/program
// NOT: Backend endpointi henüz doğrulanmadı.
// Backend hazır olduğunda endpoint adı ve response yapısı kontrol edilmelidir.
const programService = {
  getAll: () => api.get("/program"),
};

export default programService;