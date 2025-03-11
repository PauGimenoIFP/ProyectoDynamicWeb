import './App.css'
import logosolo from './assets/logo_dynamic_letras_blanco.png';
import arrow from './assets/arrow-back.png';
import visamc from './assets/visa-MC-logo.png';
import amex from './assets/amex-icon.png';
import { useNavigate } from 'react-router-dom';

export function Package_Payment2(){
    const navigate = useNavigate();

    const goToPlans = () => {
        navigate('/Package_Payment');
    };

    const goToPanel = () => {
        navigate('/main_Panel');
    };
    return (
        <main>
            <div className='boton-atras-s'>
                <img src={arrow} className='arrow-back-s' onClick={goToPlans}/>
            </div>
            <div className='img-container-p-p-2'>
                <img src={logosolo} className='logo-dynamic-s'/>
            </div>
            <div className="separador-p-p-2"></div>
            <form>
            <div className='grid-p-p-3'>
                <div className="texto-titulo-p-p-2" >
                    <h1>Tu paquete</h1>
                </div>
                <div className="texto-titulo-p-p-2">
                    <h1>Pagos</h1>
                </div>
                <div className="texto-titulo-s">
                    <img src={visamc} className='imagen-visa-p-p-2'/>
                    <img src={amex} className='imagen-visa-p-p-2'/>
                </div>
            </div>
            <div className='grid-p-p-3'>
                <div className="marco-input-p-p-2">
                    <div className='centrar-caja-p-p-2'>
                        <div className="paquete-premium-p-p">
                            <div className="header-premium-p-p">Plan premium usuarios 
                                <span className="ilimitados-premium-p-p"> ilimitados</span>
                            </div>
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
                        </div>
                    </div>
                </div>
                <div className="marco-input-p-p-2">
                    <label>Nombre del titular de la tarjeta</label>
                    <input type="text" id="titular" className='input-p-p-2'></input>
                    <label>Numero de la tarjeta</label>
                    <input type="text" id="numTarjeta" className='input-p-p-2'></input>
                    <div className='grid-p-p-3'>
                        <div className='marco-CodTel-p-p-2'>
                            <label>Fecha de vencimiento</label>
                            <input type='date' className="input-p-p-2" id="FechaVenc">
                            </input>
                        </div>
                        <div className='marco-CodTel-p-p-2'>
                            <label>Codigo de seguridad (CVV)</label>
                            <input type='password' className="input-p-p-2" id="CVV" max={999}>
                            </input>
                        </div>
                    </div>
                    <label>Dirección de facturación</label>
                    <input type="text" id="DireccionFact" className='input-p-p-2'></input>
                </div>
            </div>
            </form>
            <div className='btn-container-p-p-2'>
                <button className='btn-save-p-p-2' onClick={goToPanel}>Confirmar</button>
            </div>
        </main>
    )
}