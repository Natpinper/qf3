import axios from "axios";

class UserService {
  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.VITE_API_URL || "http://localhost:5005",
    });

    this.api.interceptors.request.use((config) => {
      const storedToken = localStorage.getItem("authToken");

      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }
      return config;
    });
  }

  //Post /api/user
  createUser = (requestBody) => {
    return this.api.post("/api/user", requestBody);
  };

  //Get /api/user
  getAllUsers = () => {
    return this.api.get("/api/user");
  };

  //Get /api/user/:id
  getOneUser = (userId) => {
    return this.api.get(`/api/user/${userId}`);
  };

  //PUT /api/user/:id
  updateUser = (userId, requestBody) => {
    return this.api.put(`/api/user/${userId}`, requestBody);
  };

  //Delete /api/user/:id
  deleteUser = (userId) => {
    return this.api.delete(`/api/user/${userId}`);
  };
}

const userService = new UserService();

export default userService;
