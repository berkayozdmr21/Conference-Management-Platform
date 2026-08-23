import api from "./api";

// Referans: GET /api/speakers
const speakersService = {
  getAll: () => api.get("/speakers"),
  getById: (id) => api.get(`/speakers/${id}`),
};

export default speakersService;
