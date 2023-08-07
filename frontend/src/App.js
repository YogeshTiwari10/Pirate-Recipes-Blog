import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Error from './pages/Error/Error';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Recipes from './pages/Recipes/Recipes';
import SingleRecipes from './pages/SingleRecipes/SingleRecipes';
import SearchedRecipes from './pages/Recipes/SearchedRecipes';

function App() {
  return (
    <>
    <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/Home' element={<Home />} />
      <Route path='/About' element={<About />} />
      <Route path='/Recipes/:slug' element={<SingleRecipes />} />
      <Route path='/Recipes' element={<Recipes />} />
      <Route path='/Searchedrecipes/:slug' element={<SearchedRecipes />} />
      <Route path='*' element={<Error />} />
      </Routes>
    <Footer />
    </BrowserRouter>
    </>
  );
}

export default App;
