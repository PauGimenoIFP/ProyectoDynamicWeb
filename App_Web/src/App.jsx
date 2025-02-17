import './App.css';
import logo from './assets/logo_dynamic_blanco.png';

export function App() {
  return (
    <main>
      <img src={logo} className='logo-dynamic'/>
      <div className="button-container">
        <button className='boton-izquierdo'>Nueva cuenta</button>
        <button className='boton-derecho'>Ya tengo una cuenta</button>
      </div>
    </main>
  );
}
