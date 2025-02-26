import './App.css'
import logosolo from './assets/logo_dynamic_letras_blanco.png';
import { useNavigate } from 'react-router-dom';

export function Package_Payment(){
  const navigate = useNavigate();

  const goToForm = () => {
    navigate('/Package_Payment2');
};
  return (
    <main className = "main-p-p">
      <img src={logosolo} className='logo-dynamic-s'/>
      <h2 className = "texto-p-p">Dynamic ofrece un modelo de precios flexible y escalonado,
         basado en la cantidad de usuarios que tenga tu centro deportivo. </h2>

      <section className="container-paquetes-p-p">
        <div className="paquete-basico-p-p">
          <div className="header-basico-p-p">Plan básico hasta 
            <span className="trecientos-basico-p-p"> 300</span> usuarios</div>
          <hr className="separador-basico-p-p" />
          <div className="body-basico-p-p">
            <p className="precio-basico-p-p">50€ / mes</p>
            <ul className="funcionalidades-basico-p-p">
              <li>✓ Gestion integral.</li>
              <li>✓ Control de usuarios.</li>
              <li>✓ Control de pagos.</li>
              <li>✓ Contabilidad.</li>
              <li>✓ Creacion y asignacion de rutinas.</li>
            </ul>
          </div>
          <button className="boton-basico-p-p">Empezar</button>
        </div>
        
        <div className="paquete-premium-p-p">
        <div className="header-premium-p-p">Plan premium usuarios 
          <span className="ilimitados-premium-p-p"> ilimitados</span></div>
          <hr className="separador-premium-p-p" />
          <div className="body-premium-p-p">
            <p className="precio-premium-p-p">150€ / mes</p>
            <ul className="funcionalidades-premium-p-p">
              <li>✓ Gestion integral.</li>
              <li>✓ Control de usuarios.</li>
              <li>✓ Control de pagos.</li>
              <li>✓ Contabilidad.</li>
              <li>✓ Creacion y asignacion de rutinas.</li>
              <lo> y muchos mas...</lo>
            </ul>
          </div>
          <button className="boton-premium-p-p" onClick={goToForm}>Empezar</button>
        </div>
        
        <div className="paquete-medio-p-p">
        <div className="header-medio-p-p">Plan medio hasta 
          <span className="quinietos-medio-p-p"> 500</span> usuarios</div>
          <hr className="separador-medio-p-p" />
          <div className="body-medio-p-p">
            <p className="precio-medio-p-p">$100 / mes</p>
            <ul className="funcionalidades-medio-p-p">
              <li>✓ Gestion integral.</li>
              <li>✓ Control de usuarios.</li>
              <li>✓ Control de pagos.</li>
              <li>✓ Contabilidad.</li>
              <li>✓ Creacion y asignacion de rutinas.</li>
            </ul>
          </div>
          <button className="boton-medio-p-p">Empezar</button>
        </div>
      </section>
    </main>
  )
}