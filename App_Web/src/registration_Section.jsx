import './app.css';
import logo from './assets/logo_dynamic_blanco.png';

export function Registration_Section() {
  return(
    <main className = "main-registration-section">
      <header className = "logo-container">
        <img src={logo} alt = "Logo Dynamic" className="logo-dynamic"/>
      </header>
      <h2 className = "question">¿Tienes cuenta Admin Dynamic?</h2>
      <div className = "button-container">
        <button className = "boton-izquierdo">Nueva cuenta</button>
        <button className = "boton-derecho">Ya tengo una cuenta</button>
      </div>
    </main>
  );
}
