import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const ArticleCard = ({ article, onDelete }) => {
  // eslint-disable-next-line react/prop-types
  const { title, description, imageUrl, createdAt, _id } = article;

  const formatedDate = new Date(createdAt).toLocaleTimeString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div style={styles.card}>
      <img src={imageUrl} alt={title} style={styles.image} id="zoom" />
      <div style={styles.content}>
        <h2>{title}</h2>
        <p>{description}</p>
        <p>
          <b>Piblié le: </b>
          {formatedDate}{" "}
        </p>

        <div style={styles.buttons}>
          <button onClick={() => onDelete(_id)} style={styles.deleteButton}>    Supprimer   </button>
            <Link to={`/article/${_id}`} style={styles.detailButton}>
              Voir les détails{" "}
            </Link>
   




       
        </div>
      </div>
    </div>
  );
};

const styles = {
  card: {
    display: "flex",
    border: "1px solid #ccc",
    borderRadius: "8px",
    marginBottom: "15px",
    padding: "10px",
    maxWidth: "800px",
    backgroundColor: "#f9f9f9",
  },

  image: {
    width: "150px",
    height: "150px",
    objectFit: "cover",
    borderRadius: "8px",
    marginRight: "15px",
  },
  content: {
    flex: 1,
  },
  deleteButton: {
    backgroundColor: "#e63946",
    color: "#fff",
    padding: "5px 10px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  detailButton: {
    display: "inline-block",
    marginLeft: "10px",
    backgroundColor: "#007bff",
    color: "#fff",
    padding: "5px 10px",
    borderRadius: "5px",
    textDecoration: "none",
  },
  buttons: {
    marginTop: "10px",
  },
};

export default ArticleCard;
