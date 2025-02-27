import { useEffect, useState } from "react";
import { getArticles, deleteArticle } from "../services/ArticleService";
import ArticleCard from "../components/ArticleCard";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const data = await getArticles();
        setArticles(data);
      } catch (error) {
        console.error(`erreur lors de la récup des articles`, error);
      }
    };
    fetchArticles();
  }, []);

  const handleDelete = async (id) => {
    const isConfirmed = window.confirm(
      "Es-tu sûr(e) de vouloir supprimer l'article?"
    );

    if (!isConfirmed) return;
    try {
      await deleteArticle(id);
      setArticles(articles.filter((article) => article._id !== id));
    } catch (error) {
      console.error("erreur......", error);
    }
  };

  return (
    <div style={styles.container}>
      <h1>Liste des articles</h1>
      <Link to="/create" style={styles.createLink}>
        Créer un nouvel article
      </Link>
      <div>
        {articles.map((article) => (
          <ArticleCard
            key={article._id}
            article={article}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  createLink: {
    display: "inline-block",
    marginBottom: "20px",
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "#fff",
    textDecoration: "none",
    borderRadius: "5px",
  },
};

export default HomePage;
