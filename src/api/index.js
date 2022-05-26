import axios from "axios";
import { getPosts } from "../actions/posts";

const API = axios.create({ baseURL: "https://mern-blogbuster.herokuapp.com" });

//Fuction happen on each one of our request
API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  //So that we can make all the request below
  getPosts;
  return req;
});

//Simply return all the posts in the database
//Passing data to the backend in the form of page
export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
export const fetchPost = (id) => API.get(`/posts/${id}`);
export const fetchPostsBySearch = (SearchQuery) =>
  API.get(
    `/posts/search?searchQuery=${SearchQuery.search || "none"}&tags=${
      SearchQuery.tags || "none"
    }`
  );
/*NOTE-Endpoint is a point at which an API -- the code that allows two software programs to communicate with each other -- connects with the software program.  */
//New data is the requested body we are sending to the URL/endpoint

export const createPosts = (NewData) => API.post("/posts", NewData);

//As we are recieving id and the updated post data and updates are required by api
export const updatePost = (id, updatedPost) =>
  API.patch(`/posts/${id}`, updatedPost);

export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const comment = (value, id) =>
  API.post(`/posts/${id}/commentPost`, { value });
export const deletePost = (id) => API.delete(`/posts/${id}`);

export const signIn = (formData) => API.post(`/user/signin`, formData);
export const signUp = (formData) => API.post(`/user/signup`, formData);
