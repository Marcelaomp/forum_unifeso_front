import React from "react";

const PostResponse = ({ post }) => {
  // Verifique se o 'author' existe antes de acessar 'name'
  const authorName = post.author ? post.author.name : 'Autor desconhecido';

  return (
    <div style={{ marginBottom: "20px", padding: "10px", border: "1px solid #ddd" }}>
      <h4>{post.title}</h4>
      <p>{post.description}</p>
      <small>{new Date(post.date).toLocaleDateString()}</small>
      <p><strong>Autor:</strong> {authorName}</p>
    </div>
  );
};

export default PostResponse;