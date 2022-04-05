import axios from "axios";
import { useState, useEffect, useContext } from "react";

export function useFetchPosts() {
  const [posts, setPosts] = useState([]);
  useEffect(async () => {
    const data = await axios.get("/api/posts");
    setPosts(data.data);
  }, []);
  return posts;
}
