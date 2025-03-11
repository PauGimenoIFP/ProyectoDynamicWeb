import './app.css';
import logo from './assets/logo_dynamic_lema_blanco.png';
import { useNavigate } from 'react-router-dom';

export function Registration_Section() {
  const navigate = useNavigate();

  const handleNewAccount = () => {
    navigate('/SignUp_Form');
  };

  const handleExistingAccount = () => {
    navigate('/Login');
  };

  return(
    <main className = "main-r-s">
      <div className = "container-logo-r-s">
        <img src={logo} className="logo-dynamic-r-s"/>
      </div>
      <div className="form-group-r-s">
        <h2 className = "question-r-s">¿Tienes cuenta Admin Dynamic?</h2>
        <div className = "container-boton-r-s">
          <button className = "boton-izquierdo-r-s" onClick={handleNewAccount}>Nueva cuenta</button>
          <button className = "boton-derecho-r-s" onClick={handleExistingAccount}>Ya tengo una cuenta</button>
        </div>
      </div>
    </main>
  );
}
