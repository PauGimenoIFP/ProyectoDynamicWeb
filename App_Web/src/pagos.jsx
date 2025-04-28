import { useEffect, useState } from 'react';
import './App.css';
import { useNavigate } from 'react-router-dom';
import lupa from './assets/icono-lupa.png';
import { ProfileMenu } from './ProfileMenu';
import { db } from './firebase';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { UserContextMenu } from './UserContextMenu';

export function Pagos(){
    const navigate = useNavigate();
    const [clientes, setClientes] = useState([]);
    const [menuContextual, setMenuContextual] = useState({ visible: false, x: 0, y: 0, clienteId: null });
    const [nombreGym, setNombreGym] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [passwordGym, setPasswordGym] = useState('');
    const [Logo, setLogo] = useState('');

    useEffect(() => {
        const fetchGymData = async () => {
            const udGym = localStorage.getItem('UdGym');
            if (udGym) {
                const docRef = doc(db, "centrosDeportivos", udGym);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setNombreGym(docSnap.data().nombre);
                    setPasswordGym(docSnap.data().password);
                    obtenerClientes(docSnap.data().password); // Llama a obtenerClientes con el passwordGym
                    setLogo(docSnap.data().logoUrl);
                } else {
                    console.error("No se encontró el documento del gimnasio.");
                    console.log("Comprueba el gimnasio con id: " + passwordGym);
                }
            }
        };

        fetchGymData();
    }, []);

    const obtenerClientes = async (passwordGym) => {
        try {
            const querySnapshot = await getDocs(collection(db, "clientes")); // Consulta la colección "clientes"
            const clientesData = querySnapshot.docs.map((doc) => ({
                id: doc.id, // ID del documento
                ...doc.data(), // Datos del cliente
            }));
            // Filtrar clientes que coinciden con UdGimnasio y passwordGym
            const filteredClientesData = clientesData.filter(cliente => cliente.UdGimnasio === passwordGym);
            setClientes(filteredClientesData); // Actualiza el estado con los datos filtrados
        } catch (error) {
            console.error("Error obteniendo clientes:", error);
        }
    };

    const goToUsers = () => {
        navigate('/Main_Panel');
    };

    const goToRutinas = () => {
        navigate('/rutinas');
    };

    const handleContextMenu = (e, clienteId) => {
        e.preventDefault();
        setMenuContextual({
            visible: true,
            x: e.pageX,
            y: e.pageY,
            clienteId: clienteId
        });
    };

    const handleCloseMenu = () => {
        setMenuContextual({ ...menuContextual, visible: false });
    };

    const handleUserDeleted = () => {
        obtenerClientes(passwordGym); // Vuelve a obtener la lista de clientes después de eliminar uno
    };

    const filteredClientes = clientes.filter(cliente => 
        `${cliente.Nombre} ${cliente.Apellido1} ${cliente.Apellido2}`.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <main>
            <div className='main-m-p'>
                <div className='img-logo-m-p'>
                    <img src={Logo} alt='foto del gym' className='img-logo-m-p'/>
                </div>
                <div className='div-gym-nombre-m-p'>
                    <h2 className='gym-nombre-m-p' title={nombreGym}>{nombreGym}</h2>
                </div> 
                <input type='text' id='search' className='input-m-p' placeholder=" Busca un cliente..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}></input>
                <img src={lupa} className='img-lupa-m-p'></img>
                <ProfileMenu />
            </div>
            <div className='main-m-p'>
                <div className='btn-container-m-p'>
                    <button onClick={goToUsers} className='btn-m-p'>Usuarios</button>
                    <button className='btn-selected-m-p'>Pagos</button>
                    <button onClick={goToRutinas} className='btn-m-p'>Rutinas</button>
                </div>
                <div className='tabla-m-p'>
                    <table>
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
                            {filteredClientes.map((cliente) => {
                                const originalIndex = clientes.findIndex(c => c.id === cliente.id); // Encuentra el índice original
                                return (
                                    <tr 
                                        key={cliente.id}
                                        onContextMenu={(e) => handleContextMenu(e, cliente.id)}
                                    >
                                        <td>{originalIndex + 1}</td>
                                        <td>{cliente.Nombre} {cliente.Apellido1} {cliente.Apellido2}</td>
                                        <td>
                                            {cliente.EstadoSuscripcion === true ? (
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
                                        <td>{cliente.APagar} €</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    <UserContextMenu 
                        x={menuContextual.x}
                        y={menuContextual.y}
                        isVisible={menuContextual.visible}
                        onClose={handleCloseMenu}
                        clienteId={menuContextual.clienteId}
                        onUserDeleted={handleUserDeleted}
                    />
                </div>
            </div>
        </main>
    )
}