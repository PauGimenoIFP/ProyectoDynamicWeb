import './app.css';
import logo from './assets/logo_dynamic_blanco.png';
import { useNavigate } from 'react-router-dom';

export function Registration_Section() {
  const navigate = useNavigate();

  const handleNewAccount = () => {
    navigate('/signup');
  };

  const handleExistingAccount = () => {
    navigate('/login');
  };

  return(
    <main className = "main-registration-section">
      <div className = "logo-container">
        <img src={logo} className="logo-dynamic"/>
      </div>
      <div className="form-group">
        <h2 className = "question">¿Tienes cuenta Admin Dynamic?</h2>
        <div className = "button-container">
          <button className = "boton-izquierdo" onClick={handleNewAccount}>Nueva cuenta</button>
          <button className = "boton-derecho" onClick={handleExistingAccount}>Ya tengo una cuenta</button>
        </div>
      </div>
    </main>
  );
}
