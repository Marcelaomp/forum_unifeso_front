import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import '../styles.css'; // Para garantir que o estilo seja carregado
import PostResponse from "./PostResponse"; // Supondo que você tenha esse componente para exibir respostas

const ThreadForumDetail = () => {
  const { id } = useParams();
  const [thread, setThread] = useState(null);
  const [title, setTitle] = useState(""); // Para o título da resposta
  const [description, setDescription] = useState(""); // Para a descrição da resposta
  const [authorName, setAuthorName] = useState(""); // Para o nome do autor
  const [error, setError] = useState(""); // Para mensagens de erro

  useEffect(() => {
    axios
      .get(`http://localhost:5089/api/ThreadForum/${id}`)
      .then((response) => {
        setThread(response.data);
      })
      .catch((error) => {
        console.error("Erro ao carregar detalhes do tópico", error);
      });
  }, [id]);

  const handleTitleChange = (e) => {
    setTitle(e.target.value); // Atualiza o título da resposta
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value); // Atualiza a descrição da resposta
  };

  const handleAuthorNameChange = (e) => {
    setAuthorName(e.target.value); // Atualiza o nome do autor
  };

  const handleSubmitResponse = async (e) => {
    e.preventDefault();

    if (!title || !description || !authorName) {
      setError("O título, a descrição e o nome do autor são obrigatórios.");
      return;
    }

    try {
      const responseData = {
        title,
        description,
        date: new Date().toISOString(),
        author: {
          name: authorName, // Nome do autor inserido pelo usuário
        },
        threadForumId: parseInt(id), // Associar à thread correta
      };

      const postResponse = await axios.post(
        `http://localhost:5089/api/Post`,
        responseData
      );

      // Atualize o estado com a nova resposta
      if (postResponse.status === 201) {
        setThread((prevThread) => ({
          ...prevThread,
          answers: [...prevThread.answers, postResponse.data],
        }));
        setTitle(""); // Limpa o título após envio
        setDescription(""); // Limpa a descrição após envio
        setAuthorName(""); // Limpa o nome do autor após envio
        setError(""); // Limpa qualquer erro
      }
    } catch (error) {
      console.error("Erro ao enviar resposta:", error);
      setError("Houve um erro ao enviar a resposta. Tente novamente.");
    }
  };

  if (!thread) return <div>Carregando...</div>;

  return (
    <div className="app">
      <header className="header">
        <h1>Forum Unifeso</h1>
        <nav>
          <a href="/">Home</a>
        </nav>
      </header>
      <main className="main-content">
        <div className="thread-detail">
          <h2>{thread.topic.title}</h2>
          <p>{thread.topic.description}</p>
          <small>{new Date(thread.topic.date).toLocaleDateString()}</small>
          <h3>Autor: {thread.topic.author.name}</h3>
          
          <h3>Respostas</h3>
          {thread.answers.map((answer, index) => (
            <PostResponse key={index} post={answer} />
          ))}

          <h3>Responder</h3>
          {error && <div className="error">{error}</div>}
          <form onSubmit={handleSubmitResponse}>
            <div>
              <label htmlFor="title">Título</label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={handleTitleChange}
                placeholder="Título da resposta"
                required
              />
            </div>

            <div>
              <label htmlFor="description">Descrição</label>
              <textarea
                id="description"
                value={description}
                onChange={handleDescriptionChange}
                placeholder="Descrição da resposta"
                required
              />
            </div>

            <div>
              <label htmlFor="authorName">Nome</label>
              <input
                type="text"
                id="authorName"
                value={authorName}
                onChange={handleAuthorNameChange}
                placeholder="Seu nome"
                required
              />
            </div>

            <button type="submit">Enviar Resposta</button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default ThreadForumDetail;
