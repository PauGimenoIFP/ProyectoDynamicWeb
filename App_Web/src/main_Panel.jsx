import './App.css'
import { useNavigate } from 'react-router-dom';
import logo_gym from './assets/logo_dynamic.png';
import foto_perfil from './assets/foto-perfil-ej.png';
import lupa from './assets/icono-lupa.png';
import { clientes } from './clientesData';

export function Main_Panel(){
    const navigate = useNavigate();

    const goToStart = () => {
        navigate('/');
    };
    const goToPagos = () => {
        navigate('/Pagos');
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
                <img src={foto_perfil} alt='foto del gym' className='img-perfil-m-p'/>
            </div>
            <div className='main-m-p'>
                <div className='btn-container-m-p'>
                    <button className='btn-selected-m-p'>Usuarios</button>
                    <button onClick={goToPagos} className='btn-m-p'>Pagos</button>
                    <button className='btn-m-p'>Rutinas</button>
                    <br></br><br></br>
                    <button onClick={goToStart} className='btn-m-p' id='log-off'>Cerrar sesión</button>
                </div>
                <div className='tabla-m-p'>
                    <table >
                        <thead>
                            <tr>
                                <th>Nº</th>
                                <th>Nombre</th>
                                <th>Pago del último mes</th>
                                <th>Email</th>
                                <th>Contacto de Emergencia</th>
                            </tr>
                        </thead>
                        <tbody>
                            {clientes.map(cliente => (
                                <tr key={cliente.id}>
                                    <td>{cliente.id}</td>
                                    <td>{cliente.nombre}</td>
                                    <td>
                                        {cliente.estado === 'Pagado' ? (
                                            <div className='estado-pago-m-p'>
                                                <div className='circulo-verde-m-p'></div>
                                                {cliente.estado}
                                            </div>
                                        ) : (
                                            <div className='estado-pago-m-p'>
                                                <div className='circulo-rojo-m-p'></div>
                                                {cliente.estado}
                                            </div>
                                        )}
                                    </td>
                                    <td>{cliente.email}</td>
                                    <td>{cliente.contacto}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    )
}