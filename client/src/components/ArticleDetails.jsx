import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getArticleById } from "../services/ArticleService";

const ArticleDetails = () => {
  const { id } = useParams();
  const [article, setArticles] = useState(null);

  useEffect(() => {
    const fetchArticlesDetails = async () => {
      try {
        const data = await getArticleById(id);
        setArticles(data);
      } catch (error) {
        console.error("Erreur da,s la récup ", error);
      }
    };
    fetchArticlesDetails();
  }, [id]);
  if (!article) {
    return <div>Chargement</div>;
  }

  const { title, description, imageUrl, createdAt } = article;

  const formatedDate = new Date(createdAt).toLocaleTimeString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div style={styles.container}>
      <h1>{title}</h1>
      <img src={imageUrl} alt={title} style={styles.image} />
      <p>{description}</p>
      <p><b>Publié le : </b>{formatedDate}</p>
    </div>
  );
};

const styles = {
    container: {
      padding: '20px',
      maxWidth: '800px',
      margin: '0 auto',
    },
    image: {
      width: '100%',
      height: 'auto',
      borderRadius: '8px',
      marginBottom: '20px',
    },
  };

export default ArticleDetails;
