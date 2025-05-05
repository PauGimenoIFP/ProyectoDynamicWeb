import { useEffect, useState } from 'react';
import './App.css';
import { useNavigate } from 'react-router-dom';
import lupa from './assets/icono-lupa.png';
import { ProfileMenu } from './ProfileMenu';
import { db } from './firebase'; // Importa la configuración de Firestore
import { collection, getDocs, doc, getDoc, updateDoc, addDoc } from 'firebase/firestore';
import { UserContextMenu } from './UserContextMenu';

export function Main_Panel(){
    const navigate = useNavigate();
    const [clientes, setClientes] = useState([]);
    const [menuContextual, setMenuContextual] = useState({ visible: false, x: 0, y: 0, clienteId: null });
    const [nombreGym, setNombreGym] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [passwordGym, setPasswordGym] = useState('');
    const [precioMensual, setPrecioMensual] = useState('');
    const [precioAnual, setPrecioAnual] = useState('');
    const [Logo, setLogo] = useState('');
    const [allClientes, setAllClientes] = useState([]);
    const [isAddModalVisible, setAddModalVisible] = useState(false);
    const [selectedExistingUser, setSelectedExistingUser] = useState('');
    const [existingUserSearch, setExistingUserSearch] = useState('');
    const [newUserData, setNewUserData] = useState({ Nombre: '', Apellido1: '', Apellido2: '', Email: '', Telefono: '', PlanSuscripcion: 'Mensual', Peso: '', Altura: '', PesoIdeal: '', Genero: 'Masculino', FechaNacimiento: '', Objetivo: 'Hipertrofia'});
    const [selectedExistingUserPlan, setSelectedExistingUserPlan] = useState('Mensual');

    // Función para obtener todos los clientes de la base de datos
    const fetchAllClientesData = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, 'clientes'));
            const allData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setAllClientes(allData);
             console.log("All clients data fetched."); // Log para depuración
        } catch (error) {
            console.error("Error fetching all clients data:", error);
        }
    };

    useEffect(() => {
        const fetchGymData = async () => {
            const udGym = localStorage.getItem('UdGym');
            if (udGym) {
                const docRef = doc(db, "centrosDeportivos", udGym);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setNombreGym(docSnap.data().nombre);
                    setPasswordGym(docSnap.data().password);
                    setPrecioMensual(docSnap.data().mensual);
                    setPrecioAnual(docSnap.data().anual);
                    setLogo(docSnap.data().logoUrl);
                } else {
                    console.error("No se encontró el documento del gimnasio.");
                    console.log("Comprueba el gimnasio con id: " + passwordGym);
                }
            }
        };

        fetchGymData();
    }, []);

    useEffect(() => {
        if (precioMensual !== "" && precioAnual !== "") {
            obtenerClientes(passwordGym); // Llama a obtenerClientes solo si los precios están definidos
        }
    }, [precioMensual, precioAnual]); // Dependencias

    // Cargar todos los clientes al montar el componente
    useEffect(() => {
        fetchAllClientesData(); // Llama a la nueva función
    }, []);

    const obtenerClientes = async (passwordGym) => {
        try {
            const querySnapshot = await getDocs(collection(db, "clientes"));
            const clientesData = querySnapshot.docs.map((doc) => ({
                id: doc.id, // ID del documento
                ...doc.data(), // Datos del cliente
            }));

            // Filtrar clientes que coinciden con UdGimnasio y passwordGym
            const filteredClientesData = clientesData.filter(cliente => cliente.UdGimnasio === passwordGym);
            setClientes(filteredClientesData); // Actualiza el estado con los datos filtrados
            // Actualizar el campo "APagar" de los clientes filtrados
            Promise.all(filteredClientesData.map(async (cliente) => {
                if (cliente.PlanSuscripcion === "Mensual") {
                    if (cliente.APagar != precioMensual || cliente.APagar === "") {
                        await updateDoc(doc(db, "clientes", cliente.id), {
                            APagar: precioMensual
                        });
                    } 
                } else if(cliente.PlanSuscripcion === "Anual")  {
                    if(cliente.APagar != precioAnual || cliente.APagar === "") {
                        await updateDoc(doc(db, "clientes", cliente.id), {
                            APagar: precioAnual
                        });
                    }
                } else {
                    console.log("Ha pasado algún problema con el dato de pago");
                    alert.log("Ha ocurrido un error, vuelve a intentarlo más tarde");
                }
            }));
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
        obtenerClientes(passwordGym); // Actualiza la lista de clientes del gimnasio
        fetchAllClientesData(); // Actualiza la lista de todos los clientes
    };

    const handleAddUser = () => {
        fetchAllClientesData();
        setAddModalVisible(true);
    };

    const handleCloseAddModal = () => {
        setAddModalVisible(false);
        setSelectedExistingUser('');
        setExistingUserSearch('');
        setNewUserData({ Nombre: '', Apellido1: '', Apellido2: '', Email: '', Telefono: '', PlanSuscripcion: 'Mensual', Peso: '', Altura: '', PesoIdeal: '', Genero: 'Masculino', FechaNacimiento: '', Objetivo: 'Hipertrofia'});
        setSelectedExistingUserPlan('Mensual');
    };

    const formatDate = (dateString) => {
        const [year, month, day] = dateString.split('-');
        return `${day}/${month}/${year}`;
    };

    const addExistingUser = async () => {
        if (!selectedExistingUser) {
            alert('No has seleccionado ningún usuario existente válido');
            return;
        }
        try {
            const clienteDocRef = doc(db, 'clientes', selectedExistingUser);
            const clienteSnap = await getDoc(clienteDocRef);

            if (clienteSnap.exists()) {
                const clienteData = clienteSnap.data();
                if (clienteData.UdGimnasio && clienteData.UdGimnasio !== '') {
                    const confirmacion = window.confirm(`Este usuario ya está asignado a otro gimnasio. ¿Quieres quitarlo de su gimnasio actual y añadirlo al tuyo?`);
                    if (!confirmacion) {
                        return; // El usuario canceló
                    }
                }
            } else {
                alert("No se encontró el usuario seleccionado.");
                return;
            }

            await updateDoc(doc(db, 'clientes', selectedExistingUser), { 
                UdGimnasio: passwordGym, 
                EstadoSuscripcion: false,
                PlanSuscripcion: selectedExistingUserPlan
            });
            handleCloseAddModal();
            obtenerClientes(passwordGym);
        } catch (error) {
            console.error("Error al agregar usuario existente:", error);
            alert("Hubo un error al agregar el usuario. Inténtalo de nuevo.");
        }
    };

    const addNewUser = async () => {
        if (!newUserData.Nombre.trim() || !newUserData.Apellido1.trim() || !newUserData.Apellido2.trim() || !newUserData.Email.trim() || !newUserData.Telefono.trim() || !newUserData.Peso.trim() || !newUserData.Altura.trim() || !newUserData.PesoIdeal.trim() || !newUserData.Genero.trim() || !newUserData.FechaNacimiento.trim() || !newUserData.Objetivo.trim()) {
            alert('Por favor completa los campos obligatorios: Nombre, los apellidos, Email, Teléfono, Peso, Altura, Peso Ideal, Genero, Fecha de nacimiento y Objetivo');
            return;
        }
        // Validar formato de email con dominio .es o .com
        if (!/.+@.+\.(es|com)$/.test(newUserData.Email.trim())) {
            alert('El correo debe contener @ y terminar en .es o .com');
            return;
        }

        // Verificar si el email ya está en uso
        const querySnapshot = await getDocs(collection(db, "clientes"));
        const emailExists = querySnapshot.docs.some(doc => doc.data().Email === newUserData.Email);
        if (emailExists) {
            alert("Este correo electrónico ya está en uso. Agreguelo en el apartado de usuarios existentes.");
            return; // Detener la ejecución si el correo electrónico ya está en uso
        }

        const { Nombre, Apellido1, Apellido2, Email, Telefono, PlanSuscripcion, Genero, FechaNacimiento, Objetivo } = newUserData;
        const Peso = Number(newUserData.Peso); // Convertir a número
        const Altura = Number(newUserData.Altura); // Convertir a número
        const PesoIdeal = Number(newUserData.PesoIdeal); // Convertir a número
        const formattedFechaNacimiento = formatDate(FechaNacimiento);
        const APagar = PlanSuscripcion === 'Mensual' ? precioMensual : precioAnual;

        await addDoc(collection(db, 'clientes'), { 
            Nombre, 
            Apellido1, 
            Apellido2, 
            Email, 
            Telefono, 
            PlanSuscripcion, 
            EstadoSuscripcion: false, 
            UdGimnasio: passwordGym, 
            APagar, 
            Peso, 
            Altura, 
            PesoIdeal, 
            Genero, 
            FechaNacimiento: formattedFechaNacimiento,
            Objetivo 
        });
        handleCloseAddModal();
        obtenerClientes(passwordGym);
    };

    // Filtrar clientes según el texto de búsqueda
    const filteredClientes = clientes.filter(cliente => 
        `${cliente.Nombre} ${cliente.Apellido1} ${cliente.Apellido2}`.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleNumberInput = (e) => {
        const value = e.target.value;
        e.target.value = value.replace(/[^0-9.]/g, '');
    };

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
                    <button className='btn-selected-m-p'>Usuarios</button>
                    <button onClick={goToPagos} className='btn-m-p'>Pagos</button>
                    <button onClick={goToRutinas} className='btn-m-p'>Rutinas</button>
                    <button onClick={handleAddUser} className='btn-añadir-usuario-m-p'>Añadir usuario</button>
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
                            {filteredClientes.length === 0 ? (
                                <tr>
                                    <td colSpan={5} style={{ textAlign: 'center' }}>
                                        Parece que no tienes usuarios ¡Añade algunos!
                                    </td>
                                </tr>
                            ) : (
                                filteredClientes.map((cliente) => {
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
                                })
                            )}
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
            {isAddModalVisible && (
                <div className='modal-overlay-m-p'>
                    <div className='modal-add-user-m-p'>
                        <h2 style={{margin:'0px', marginBottom:'5px'}}>Añadir usuario</h2>
                        <button className='close-btn-m-p' onClick={handleCloseAddModal}>×</button>
                        <div className='modal-section-m-p'>
                            <h3 style={{margin:'0px', marginBottom:'15px'}}>Usuario existente</h3>
                            <div className='input-dropdown-wrapper-m-p'>
                                <input
                                    type='text'
                                    placeholder='Buscar usuario existente...'
                                    value={existingUserSearch}
                                    onChange={(e) => { setExistingUserSearch(e.target.value); setSelectedExistingUser(''); }}
                                    className='input-search-m-p'
                                    autoComplete='off'
                                />
                                {/* Mostrar dropdown solo si hay texto y NO se ha seleccionado un usuario exacto */}
                                {existingUserSearch && !selectedExistingUser && (
                                    <ul style={{ position:'absolute', top:'100%', left:0, right:0, zIndex:1002, backgroundColor:'var(--background-color)', listStyle:'none', margin:0, padding:0, maxHeight:'150px', overflowY:'auto', border:'1px solid var(--secondary-color)', borderRadius:'4px' }}>
                                        {allClientes
                                            .filter(c => c.UdGimnasio !== passwordGym && (c.UdGimnasio == null || c.UdGimnasio === '') && 
                                                        (`${c.Nombre} ${c.Apellido1} ${c.Apellido2}`.toLowerCase().includes(existingUserSearch.toLowerCase()) ||
                                                         c.Email.toLowerCase().includes(existingUserSearch.toLowerCase())))
                                            .map(c => (
                                                <li
                                                    key={c.id}
                                                    style={{ padding:'8px', cursor:'pointer' }}
                                                    onClick={() => { 
                                                        setSelectedExistingUser(c.id); 
                                                        setExistingUserSearch(`${c.Nombre} ${c.Apellido1} ${c.Apellido2} - ${c.Email}`);
                                                    }}
                                                >
                                                    {c.Nombre} {c.Apellido1} {c.Apellido2} - {c.Email}
                                                </li>
                                            ))}
                                    </ul>
                                )}
                                
                            </div>
                            <select 
                                className='select-search-m-p' 
                                value={selectedExistingUserPlan} 
                                onChange={(e) => setSelectedExistingUserPlan(e.target.value)}
                            >
                                <option value='Mensual'>Mensual</option>
                                <option value='Anual'>Anual</option>
                            </select>
                            <br></br>
                            <button onClick={addExistingUser} className='btn-agregar-existente-m-p'>Agregar existente</button>
                        </div>
                        <div className='modal-section-m-p'>
                            <h3 style={{margin:'0px', marginBottom:'5px'}}>Crear nuevo usuario</h3>
                            <input type='text' className='input-cliente-nuevo-m-p' placeholder='Nombre' value={newUserData.Nombre} onChange={(e) => setNewUserData({ ...newUserData, Nombre: e.target.value })} />
                            <input type='text' className='input-cliente-nuevo-m-p' placeholder='Apellido1' value={newUserData.Apellido1} onChange={(e) => setNewUserData({ ...newUserData, Apellido1: e.target.value })} />
                            <input type='text' className='input-cliente-nuevo-m-p' placeholder='Apellido2' value={newUserData.Apellido2} onChange={(e) => setNewUserData({ ...newUserData, Apellido2: e.target.value })} />
                            <input
                                type='email'
                                pattern='.+@.+\.(es|com)$'
                                required
                                className='input-cliente-nuevo-m-p'
                                placeholder='Email'
                                value={newUserData.Email}
                                onChange={(e) => setNewUserData({ ...newUserData, Email: e.target.value })}
                            />
                            <input
                                type='tel'
                                pattern="\+?[0-9]*"
                                inputMode='tel'
                                className='input-cliente-nuevo-m-p'
                                placeholder='Teléfono'
                                value={newUserData.Telefono}
                                onChange={(e) => {
                                    const val = e.target.value;
                                    if (/^[+\d]*$/.test(val)) {
                                        setNewUserData({ ...newUserData, Telefono: val });
                                    }
                                }}
                            />
                            <input type='text' className='input-cliente-nuevo-m-p' placeholder='Altura (m)' value={newUserData.Altura} onChange={(e) => setNewUserData({ ...newUserData, Altura: e.target.value })} onInput={handleNumberInput} />
                            <input type='text' className='input-cliente-nuevo-m-p' placeholder='Peso (kg)' value={newUserData.Peso} onChange={(e) => setNewUserData({ ...newUserData, Peso: e.target.value })} onInput={handleNumberInput} />
                            <input type='text' className='input-cliente-nuevo-m-p' placeholder='Peso Ideal (kg)' value={newUserData.PesoIdeal} onChange={(e) => setNewUserData({ ...newUserData, PesoIdeal: e.target.value })} onInput={handleNumberInput}/>
                            <input type='date' className='input-cliente-nuevo-m-p' placeholder='Fecha nacimiento' value={newUserData.FechaNacimiento} onChange={(e) => setNewUserData({ ...newUserData, FechaNacimiento: e.target.value })}/>
                            <select value={newUserData.Genero} onChange={(e) => setNewUserData({ ...newUserData, Genero: e.target.value })}>
                                <option value='Masculino'>Masculino</option>
                                <option value='Femenino'>Femenino</option>
                                <option value='Otro'>Otro</option>
                            </select>
                            <select value={newUserData.Objetivo} onChange={(e) => setNewUserData({ ...newUserData, Objetivo: e.target.value })}>
                                <option value='Hipertrofia'>Hipertrofia</option>
                                <option value='Definicion muscular'>Definicion muscular</option>
                                <option value='Perder peso'>Perder peso</option>
                            </select>
                            <select value={newUserData.PlanSuscripcion} onChange={(e) => setNewUserData({ ...newUserData, PlanSuscripcion: e.target.value })}>
                                <option value='Mensual'>Mensual</option>
                                <option value='Anual'>Anual</option>
                            </select>
                            <br></br>
                            <button
                                onClick={addNewUser}
                                className='btn-agregar-nuevo-m-p'
                            >Crear y agregar</button>
                        </div>
                    </div>
                </div>
            )}
        </main>
    )
}