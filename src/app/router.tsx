import { Route, Routes } from 'react-router-dom';

import HomePage from '../pages/Home/HomePage';
import PokemonDetailsPage from '../pages/PokemonDetails/PokemonDetailsPage';

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      <Route path="/pokemon/:pokemonName" element={<PokemonDetailsPage />} />

      <Route path="*" element={<HomePage />} />
    </Routes>
  );
}

export default AppRouter;
