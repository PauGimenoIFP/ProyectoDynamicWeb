import './app.css';
import logo from './assets/logo_dynamic_lema_blanco.png';
import { useNavigate } from 'react-router-dom';

export function LandingPage() {
  const navigate = useNavigate();

  const goToRegistration = () => {
    navigate('/');
  };

  return(
    <main className = "main-l-p">
      <div className = "container-logo-l-p">
        <img src={logo} className="logo-dynamic-l-p"/>
      </div>
      <div className = "container-boton-l-p">
        <button className = "boton-izquierdo-l-p" onClick={goToRegistration}>Nueva cuenta</button>
        <button className = "boton-derecho-l-p" onClick={goToLogin}>Ya tengo una cuenta</button>
      </div>
    </main>
  );
}
