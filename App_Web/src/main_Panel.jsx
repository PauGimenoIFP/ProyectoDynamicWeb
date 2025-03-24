import React, { useEffect, useState } from 'react';
import './App.css';
import { useNavigate } from 'react-router-dom';
import logo_gym from './assets/logo_dynamic.png';
import lupa from './assets/icono-lupa.png';
import { ProfileMenu } from './ProfileMenu';
import { db } from './firebase'; // Importa la configuración de Firestore
import { collection, getDocs } from 'firebase/firestore';

export function Main_Panel(){
    const navigate = useNavigate();
    const [clientes, setClientes] = useState([]);

    const obtenerClientes = async () => {
        try {
          const querySnapshot = await getDocs(collection(db, "clientes")); // Consulta la colección "clientes"
          const clientesData = querySnapshot.docs.map((doc) => ({
            id: doc.id, // ID del documento
            ...doc.data(), // Datos del cliente
          }));
          setClientes(clientesData); // Actualiza el estado con los datos obtenidos
        } catch (error) {
          console.error("Error obteniendo clientes:", error);
        }
      };
    
      // Obtén los clientes cuando el componente se monte
      useEffect(() => {
        obtenerClientes();
      }, []);

    const goToPagos = () => {
        navigate('/Pagos');
    };

    const goToRutinas = () => {
        navigate('/rutinas');
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
                    <button className='btn-selected-m-p'>Usuarios</button>
                    <button onClick={goToPagos} className='btn-m-p'>Pagos</button>
                    <button onClick={goToRutinas} className='btn-m-p'>Rutinas</button>
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
                            {clientes.map((clientes, index) => (
                                <tr key={clientes.id}>
                                    <td>{index + 1}</td>
                                    <td>{clientes.Nombre} {clientes.Apellido1} {clientes.Apellido2}</td>
                                    <td>
                                        {clientes.EstadoSuscripcion == true ? (
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
                                    <td>{clientes.Email}</td>
                                    <td>{clientes.Telefono}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    )
}