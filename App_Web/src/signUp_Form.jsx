import './App.css'
import logosolo from './assets/logo_dynamic_letras_blanco.png';
import arrow from './assets/arrow-back.png'
import { useNavigate } from 'react-router-dom';

export function SignUp_Form(){
  const navigate = useNavigate();

  const goToStart = () => {
    navigate('/');
  };
  return (
    <main className = "main-signup-s">
      <div className='img-container-s'>
      <img src={arrow} className='arrow-back-s' onClick={goToStart}/>
      <img src={logosolo} className='logo-dynamic-s'/>
      </div>
      <form>
        <div className='grid-s'>
          <div className="marco-input-s">
            <div className="texto-titulo-s">
              <h1>Datos del Centro Deportivo</h1>
            </div>
            <div className='form-s'>
              <label>Nombre del polideportivo</label>
              <input type='text' className="input-s" id="nomGym">
              </input>
              <label>Modalidad legal</label>
              <input type='text' className="input-s" id="modalidad">
              </input>
              <label>Identificador Fiscal (NIF/CIF)</label>
              <input type='text' className="input-s" id="NIF/CIF">
              </input>
              <label>Dirección completa</label>
              <input type='text' className="input-s" id="direccion">
              </input>
              <div className='grid-s'>
                <div className='marco-CodTel-s'>
                  <label>Código Postal</label>
                  <input type='text' className="input-s" id="codPostal">
                  </input>
                </div>
                <div className='marco-CodTel-s'>
                  <label>Teléfono</label>
                  <input type='text' className="input-s" id="telefono">
                  </input>
                </div>
              </div>
            </div>
          </div>
          <div className="marco-input-s">
            <div className="texto-titulo-s">
              <h1>Datos del Responsable</h1>
            </div>
            <div className='form-s'>
              <label>Nombre</label>
              <input type='text' className="input-s" id="nom">
              </input><br></br>
              <label>Primer apellido</label>
              <input type='text' className="input-s" id="primerApellido">
              </input>
              <label>Segundo apellido</label>
              <input type='text' className="input-s" id="segundoApellido">
              </input>
              <label>Correo electronico</label>
              <input type='text' className="input-s" id="email">
              </input>
              <label>Contraseña</label>
              <input type='password' className="input-s" id="contraseña">
              </input>
            </div>
          </div>
        </div>
      </form>
      <div className="separador-s"></div>
      <div className='btn-container-s'>
        <button className='btn-save-s'>Confirmar</button>
      </div>
    </main>
  )
}