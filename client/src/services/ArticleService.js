// Ce fichier est le point de contact entre back et front


import axios from "axios";

const api = axios.create({ baseURL: `http://localhost:5001/articles` });

export const getArticles = async () => {
  const response = await api.get("/all");
  return response.data;
};

export const getArticleById = async (id) => {
  const response = await api.get(`/${id}`);
  return response.data;
};


export const createArticle = async (articleData) => {
    const formData = new FormData();

    formData.append('title' , articleData.title);
    formData.append('description' , articleData.description);
if (articleData.image) {
    formData.append('image' , articleData.image)
}
const response = await api.post(`/add` , formData);
return response.data

}

export const deleteArticle = async (id) => {
  const response = await api.delete(`/${id}`);
  return response.data;
};
