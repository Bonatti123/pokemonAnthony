import { BrowserRouter, Routes, Route } from "react-router-dom";
import PokemonList from "../pages/PokemonList";
import PokemonDetail from "../pages/PokemonDetail";

function AppRouter() {
    return (
        <BrowserRouter>

            <Routes>

                <Route path="/" element={<PokemonList />} />

                <Route path="pokemon/:id" element={<PokemonDetail />} />

            </Routes>

        </BrowserRouter>
    );
}

export default AppRouter;