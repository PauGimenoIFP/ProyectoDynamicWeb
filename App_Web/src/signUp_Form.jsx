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
      <div className='boton-atras-s'>
        <img src={arrow} className='arrow-back-s' onClick={goToStart}/>
      </div>
      <div className='img-container-s'>
        <img src={logosolo} className='logo-dynamic-s'/>
      </div>
      <form className="container-formulario-s">
        <div className='grid-s'>
          <div className="marco-input-s">
            <div className="texto-titulo-s">
              <h1>Datos del Centro Deportivo</h1>
            </div>
            <div className='form-s'>
              <label>Nombre del polideportivo</label>
              <br></br>
              <input type='text' className="input-s" id="nomGym">
              </input>
              <br></br>
              <label>Modalidad legal</label>
              <br></br>
              <input type='text' className="input-s" id="modalidad">
              </input>
              <br></br>
              <label>Identificador Fiscal (NIF/CIF)</label>
              <br></br>
              <input type='text' className="input-s" id="NIF/CIF">
              </input>
              <br></br>
              <label>Dirección completa</label>
              <br></br>
              <input type='text' className="input-s" id="direccion">
              </input>
              <br></br>
              <div className='grid-s'>
                <div className='marco-CodTel-s'>
                  <label>Código Postal</label>
                  <input type='number' className="input-s" id="codPostal" max={99999}>
                  </input>
                </div>
                <div className='marco-CodTel-s'>
                  <label>Teléfono</label>
                  <input type='number' className="input-s" id="telefono" max={999999999}>
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
              <br></br>
              <input type='text' className="input-s" id="nom">
              </input>
              <br></br>
              <label>Primer apellido</label>
              <br></br>
              <input type='text' className="input-s" id="primerApellido">
              </input>
              <br></br>
              <label>Segundo apellido</label>
              <br></br>
              <input type='text' className="input-s" id="segundoApellido">
              </input>
              <br></br>
              <label>Correo electronico</label>
              <br></br>
              <input type='text' className="input-s" id="email">
              </input>
              <br></br>
              <label>Contraseña</label>
              <br></br>
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