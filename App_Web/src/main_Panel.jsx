import './App.css'
import { useNavigate } from 'react-router-dom';

export function Main_Panel(){
    const navigate = useNavigate();

    const goToStart = () => {
        navigate('/');
    };
    return (
        <main>
            <div className='main-m-p'>
                <div>
                    <img src='' alt='foto del gym'/>
                </div>
                <div>
                    <h3>Nombre Gym</h3>
                </div>
                <div>
                    <button onClick={goToStart}>Cerrar sesión</button>
                </div>

            </div>
            <div className='main-m-p'>
                <div>
                    <button className='btn-m-p'>Usuarios</button>
                    <button className='btn-m-p'>Pagos</button>
                    <button className='btn-m-p'>Rutinas</button>
                </div>
            </div>
        </main>
    )
}