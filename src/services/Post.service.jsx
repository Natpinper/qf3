import axios from 'axios';
 
class PostService {
  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5005'
    });
 
    // Automatically set JWT token in the headers for every request
    this.api.interceptors.request.use(config => {
      // Retrieve the JWT token from the local storage
      const storedToken = localStorage.getItem('authToken');
 
      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }
 
      return config;
    });
  }
 
  // POST /api/post
  createPost = requestBody => {
    return this.api.post('/api/post', requestBody);
  };
 
  // GET /api/post
  getAllPosts = () => {
    return this.api.get('/api/post');
  };
  getPostByLocation= () => {
    return this.api.get('/api/post/location')
  }
 
  // GET /api/post/:id
  getPost = id => {
    return this.api.get(`/api/post/${id}`);
  };

  //get /api/:userId/profile/post/
  getPostFromUser = id => {
    return this.api.get(`/api/user/post/${id}`)
  }

 
  // PUT /api/post/:id
  updatePost = (id, requestBody) => {
    return this.api.put(`/api/post/${id}`, requestBody);
  };
 
  // DELETE /api/posts/:id
  deletePost = id => {
    return this.api.delete(`/api/post/${id}`);
  };
}
 
// Create one instance object
const postService = new PostService();
 
export default postService;