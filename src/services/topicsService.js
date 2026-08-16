import api from "./api";

// Referans: GET /api/topics
const topicsService = {
  getAll: () => api.get("/topics"),
};

export default topicsService;
