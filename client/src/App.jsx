import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import CreateArticlePage from "./pages/CreateArticlePage";
import EditPage from "./pages/EditPage";
import ArticleDetails from "./components/ArticleDetails";


const App = () => {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
<Route path="/" element={<HomePage />} /> 
<Route path="/create" element={<CreateArticlePage />} /> 
<Route path="/edit" element={<EditPage/>} />
<Route path="/article/:id" element={<ArticleDetails/>} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
