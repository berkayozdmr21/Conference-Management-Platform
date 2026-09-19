import api from "./api";

// Referans: GET /api/important-dates
const importantDatesService = {
  getAll: () => api.get("/important-dates"),
};

export default importantDatesService;
