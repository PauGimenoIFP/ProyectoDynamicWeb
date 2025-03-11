import './App.css'
import logosolo from './assets/logo_dynamic_letras_blanco.png';
import arrow from './assets/arrow-back.png';
import { useNavigate } from 'react-router-dom';

export function SignUp_Form(){
  const navigate = useNavigate();

  const goToStart = () => {
    navigate('/');
  };

  const goToPlans = () => {
    navigate('/Package_Payment');
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
              <label>Nombre del centro deportivo</label>
              <br></br>
              <input type='text' className="input-s" id="nomGym" placeholder=" Obligatorio" required>
              </input>
              <br></br>
              <label>Modalidad legal</label>
              <br></br>
              <input type='text' className="input-s" id="modalidad" placeholder=" Obligatorio" required>
              </input>
              <br></br>
              <label>Identificador fiscal (NIF/CIF)</label>
              <br></br>
              <input type='text' className="input-s" id="NIF/CIF" placeholder=" Obligatorio" required>
              </input>
              <br></br>
              <label>Dirección completa</label>
              <br></br>
              <input type='text' className="input-s" id="direccion" placeholder=" Obligatorio" required>
              </input>
              <br></br>
            </div>
            <div className='form-pequeño-s'>
              <div className='grid-pequeño-s'>
                <div className='marco-CodTel-pequeño-s'>
                  <label>Código postal</label>
                  <input className="input-pequeños-s" id="codPostal" max={99999} placeholder=" Obligatorio" required>
                  </input>
                </div>
                <div className='marco-CodTel-pequeño-derecho-s'>
                  <label>Ciudad</label>
                  <input className="input-pequeños-s" id="ciudad" max={999999999} placeholder=" Obligatorio" required>
                  </input>
                </div>
                <div className='marco-CodTel-pequeño-s'>
                  <label>País</label>
                  <input className="input-pequeños-s" id="pais" max={99999} placeholder=" Obligatorio" required>
                  </input>
                </div>
                <div className='marco-CodTel-pequeño-derecho-s'>
                  <label>Teléfono</label>
                  <input className="input-pequeños-s" id="telefono" max={999999999} placeholder=" Obligatorio" required>
                  </input>
                </div>
              </div>
            </div>
          </div>
          <div className="marco-input-s">
            <div className="texto-titulo-derecho-s">
              <h1>Datos del Responsable</h1>
            </div>
            <div className='form-derecho-s'>
              <label>Nombre</label>
              <br></br>
              <input type='text' className="input-s" id="nom" placeholder=" Obligatorio" required>
              </input>
              <br></br>
              <label>Primer apellido</label>
              <br></br>
              <input type='text' className="input-s" id="primerApellido" placeholder=" Obligatorio" required>
              </input>
              <br></br>
              <label>Segundo apellido</label>
              <br></br>
              <input type='text' className="input-s" id="segundoApellido" placeholder=" Obligatorio" required>
              </input>
              <br></br>
              <label>Correo electrónico (Cuenta Dynamic)</label>
              <br></br>
              <input type='text' className="input-s" id="email" placeholder=" Obligatorio" required>
              </input>
              <br></br>
              <label>Contraseña</label>
              <br></br>
              <input type='password' className="input-s" id="contraseña" placeholder=" Obligatorio" required>
              </input>
              <br></br>
              <label> Repite la contraseña</label>
              <br></br>
              <input type='password' className="input-s" id="contraseña" placeholder=" Obligatorio" required>
              </input>
            </div>
          </div>
        </div>
      </form>
      <div className="separador-s"></div>
      <div className='btn-container-s'>
        <button className='btn-save-s' onClick={goToPlans}>Confirmar</button>
      </div>
    </main>
  )
}