import './register.css'
import logosolo from './assets/logo_dynamic_letras_blanco.png';

export function Register(){
    return (
        <main>
          <img src={logosolo} className='logo-dynamic-reg'/>
          <div className="letrero">
            <h1>Datos del Centro Deportivo &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; Datos del Responsable</h1>
          </div>
        </main>
      )
}