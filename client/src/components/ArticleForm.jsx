/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

const ArticleForm = ({ initialData = {}, onSubmit, title }) => {
  const [article, setArticles] = useState({
    title: initialData.title || "",
    description: initialData.description || "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setArticles((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setArticles((prev) => ({
      ...prev,
      image: e.target.files[0],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(article);
  };

  return (
    <div>
      <h1>{title}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Titre</label>
          <input
            type="text"
            name="title"
            value={article.title}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Description</label>
          <textarea
            type="textarea"
            name="description"
            value={article.description}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Image</label>
          <input type="file" onChange={handleImageChange} accept="image/*" />
        </div>

        <button type="submit">Envoyer</button>
      </form>
    </div>
  );
};

export default ArticleForm;
