import './App.css'
import logosolo from './assets/logo_dynamic_letras_blanco.png';

export function SignUp_Form(){
  return (
    <main className = "main-signup-s">
      <img src={logosolo} className='logo-dynamic-s'/>
      <form>
        <div className='grid-s'>
          <div className="marco-input-s">
            <div className="texto-titulo-s">
              <h1>Datos del Centro Deportivo</h1>
            </div>
            <div className='form-s'>
              <a>Nombre del polideportivo</a>
              <input type='text' className="input-s">
              </input>
              <a>Modalidad legal</a>
              <input type='text' className="input-s">
              </input>
              <a>Identificador Fiscal (NIF/CIF)</a>
              <input type='text' className="input-s">
              </input>
              <a>Dirección completa</a>
              <input type='text' className="input-s">
              </input>
              <div className='grid-s'>
                <div className='marco-CodTel-s'>
                  <a>Código Postal</a>
                  <input type='text' className="input-s">
                  </input>
                </div>
                <div className='marco-CodTel-s'>
                  <a>Teléfono</a>
                  <input type='text' className="input-s">
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
              <a>Nombre</a>
              <input type='text' className="input-s">
              </input><br></br>
              <a>Primer apellido</a>
              <input type='text' className="input-s">
              </input>
              <a>Segundo apellido</a>
              <input type='text' className="input-s">
              </input>
              <a>Correo electronico</a>
              <input type='text' className="input-s">
              </input>
              <a>Contraseña</a>
              <input type='text' className="input-s">
              </input>
            </div>
          </div>
        </div>
      </form>
    </main>
  )
}