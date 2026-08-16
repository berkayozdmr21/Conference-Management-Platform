import api from "./api";

// Referans: GET /api/conferences (dökümanda 1. hafta Nilay tarafından açılacak)
const conferenceService = {
  getCurrent: () => api.get("/conferences/current"),
  getAll: () => api.get("/conferences"),
  getById: (id) => api.get(`/conferences/${id}`),
};

export default conferenceService;
