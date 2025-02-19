import './App.css'
import logosolo from './assets/logo_dynamic_letras_blanco.png';

export function SignUp_Form(){
  return (
    <main className = "main-signup-form">
      <img src={logosolo} className='logo-dynamic-form'/>
      <div className="texto-titulo-form">
        <h1>Datos del Centro Deportivo &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; Datos del Responsable</h1>
      </div>
      <form>
      <div className="marco-input-form">
        <input type='text' className="input-form">
        </input>
        <input type='text' className="input-form">
        </input>
      </div>
      <div>
        <input type='text' className="input-form">
        </input>
        <input type='text' className="input-form">
        </input>
      </div>
      </form>
    </main>
  )
}