import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const NewQuestion = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState("");
  const [authorName, setAuthorName] = useState(""); // Para o autor
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const tags = [
    "Medicina", "Direito", "Enfermagem", "Odontologia", "Fisioterapia",
    "Psicologia", "Engenharia_Civil", "Engenharia_de_Produção", "Administração",
    "Ciências_Contábeis", "Sistemas_de_Informação", "Biomedicina", "Farmácia",
    "Nutrição", "Educação_Física", "Pedagogia", "Serviço_Social"
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verificar se os campos obrigatórios estão preenchidos
    if (!title || !description || !tag || !authorName) {
      setError("Todos os campos são obrigatórios.");
      return;
    }

    try {
      // Estrutura do corpo da requisição
      const response = await axios.post("https://forumunifeso-production.up.railway.app/add", {
        topic: {
          title,
          description,
          date: new Date().toISOString(), // data atual
          author: {
            name: authorName
          }
        },
        tag, // tag como string
      });

      // Se a pergunta for criada com sucesso, redireciona para a página principal
      if (response.status === 201) {
        navigate("/"); // Redirecionar para a página principal
      }
    } catch (error) {
      console.error("Erro ao criar a pergunta:", error);
      setError("Houve um erro ao criar a pergunta. Tente novamente.");
    }
  };

  return (
    <div className="new-question">
      <h2>Nova Pergunta</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Título</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Descrição</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="authorName">Nome do Autor</label>
          <input
            type="text"
            id="authorName"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="tag">Tag</label>
          <select
            id="tag"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            required
          >
            <option value="">Selecione uma tag</option>
            {tags.map((tagOption, index) => (
              <option key={index} value={tagOption}>
                {tagOption}
              </option>
            ))}
          </select>
        </div>

        <button type="submit">Criar Pergunta</button>
      </form>
    </div>
  );
};

export default NewQuestion;
