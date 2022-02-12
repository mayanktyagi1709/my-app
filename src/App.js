import React, { useState, useEffect } from "react";
import Posts from "./components/Posts";
import Pagination from "./components/Pagination";
import axios from "axios";
import localforage from "localforage";

import "./App.css";

const App = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(20);

  const saveData = (data) => {
    localforage.setItem("user", data);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const res = await axios.get(
        `https://api.seatgeek.com/2/events?client_id=MjQ1OTk2ODB8MTYzNzczNDkzNy45MDAwMjE&per_page=800`
      );
      setCurrentPage(currentPage + 1);
      setPosts(res.data.events);
      saveData(res.data.events);
      setLoading(false);
      console.log(res.data);
    };
    fetchPosts();
  }, []);
  // console.log(posts);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container">
      <Posts posts={currentPosts} loading={loading} />
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={posts.length}
        paginate={paginate}
      />
    </div>
  );
};

export default App;
