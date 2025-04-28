import './App.css'
import logosolo from './assets/logo_dynamic_letras_blanco.png';
import arrow from './assets/arrow-back.png';
import visamc from './assets/logo_visa.png';
import mc from './assets/logo_mastercard.png';
import amex from './assets/logo_americanExpress.png';
import { useNavigate } from 'react-router-dom';

export function Package_Payment3(){
    const navigate = useNavigate();

    const goToPlans = () => {
        navigate('/SignUp_Form');
    };
    const goToPanel = () => {
        navigate('/Login');
    };
    return (
        <main className='main-p-p-2'>
            <div className='boton-atras-s'>
                <img src={arrow} className='arrow-back-s' onClick={goToPlans}/>
            </div>
            <div className='img-container-p-p-2'>
                <img src={logosolo} className='logo-dynamic-p-p-2'/>
            </div>
            <div className="separador-p-p-2"></div>
            <form>
            <div className='grid-p-p-2'>
                <div className="texto-paquete-p-p-2">
                    <h1>Tu paquete</h1>
                </div>
                <div className="texto-titulo-p-p-2">
                    <h1>Pagos</h1>
                </div>
                <div className="imagen-titulo-p-p-2">
                    <img src={visamc} className='imagen-visa-p-p-2'/>
                    <img src={mc} className='imagen-visa-p-p-2'/>
                    <img src={amex} className='imagen-visa-p-p-2'/>
                </div>
            </div>
            <div className='grid-p-p-3'>
                <div className="marco-input-p-p-2">
                    <div className='centrar-caja-p-p-2'>
                        <div className="paquete-medio-p-p-2">
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
                            </div>
                    </div>
                </div>
                <div className="marco-input-p-p-2">
                    <label>Nombre del titular de la tarjeta</label>
                    <input type="text" id="titular" className='input-p-p-2' placeholder=" Obligatorio" required></input>
                    <label>Numero de la tarjeta</label>
                    <input type="text" id="numTarjeta" className='input-p-p-2' placeholder=" Obligatorio" required></input>
                    <div className='grid-p-p-3'>
                        <div className='marco-CodTel-p-p-2'>
                            <label>Fecha de vencimiento</label>
                            <input type='date' className="input-p-p-2" id="FechaVenc">
                            </input>
                        </div>
                        <div className='marco-CodTel-p-p-2'>
                            <label>Codigo de seguridad (CVV)</label>
                            <input type='password' className="input-p-p-2" id="CVV" max={999} placeholder=" Obligatorio" required>
                            </input>
                        </div>
                    </div>
                    <label>Dirección de facturación</label>
                    <input type="text" id="DireccionFact" className='input-p-p-2' placeholder=" Obligatorio" required></input>
                    <div className='btn-container-p-p-2'>
                        <button className='btn-save-p-p-2' onClick={goToPanel}>Pagar</button>
                    </div>
                </div>
            </div>
            </form>
        </main>
    )
}