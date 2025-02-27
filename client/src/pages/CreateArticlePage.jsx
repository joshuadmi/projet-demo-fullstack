import ArticleForm from "../components/ArticleForm";
import { createArticle } from "../services/ArticleService";
import { useNavigate } from "react-router-dom";

const CreateArticlePage = () => {
  const navigate = useNavigate();
  const handleSubmit = async (articleData) => {
    try {
      await createArticle(articleData);
      navigate("/");
    } catch (error) {
      console.error("Erreur dans la création", error);
    }
  };
  return <div>
    
<ArticleForm onSubmit={handleSubmit} title='Créer un machand'/>



  </div>;

};

export default CreateArticlePage;
