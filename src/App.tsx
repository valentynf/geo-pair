import './App.css';
import CountryCapitalGame from './components/GeoPairGame';
import { countriesAndCapitals } from '../config.ts';

function App() {
  return <CountryCapitalGame data={countriesAndCapitals} />;
}

export default App;
