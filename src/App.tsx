import './App.css';
import { countriesAndCapitals } from '../config.ts';
import CountryCapitalGame from './components/GeoPairGame/GeoPairGame.tsx';
import GameHeader from './components/GameHeader/GameHeader.tsx';
import GameFooter from './components/GameFooter/GameFooter.tsx';

function App() {
  return (
    <>
      <GameHeader />
      <CountryCapitalGame data={countriesAndCapitals} />
      <GameFooter />
    </>
  );
}

export default App;
