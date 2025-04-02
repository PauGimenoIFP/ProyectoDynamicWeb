import { useEffect, useState } from 'react';
import './App.css';
import { useNavigate } from 'react-router-dom';
import logo_gym from './assets/logo_dynamic.png';
import lupa from './assets/icono-lupa.png';
import { ProfileMenu } from './ProfileMenu';
import { db } from './firebase'; // Importa la configuración de Firestore
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { UserContextMenu } from './UserContextMenu';

export function Main_Panel(){
    const navigate = useNavigate();
    const [clientes, setClientes] = useState([]);
    const [menuContextual, setMenuContextual] = useState({ visible: false, x: 0, y: 0, clienteId: null });
    const [nombreGym, setNombreGym] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [passwordGym, setPasswordGym] = useState('');

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
                } else {
                    console.error("No se encontró el documento del gimnasio.");
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

    const goToPagos = () => {
        navigate('/Pagos');
    };

    const goToRutinas = () => {
        navigate('/rutinas');
    };

    const handleContextMenu = (e, clienteId) => {
        e.preventDefault();
        //console.log("ID del cliente:", clienteId); // Para depuración
        setMenuContextual({
            visible: true,
            x: e.pageX,
            y: e.pageY,
            clienteId
            // clienteId: clienteId.toString() // Aseguramos que sea string
        });
    };

    const handleCloseMenu = () => {
        setMenuContextual({ ...menuContextual, visible: false });
    };

    // Filtrar clientes según el texto de búsqueda
    const filteredClientes = clientes.filter(cliente => 
        `${cliente.Nombre} ${cliente.Apellido1} ${cliente.Apellido2}`.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <main>
            <div className='main-m-p'>
                <div className='img-logo-m-p'>
                    <img src={logo_gym} alt='foto del gym' className='img-logo-m-p'/>
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
                    <button className='btn-selected-m-p'>Usuarios</button>
                    <button onClick={goToPagos} className='btn-m-p'>Pagos</button>
                    <button onClick={goToRutinas} className='btn-m-p'>Rutinas</button>
                </div>
                <div className='tabla-m-p'>
                    <table>
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
                                        <td>{cliente.Email}</td>
                                        <td>{cliente.Telefono}</td>
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
                    />
                </div>
            </div>
        </main>
    )
}