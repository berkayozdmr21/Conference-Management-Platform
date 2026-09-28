import api from "./api";

const booksService = {
  getAll: () => api.get("/books"),
};

export default booksService;