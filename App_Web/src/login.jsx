import './app.css';
import logo from './assets/logo_dynamic_blanco.png';
import { useNavigate } from 'react-router-dom';

export function Login() {

  return(
    <main className="main-l">
      <div className="container-login-l">
        <div className="container-logo-l">
          <img src={logo} className="logo-dynamic-l"/>
        </div>
        <div className="container-formulario-l">
          <h2 className="titulo-l">Inicio de Sesión</h2>
          <form className="formulario-l">
            <label className="label-email-l">Correo electrónico</label>
            <input className="email-l" placeholder=" Obligatorio" required />
            <label className="label-contraseña-l">Contraseña</label>
            <input className="contraseña-l" type="password" placeholder=" Obligatorio" required />
            <button className="boton-entrar-l" type="submit">Entrar</button>
          </form>
        </div>
      </div>
    </main>
  );
}
