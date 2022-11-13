import './App.css';
import Logo from './components/template/Logo';
import Menu from './components/template/Menu';
import Footer from './components/template/Footer';
import Rotas from './Rotas';

export default function App() {
  return (
      <div className="App">
        <Logo/>
        <Menu/>
        <Rotas/>
        <Footer/>
      </div>
  );
}
