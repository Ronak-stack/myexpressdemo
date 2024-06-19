import logo from './logo.svg';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Header from './common/header';
import RoutesList from './routes/routeslist';
import Footer from './common/footer';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className='App'>
    <BrowserRouter>
      <RoutesList/>
    </BrowserRouter>
    </div>
  );
}

export default App;
