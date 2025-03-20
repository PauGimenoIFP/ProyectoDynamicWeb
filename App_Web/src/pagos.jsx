import './App.css'
import { useNavigate } from 'react-router-dom';
import logo_gym from './assets/logo_dynamic.png';
import lupa from './assets/icono-lupa.png';
import { clientes } from './clientesData';
import { ProfileMenu } from './ProfileMenu';

export function Pagos(){
    const navigate = useNavigate();

    const goToUsers = () => {
        navigate('/Main_Panel');
    };

    return (
        <main>
            <div className='main-m-p'>
                <div className='img-logo-m-p'>
                    <img src={logo_gym} alt='foto del gym' className='img-logo-m-p'/>
                </div>
                <div>
                    <h2>Nombre Gym</h2>
                </div> 
                <input type='text' id='search' className='input-m-p' placeholder=" Busca un cliente..."></input>
                <img src={lupa} className='img-lupa-m-p'></img>
                <ProfileMenu />
            </div>
            <div className='main-m-p'>
                <div className='btn-container-m-p'>
                    <button onClick={goToUsers} className='btn-m-p'>Usuarios</button>
                    <button className='btn-selected-m-p'>Pagos</button>
                    <button className='btn-m-p'>Rutinas</button>
                </div>
                <div className='tabla-m-p'>
                    <table >
                        <thead>
                            <tr>
                                <th>Nº</th>
                                <th>Nombre</th>
                                <th>Pago del último mes</th>
                                <th>Plan de suscripción</th>
                                <th>Precio de suscripción</th>
                            </tr>
                        </thead>
                        <tbody>
                            {clientes.map(cliente => (
                                <tr key={cliente.id}>
                                    <td>{cliente.id}</td>
                                    <td>{cliente.nombre} {cliente.Apellido1} {cliente.Apellido2}</td>
                                    <td>
                                        {cliente.EstadoSuscripcion == true ? (
                                            <div className='estado-pago-m-p'>
                                                &ensp;
                                                <div className='circulo-verde-m-p'></div>
                                                <a>Pagado</a>
                                            </div>
                                        ) : (
                                            <div className='estado-pago-m-p'>
                                                &ensp;
                                                <div className='circulo-rojo-m-p'></div>
                                                <a>Pendiente</a>
                                            </div>
                                        )}
                                    </td>
                                    <td>{cliente.PlanSuscripcion}</td>
                                    <td>{cliente.APagar}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    )
}