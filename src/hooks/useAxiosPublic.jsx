import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://localchefbazar-theta.vercel.app",
});

export default axiosPublic;
