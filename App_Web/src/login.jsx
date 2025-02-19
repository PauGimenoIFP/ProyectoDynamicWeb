import './app.css';
import logo from './assets/logo_dynamic_blanco.png';
import { useNavigate } from 'react-router-dom';

export function Login() {

  return(
    <main className = "main-login">
      <div className = "logo-container">
        <img src={logo} className="logo-dynamic"/>
      </div>
    </main>
  );
}
