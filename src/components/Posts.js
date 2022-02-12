import React from "react";

const Posts = ({ posts, loading }) => {
  if (loading) {
    return <h2>Loading.....</h2>;
  }
  return (
    <ul className="lost-group mb-4">
      {posts.map((post) => (
        <>
          <li key={post.id} className="list-group-item">
            <div>{post.type}</div>
            <div>{post.id}</div>
            <div>{post.datetime_utc}</div>
            <div>{post.title}</div>
            <div>{post.popularity}</div>
            <div>{post.url}</div>

          </li>
        </>
      ))}
    </ul>
  );
};
export default Posts;
