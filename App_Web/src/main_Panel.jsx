import './App.css'
import { useNavigate } from 'react-router-dom';
import logo_gym from './assets/logo_dynamic.png';
import foto_perfil from './assets/foto-perfil-ej.png';
import lupa from './assets/icono-lupa.png';

const clientes = [
    { id: 1, nombre: 'Carlos Martinez López', estado: 'Pendiente', email: 'carlosml@gmail.com', contacto: '625849200' },
    { id: 2, nombre: 'Maria Gómez Ramírez', estado: 'Pagado', email: 'mariagr@gmail.com', contacto: '675846201' },
    { id: 3, nombre: 'Ana Rodríguez Sánchez', estado: 'Pagado', email: 'anars@gmail.com', contacto: '654789321' },
    { id: 4, nombre: 'Juan Pablo Moreno', estado: 'Pendiente', email: 'juanpm@gmail.com', contacto: '612345678' },
    { id: 5, nombre: 'Laura García Torres', estado: 'Pagado', email: 'lauragt@gmail.com', contacto: '698745632' },
    { id: 6, nombre: 'Miguel Ángel Ruiz', estado: 'Pendiente', email: 'miguelar@gmail.com', contacto: '633221144' },
    { id: 7, nombre: 'Isabel Fernández Díaz', estado: 'Pagado', email: 'isabelfd@gmail.com', contacto: '644889977' },
    { id: 8, nombre: 'Roberto Jiménez Vega', estado: 'Pendiente', email: 'robertojv@gmail.com', contacto: '677889900' },
    { id: 9, nombre: 'Patricia Muñoz Silva', estado: 'Pagado', email: 'patriciams@gmail.com', contacto: '611223344' },
    { id: 10, nombre: 'David López Castro', estado: 'Pagado', email: 'davidlc@gmail.com', contacto: '655443322' }
];

export function Main_Panel(){
    const navigate = useNavigate();

    const goToStart = () => {
        navigate('/');
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
                    <button className='btn-m-p'>Pagos</button>
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
                                <th>Febrero de 2025</th>
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