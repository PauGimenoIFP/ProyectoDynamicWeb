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
              <label>Nombre del polideportivo</label>
              <input type='text' className="input-s">
              </input>
              <label>Modalidad legal</label>
              <input type='text' className="input-s">
              </input>
              <label>Identificador Fiscal (NIF/CIF)</label>
              <input type='text' className="input-s">
              </input>
              <label>Dirección completa</label>
              <input type='text' className="input-s">
              </input>
              <div className='grid-s'>
                <div className='marco-CodTel-s'>
                  <label>Código Postal</label>
                  <input type='text' className="input-s">
                  </input>
                </div>
                <div className='marco-CodTel-s'>
                  <label>Teléfono</label>
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
              <label>Nombre</label>
              <input type='text' className="input-s">
              </input><br></br>
              <label>Primer apellido</label>
              <input type='text' className="input-s">
              </input>
              <label>Segundo apellido</label>
              <input type='text' className="input-s">
              </input>
              <label>Correo electronico</label>
              <input type='text' className="input-s">
              </input>
              <label>Contraseña</label>
              <input type='text' className="input-s">
              </input>
            </div>
          </div>
        </div>
      </form>
    </main>
  )
}