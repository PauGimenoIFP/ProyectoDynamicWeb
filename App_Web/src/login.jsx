import './app.css';
import logo from './assets/logo_dynamic_lema_blanco.png';
import arrow from './assets/arrow-back.png';
import { useNavigate } from 'react-router-dom';

export function Login() {
  const navigate = useNavigate();

  const handleNewAccount = () => {
    navigate('/Package_Payment');
  };

  const handleBack = () => {
    navigate(-1); // O la ruta que prefieras para "atrás"
  };

  return(
    <main className="main-l">
      {/* Botón de Atrás */}
      <button className="back-button-l" onClick={handleBack}>
        <img src={arrow} alt="Volver" />
      </button>
      
      <div className="container-login-l">
        <div className="container-logo-l">
          <img src={logo} className="logo-dynamic-l" alt="Logo Dynamic" />
        </div>
        <div className="container-formulario-l">
          <h2 className="titulo-l">Inicio de Sesión</h2>
          <form className="formulario-l">
            <label className="label-email-l" htmlFor="email">Correo electrónico</label>
            <input id="email" className="email-l" placeholder=" Obligatorio" required />
            <label className="label-contraseña-l" htmlFor="contraseña">Contraseña</label>
            <input id="contraseña" type="password" className="contraseña-l" placeholder=" Obligatorio" required />
            <button className="boton-entrar-l" type="submit" onClick={handleNewAccount}>Entrar</button>
          </form>
        </div>
      </div>
    </main>
  );
}
