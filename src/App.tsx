import './App.css';
import CountryCapitalGame from './components/GeoPairGame';

function App() {
  return (
    <CountryCapitalGame data={{ Germany: 'Berlin', Azerbaijan: 'Baku' }} />
  );
}

export default App;
