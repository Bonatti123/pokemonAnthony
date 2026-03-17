import { BrowserRouter, Routes, Route } from "react-router-dom";
import PokemonList from "../pages/PokemonList";
import PokemonDetail from "../pages/PokemonDetail";
import CreatePost from "../pages/CreatePost";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PokemonList />} />
        <Route path="/pokemon/:id" element={<PokemonDetail />} />
        <Route path="/create" element={<CreatePost />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;