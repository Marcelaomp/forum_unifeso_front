import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Para navegação interna
import '../styles.css'; // Arquivo CSS

const ThreadForumList = () => {
  const [threads, setThreads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get("https://forumunifeso-production.up.railway.app/all")
      .then(response => {
        setThreads(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError('Erro ao buscar threads');
        setLoading(false);
      });
  }, []);

  // Agrupar threads pela tag
  const threadsByTag = threads.reduce((acc, thread) => {
    if (!acc[thread.tag]) {
      acc[thread.tag] = [];
    }
    acc[thread.tag].push(thread);
    return acc;
  }, {});

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="app">
      <header className="header">
        <h1>Forum Unifeso</h1>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/new">New Question</Link>
        </nav>
      </header>
      <main className="main-content">
        <div className="threads-list">
          {/* Renderizar cada tag com suas respectivas threads */}
          {Object.keys(threadsByTag).map(tag => (
            <div key={tag} className="threads-section">
              <h2 className="tag-title">{tag}</h2>
              {threadsByTag[tag].map((thread) => (
                <div key={thread.id} className="thread-card">
                  <Link to={`/thread/${thread.id}`} className="thread-link">
                    <h2 className="thread-title">{thread.topic.title}</h2>
                    <p className="thread-description">{thread.topic.description}</p>
                    <span className="thread-date">{new Date(thread.topic.date).toLocaleDateString()}</span>
                    <div className="answers-count">
                      {Array.isArray(thread.answers) ? thread.answers.length : 0} Answers
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ThreadForumList;
