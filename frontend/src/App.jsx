import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Blog from './pages/Blog.jsx';
import CreateArticle from './pages/CreateArticle.jsx';
import MyArticles from './pages/MyArticles.jsx';
import DetailedInformationArticle from './pages/detailedInformationArticle.jsx';
import CommentArticle from './pages/commentArticle.jsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/createArticle" element={<CreateArticle />} />
      <Route path="/myArticles" element={<MyArticles />} />
      <Route path="/article/:id" element={<DetailedInformationArticle />} />
      <Route path="/CommentArticle" element={<CommentArticle/>} />


    </Routes>
  );
}

export default App;