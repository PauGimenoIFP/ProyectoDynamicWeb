import './App.css'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import lupa from './assets/icono-lupa.png';
import { ProfileMenu } from './ProfileMenu';
import { collection, getDocs, doc, getDoc, addDoc, updateDoc, deleteDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db } from './firebase'; // Importa la configuración de Firestore

export function Rutinas(){
    const navigate = useNavigate();
    const [nombreGym, setNombreGym] = useState('');
    const [Logo, setLogo] = useState('');
    const [gymPassword, setGymPassword] = useState('');
    const [Objetivo, setObjetivo] = useState('Hipertrofia');
    const [modalVisible, setModalVisible] = useState(false);
    const [nombreRutina, setNombreRutina] = useState('');
    const [diasSeleccionados, setDiasSeleccionados] = useState({
        lunes: false,
        martes: false,
        miercoles: false,
        jueves: false,
        viernes: false,
        sabado: false,
        domingo: false
    });
    const [mostrarDias, setMostrarDias] = useState(false);
    const [ejerciciosPorDia, setEjerciciosPorDia] = useState({
        1: [{
            musculo: '',
            ejercicios: [{
                nombre: '',
                series: 1,
                repeticiones: ['']
            }]
        }]
    });
    const [diaSeleccionado, setDiaSeleccionado] = useState(1);
    const [rutinas, setRutinas] = useState([]);
    const [editandoRutina, setEditandoRutina] = useState(null);
    const [rutinaActual, setRutinaActual] = useState(null);
    const [modoEdicion, setModoEdicion] = useState(false);
    const [asignarModalVisible, setAsignarModalVisible] = useState(false);
    const [emailParaAsignar, setEmailParaAsignar] = useState('');
    const [emailsAsignados, setEmailsAsignados] = useState([]);
    const [clientesCentro, setClientesCentro] = useState([]);
    const [searchTerm, setSearchTerm] = useState(''); // Estado para el término de búsqueda
    const [allClientes, setAllClientes] = useState([]); // Estado para todos los clientes
    // Detecto si la rutina es global (sin gymPassword) y no es editable
    const isGlobalRutina = modoEdicion && rutinaActual?.gymPassword == null;

    // Agregar un objeto para mapear días a iniciales
    const inicialesDias = {
        lunes: 'L',
        martes: 'M',
        miercoles: 'X',
        jueves: 'J',
        viernes: 'V',
        sabado: 'S',
        domingo: 'D'
    };

    const goToUsers = () => {
        navigate('/Main_Panel');
    };

    const goToPagos = () => {
        navigate('/Pagos');
    };

    const handleCrearRutina = () => {
        setModoEdicion(false);
        setEditandoRutina(null);
        setRutinaActual(null);
        resetearFormulario();
        setModalVisible(true);
    };

    const resetearFormulario = () => {
        setNombreRutina('');
        setDiasSeleccionados({
            lunes: false,
            martes: false,
            miercoles: false,
            jueves: false,
            viernes: false,
            sabado: false,
            domingo: false
        });
        setEjerciciosPorDia({
            1: [{
                musculo: '',
                ejercicios: [{
                    nombre: '',
                    series: 1,
                    repeticiones: ['']
                }]
            }]
        });
        setDiaSeleccionado(1);
    };

    const handleCerrarModal = () => {
        setModalVisible(false);
        resetearFormulario();
        setModoEdicion(false);
        setEditandoRutina(null);
        setRutinaActual(null);
        handleCerrarAsignarModal();
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Evita el comportamiento por defecto del formulario

        // Validar que el nombre de la rutina no esté vacío
        if (!nombreRutina.trim()) {
            alert('Por favor, introduce un nombre para la rutina.');
            return;
        }

        // Recoger los datos de la rutina
        const rutinaData = {
            nombre: nombreRutina,
            Objetivo: Objetivo,
            dias: Object.keys(diasSeleccionados).filter(d => diasSeleccionados[d]),
            ejercicios: ejerciciosPorDia,
            gymPassword: gymPassword,
            CreadaPorGym: true
        };

        try {
            if (modoEdicion && editandoRutina) {
                // Actualizar rutina existente
                await updateDoc(doc(db, "rutinas", editandoRutina), rutinaData);
                console.log("Rutina actualizada con ID: ", editandoRutina);
            } else {
                // Crear nueva rutina
                const docRef = await addDoc(collection(db, "rutinas"), rutinaData);
                console.log("Rutina creada con ID: ", docRef.id);
            }
            fetchRutinas(); // Actualizar la lista de rutinas
            handleCerrarModal(); // Cierra el modal después de "enviar"
        } catch (error) {
            console.error("Error al guardar la rutina: ", error);
        }
    };

    const handleMusculoChange = (dia, musculoIndex, valor) => {
        setEjerciciosPorDia(prev => ({
            ...prev,
            [dia]: prev[dia].map((musculo, index) => 
                index === musculoIndex 
                    ? {
                        ...musculo,
                        musculo: valor
                    }
                    : musculo
            )
        }));
    };

    const handleNombreEjercicioChange = (dia, musculoIndex, ejercicioIndex, valor) => {
        setEjerciciosPorDia(prev => ({
            ...prev,
            [dia]: prev[dia].map((musculo, index) => 
                index === musculoIndex 
                    ? {
                        ...musculo,
                        ejercicios: musculo.ejercicios.map((ejercicio, idx) =>
                            idx === ejercicioIndex 
                                ? { ...ejercicio, nombre: valor }
                                : ejercicio
                        )
                    }
                    : musculo
            )
        }));
    };

    const handleSeriesChange = (dia, musculoIndex, ejercicioIndex, valor) => {
        const numSeries = parseInt(valor);
        setEjerciciosPorDia(prev => ({
            ...prev,
            [dia]: prev[dia].map((musculo, index) => 
                index === musculoIndex 
                    ? {
                        ...musculo,
                        ejercicios: musculo.ejercicios.map((ejercicio, idx) => 
                            idx === ejercicioIndex 
                                ? { 
                                    ...ejercicio, 
                                    series: numSeries,
                                    repeticiones: Array(numSeries).fill('')
                                }
                                : ejercicio
                        )
                    }
                    : musculo
            )
        }));
    };

    const handleRepeticionChange = (dia, musculoIndex, ejercicioIndex, serieIndex, valor) => {
        setEjerciciosPorDia(prev => ({
            ...prev,
            [dia]: prev[dia].map((musculo, index) => 
                index === musculoIndex 
                    ? {
                        ...musculo,
                        ejercicios: musculo.ejercicios.map((ejercicio, idx) => 
                            idx === ejercicioIndex 
                                ? {
                                    ...ejercicio,
                                    repeticiones: ejercicio.repeticiones.map((rep, idx) =>
                                        idx === serieIndex ? valor : rep
                                    )
                                }
                                : ejercicio
                        )
                    }
                    : musculo
            )
        }));
    };

    // Agrego función para eliminar un ejercicio de un músculo específico
    const handleEliminarEjercicioDeMusculo = (dia, musculoIndex, ejercicioIndex) => {
        setEjerciciosPorDia(prev => ({
            ...prev,
            [dia]: prev[dia].map((musculo, idx) =>
                idx === musculoIndex
                    ? { ...musculo, ejercicios: musculo.ejercicios.filter((_, i) => i !== ejercicioIndex) }
                    : musculo
            )
        }));
    };

    const handleDiaChange = (dia) => {
        setDiasSeleccionados(prev => {
            const nuevosSeleccionados = { ...prev, [dia]: !prev[dia] };
            const diasActivos = Object.entries(nuevosSeleccionados)
                .filter(([, seleccionado]) => seleccionado)
                .length;

            if (!nuevosSeleccionados[dia]) {
                // Si se deselecciona un día, eliminar sus ejercicios
                if (!modoEdicion) {
                    setEjerciciosPorDia(prev => {
                        const nuevoEjercicios = { ...prev };
                        delete nuevoEjercicios[Object.keys(prev).length];
                        return nuevoEjercicios;
                    });
                }
            } else {
                // Si se selecciona un nuevo día, agregar estructura base
                if (!modoEdicion) {
                    setEjerciciosPorDia(prev => ({
                        ...prev,
                        [diasActivos]: [{
                            musculo: '',
                            ejercicios: [{
                                nombre: '',
                                series: 1,
                                repeticiones: ['']
                            }]
                        }]
                    }));
                }
            }

            return nuevosSeleccionados;
        });
    };

    const handleDiaClick = (dia) => {
        setDiaSeleccionado(dia);
        if (!ejerciciosPorDia[dia]) {
            setEjerciciosPorDia(prev => ({
                ...prev,
                [dia]: [{
                    musculo: '',
                    ejercicios: [{
                        nombre: '',
                        series: 1,
                        repeticiones: ['']
                    }]
                }]
            }));
        }
    };

    const handleDuplicarEjercicio = (dia, musculoIndex, ejercicioIndex) => {
        setEjerciciosPorDia(prev => ({
          ...prev,
          [dia]: prev[dia].map((musculo, idx) => {
            if (idx === musculoIndex) {
              const newEjercicio = { nombre: '', series: 1, repeticiones: [''] };
              const ejerciciosActuales = musculo.ejercicios;
              const newEjercicios = [
                ...ejerciciosActuales.slice(0, ejercicioIndex + 1),
                newEjercicio,
                ...ejerciciosActuales.slice(ejercicioIndex + 1)
              ];
              return { ...musculo, ejercicios: newEjercicios };
            }
            return musculo;
          })
        }));
    };

    const contarDiasSeleccionados = () => {
        return Object.values(diasSeleccionados).filter(Boolean).length;
    };

    // Función para obtener los días seleccionados en orden
    const obtenerDiasSeleccionados = () => {
        return Object.entries(diasSeleccionados)
            .filter(([, seleccionado]) => seleccionado)
            .map(([dia]) => dia);
    };

    const handleAgregarMusculo = (dia) => {
        setEjerciciosPorDia(prev => ({
            ...prev,
            [dia]: [...prev[dia], {
                musculo: '',
                ejercicios: [{
                    nombre: '',
                    series: 1,
                    repeticiones: ['']
                }]
            }]
        }));
    };

    const handleEliminarWidget = (dia, musculoIndex) => {
        if (ejerciciosPorDia[dia].length > 1) {  // Evita eliminar si es el último widget
            setEjerciciosPorDia(prev => ({
                ...prev,
                [dia]: prev[dia].filter((_, index) => index !== musculoIndex)
            }));
        }
    };

    // Función para verificar si hay días seleccionados
    const hayDiasSeleccionados = () => {
        return Object.values(diasSeleccionados).some(dia => dia === true);
    };

    // Función para abrir una rutina existente
    const handleAbrirRutina = async (rutina) => {
        setRutinaActual(rutina);
        setModoEdicion(true);
        setEditandoRutina(rutina.id);
        setNombreRutina(rutina.nombre);
        
        // Configurar días seleccionados
        const nuevoDiasSeleccionados = {
            lunes: false,
            martes: false,
            miercoles: false,
            jueves: false,
            viernes: false,
            sabado: false,
            domingo: false
        };
        
        rutina.dias.forEach(dia => {
            nuevoDiasSeleccionados[dia] = true;
        });
        
        setDiasSeleccionados(nuevoDiasSeleccionados);
        
        // Cargar ejercicios por día
        if (rutina.ejercicios) {
            setEjerciciosPorDia(rutina.ejercicios);
            
            // Si hay días seleccionados, establecer el primero como día actual
            if (rutina.dias && rutina.dias.length > 0) {
                // Establecer el primer día como seleccionado
                setDiaSeleccionado(1);
            }
        }
        
        setModalVisible(true);
    };

    // --- Funciones para el Modal de Asignación ---

    const handleAbrirAsignarModal = async () => {
        let asignadosActuales = [];
        if (!rutinaActual || !editandoRutina || allClientes.length === 0) return;

        try {
            const rutinaRef = doc(db, "rutinas", editandoRutina);
            const rutinaSnap = await getDoc(rutinaRef);
            if (rutinaSnap.exists() && rutinaSnap.data().asignados) {
                asignadosActuales = rutinaSnap.data().asignados;
            }

            const emailsValidos = [];
            const emailsAEliminar = [];

            // Verificar cada email asignado
            asignadosActuales.forEach(email => {
                const cliente = allClientes.find(c => c.Email === email);
                // Conservar solo si el cliente existe y pertenece al gimnasio actual
                if (cliente && cliente.UdGimnasio === gymPassword) {
                    emailsValidos.push(email);
                } else {
                    emailsAEliminar.push(email);
                }
            });

            // Si hay emails inválidos, actualizar la rutina en Firestore
            if (emailsAEliminar.length > 0) {
                await updateDoc(rutinaRef, {
                    asignados: arrayRemove(...emailsAEliminar) // Usar spread operator para eliminar múltiples
                });
                console.log("Emails inválidos eliminados de la rutina:", emailsAEliminar);
            }

            // Actualizar estado local y mostrar modal con la lista limpia
            setEmailsAsignados(emailsValidos);
            setAsignarModalVisible(true);

        } catch (error) {
            console.error("Error al verificar/actualizar emails asignados:", error);
            // Incluso si hay error, intentamos mostrar el modal con lo que se tenga
            setEmailsAsignados(asignadosActuales); 
            setAsignarModalVisible(true);
        }
    };

    const handleCerrarAsignarModal = () => {
        setAsignarModalVisible(false);
        setEmailParaAsignar('');
    };

    const handleAsignarEmail = async () => {
        if (!editandoRutina || !emailParaAsignar) return;

        // Validación simple de email (puedes mejorarla)
        if (!/\S+@\S+\.\S+/.test(emailParaAsignar)) {
            alert("Por favor, introduce un email válido.");
            return;
        }

        if (emailsAsignados.includes(emailParaAsignar)) {
            alert("Este email ya está asignado a la rutina.");
            setEmailParaAsignar(''); // Limpiar input
            return;
        }

        // Validar que el email corresponda a un cliente del gimnasio
        if (!clientesCentro.some(c => c.Email === emailParaAsignar)) {
            alert("El usuario no pertenece a este gimnasio.");
            setEmailParaAsignar('');
            return;
        }

        try {
            const rutinaRef = doc(db, "rutinas", editandoRutina);
            await updateDoc(rutinaRef, {
                asignados: arrayUnion(emailParaAsignar) // Añadir email al array
            });
            setEmailsAsignados([...emailsAsignados, emailParaAsignar]); // Actualizar estado local
            setEmailParaAsignar(''); // Limpiar input
            console.log(`Email ${emailParaAsignar} asignado a la rutina ${editandoRutina}`);
        } catch (error) {
            console.error("Error al asignar el email:", error);
            alert("Hubo un error al asignar el email. Inténtalo de nuevo.");
        }
    };

    const handleEliminarEmailAsignado = async (emailAEliminar) => {
        if (!editandoRutina || !emailAEliminar) return;

        if (!emailsAsignados.includes(emailAEliminar)) {
            console.warn("Intentando eliminar un email que no está asignado:", emailAEliminar);
            return; // El email no está en la lista local, no hacer nada
        }

        try {
            const rutinaRef = doc(db, "rutinas", editandoRutina);
            // Eliminar el email del array en Firestore
            await updateDoc(rutinaRef, {
                asignados: arrayRemove(emailAEliminar)
            });

            // Actualizar el estado local eliminando el email
            setEmailsAsignados(emailsAsignados.filter(email => email !== emailAEliminar));
            console.log(`Email ${emailAEliminar} eliminado de la rutina ${editandoRutina}`);
        } catch (error) {
            console.error("Error al eliminar el email asignado:", error);
            alert("Hubo un error al eliminar el email. Inténtalo de nuevo.");
        }
    };

    const handleEliminarRutina = async (rutinaId, rutinaPassword) => {
        if (rutinaPassword == null) return; // No eliminar rutinas globales
        if (window.confirm("¿Estás seguro de querer borrarla?")) {
            const rutDocRef = doc(db, "rutinas", rutinaId);
            await deleteDoc(rutDocRef);
            fetchRutinas();
        }
    };

    // --- Fin Funciones Modal Asignación ---

    useEffect(() => {
        fetchGymData(); // Obtener datos del gimnasio
    }, []);

    // Después de cargar gymPassword, obtener rutinas
    useEffect(() => {
        if (gymPassword) {
            fetchRutinas();
            fetchClientesCentro(gymPassword); // Asegurarse de cargar clientes del centro aquí
        }
    }, [gymPassword]);

    // Cargar todos los clientes al montar
    useEffect(() => {
        const fetchAllClientesData = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "clientes"));
                const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setAllClientes(data);
            } catch (error) {
                console.error("Error al obtener todos los clientes:", error);
            }
        };
        fetchAllClientesData();
    }, []);

    const fetchGymData = async () => {
        const udGym = localStorage.getItem('UdGym');
        if (udGym) {
            const docRef = doc(db, "centrosDeportivos", udGym);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setNombreGym(docSnap.data().nombre);
                setLogo(docSnap.data().logoUrl);
                setGymPassword(docSnap.data().password);
            } else {
                console.error("No se encontró el documento del gimnasio.");
            }
        }
    };

    const fetchRutinas = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "rutinas"));
            const rutinasData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            // Filtrar las rutinas por gymPassword de estado o globales
            const rutinasFiltradas = rutinasData.filter(rutina =>
                rutina.gymPassword === gymPassword || // Rutinas del gimnasio actual
                rutina.gymPassword == null           // Rutinas sin gymPassword (globales)
            );
            setRutinas(rutinasFiltradas);
        } catch (error) {
            console.error("Error al obtener las rutinas: ", error);
        }
    };

    // Función para cargar los clientes del gimnasio actual
    const fetchClientesCentro = async (passwordGym) => {
        try {
            const querySnapshot = await getDocs(collection(db, "clientes"));
            const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            const filtrados = data.filter(c => c.UdGimnasio === passwordGym);
            setClientesCentro(filtrados);
        } catch (error) {
            console.error("Error al obtener clientes del centro:", error);
            setClientesCentro([]);
        }
    };

    return (
        <main>
            <div className='main-m-p'>
                <div className='img-logo-m-p'>
                    {Logo && <img src={Logo} alt='foto del gym' className='img-logo-m-p'/>}
                </div>
                <div className='div-gym-nombre-m-p'>
                    <h2 className='gym-nombre-m-p' title={nombreGym}>{nombreGym}</h2>
                </div>
                <input type='text' id='search' className='input-m-p' placeholder=" Busca una rutina..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}></input>
                <img src={lupa} className='img-lupa-m-p'></img>
                <ProfileMenu />
            </div>
            <div className='main-m-p'>
                <div className='btn-container-m-p'>
                    <button onClick={goToUsers} className='btn-m-p'>Usuarios</button>
                    <button onClick={goToPagos} className='btn-m-p'>Pagos</button>
                    <button className='btn-selected-m-p'>Rutinas</button>
                </div>
                <div className='tabla-ruti'>
                    <div className='btn-crear-ruti-container'>
                        <button className='btn-crear-ruti' onClick={handleCrearRutina}> + Crear nueva rutina</button>
                        {rutinas
                            .filter(rutina => rutina.nombre.toLowerCase().includes(searchTerm.toLowerCase()))
                            .map((rutina) => (
                                <div 
                                    key={rutina.id} 
                                    className='btn-crear-ruti' 
                                    style={{ position: 'relative' }}
                                    onClick={() => handleAbrirRutina(rutina)}
                                >
                                    {rutina.gymPassword != null && (
                                        <button
                                            className='btn-eliminar-rutina'
                                            onClick={(e) => { e.stopPropagation(); handleEliminarRutina(rutina.id, rutina.gymPassword); }}
                                        >
                                            ×
                                        </button>
                                    )}
                                    {rutina.nombre}
                                </div>
                            ))}
                    </div>
                </div>
            </div>
            {modalVisible && (
                <div className='modal-ruti'>
                    <button 
                        className='btn-cerrar-ruti'
                        onClick={handleCerrarModal}
                    >
                        ×
                    </button>
                    <div className='Titulo-nueva-ruti'>{modoEdicion ? 'Editar Rutina' : 'Nueva Rutina'}</div>
                    <fieldset disabled={isGlobalRutina} style={{ border: 'none', padding: 0 }}>
                        <div className='input-container-ruti'>
                            <div className='nombre-ruti-container'>
                                <input
                                    type='text'
                                    value={nombreRutina}
                                    onChange={(e) => setNombreRutina(e.target.value)}
                                    className='nombre-ruti-input'
                                    placeholder="Nombre"
                                />
                            </div>
                            <div className='dias-ruti-container'>
                                <select
                                    value={Objetivo}
                                    onChange={(e) => setObjetivo(e.target.value)}
                                    className='objetivo-ruti-input'
                                    placeholder="Objetivo"
                                >
                                    <option value="Hipertrofia">Hipertrofia</option>
                                    <option value="Definicion muscular">Definicion muscular</option>
                                    <option value="Perder peso">Perder peso</option>
                                </select>
                            </div>
                            <div className='dias-ruti-container'>
                                <div className='dias-selector-wrapper-ruti'>
                                    <div 
                                        className='dias-display-ruti'
                                        onClick={() => setMostrarDias(!mostrarDias)}
                                    >
                                        <span>{contarDiasSeleccionados() > 0 ? contarDiasSeleccionados() : 'Días'}</span>
                                    </div>
                                    {mostrarDias && (
                                        <div className='dias-selector-ruti'>
                                            {Object.entries(diasSeleccionados).map(([dia, seleccionado]) => (
                                                <div key={dia} className='dia-checkbox-container-ruti'>
                                                    <label htmlFor={dia} className='dia-label-ruti'>
                                                        {dia.charAt(0).toUpperCase() + dia.slice(1)}
                                                    </label>
                                                    <input
                                                        type="checkbox"
                                                        id={dia}
                                                        checked={seleccionado}
                                                        onChange={() => handleDiaChange(dia)}
                                                        className='dia-checkbox-ruti'
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </fieldset>
                    <div className='botones-dias-container-ruti'>
                        {obtenerDiasSeleccionados().map((dia, index) => (
                            <button 
                                key={dia} 
                                className={`boton-dia-ruti ${diaSeleccionado === index + 1 ? 'dia-seleccionado-ruti' : ''}`}
                                onClick={() => handleDiaClick(index + 1)}
                            >
                                {inicialesDias[dia]}
                            </button>
                        ))}
                    </div>
                    <fieldset disabled={isGlobalRutina} style={{ border: 'none', padding: 0 }}>
                        {hayDiasSeleccionados() ? (
                            <div className='ejercicios-container-ruti'>
                                {ejerciciosPorDia[diaSeleccionado]?.map((musculo, musculoIndex) => (
                                    <div key={musculoIndex} className='ejercicio-item-ruti'>
                                        <div className='ejercicio-header-ruti'>
                                            <button 
                                                className='btn-eliminar-widget-ruti'
                                                onClick={() => handleEliminarWidget(diaSeleccionado, musculoIndex)}
                                            >
                                                ×
                                            </button>
                                            <div className='fila-titulos-ruti'>
                                                <input
                                                    type='text'
                                                    value={musculo.musculo}
                                                    onChange={(e) => handleMusculoChange(diaSeleccionado, musculoIndex, e.target.value)}
                                                    className='input-musculo-ruti'
                                                    placeholder="Músculo"
                                                />
                                                <div className='titulo-seccion-ruti'>Series</div>
                                                <div className='titulo-seccion-ruti'>Repeticiones</div>
                                                <div className='espacio-botones-ruti'></div>
                                            </div>
                                        </div>
                                        
                                        <div className='ejercicios-lista-ruti'>
                                            {musculo.ejercicios.map((ejercicio, ejercicioIndex) => (
                                                <div key={ejercicioIndex} className='ejercicio-fila-ruti'>
                                                    <input
                                                        type='text'
                                                        value={ejercicio.nombre}
                                                        onChange={(e) => handleNombreEjercicioChange(diaSeleccionado, musculoIndex, ejercicioIndex, e.target.value)}
                                                        placeholder="Ejercicio"
                                                        className='input-nombre-ejercicio-ruti'
                                                    />
                                                    <select
                                                        value={ejercicio.series}
                                                        onChange={(e) => handleSeriesChange(diaSeleccionado, musculoIndex, ejercicioIndex, e.target.value)}
                                                        className='select-series-ruti'
                                                    >
                                                        {[...Array(10)].map((_, i) => (
                                                            <option key={i + 1} value={i + 1}>{i + 1}</option>
                                                        ))}
                                                    </select>
                                                    <div className='repeticiones-inputs-ruti'>
                                                        {ejercicio.repeticiones.map((rep, serieIndex) => (
                                                            <input
                                                                key={serieIndex}
                                                                type='text'
                                                                value={rep}
                                                                onChange={(e) => {
                                                                    const val = e.target.value;
                                                                    // Permitir solo dígitos y máximo 2 caracteres
                                                                    if (/^\d{0,2}$/.test(val)) {
                                                                        handleRepeticionChange(diaSeleccionado, musculoIndex, ejercicioIndex, serieIndex, val);
                                                                    }
                                                                }}
                                                                className='input-repeticiones-ruti'
                                                                placeholder={`S${serieIndex + 1}`}
                                                                inputMode='numeric'
                                                            />
                                                        ))}
                                                    </div>
                                                    <div className='botones-fila-ruti'>
                                                        <button 
                                                            className='btn-fila-ruti minus'
                                                            onClick={() => handleEliminarEjercicioDeMusculo(diaSeleccionado, musculoIndex, ejercicioIndex)}
                                                        >
                                                            -
                                                        </button>
                                                        <button 
                                                            className='btn-fila-ruti plus'
                                                            onClick={() => handleDuplicarEjercicio(diaSeleccionado, musculoIndex, ejercicioIndex)}
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                                <button 
                                    className='btn-agregar-ejercicio-ruti'
                                    onClick={() => handleAgregarMusculo(diaSeleccionado)}
                                >
                                    + Añadir ejercicio
                                </button>
                            </div>
                        ) : (
                            <div className='mensaje-seleccion-dias-ruti'>
                                Selecciona un día para comenzar
                            </div>
                        )}
                        {modoEdicion && (
                            rutinaActual?.gymPassword != null && (
                                <button
                                    className='btn-asignar-rutina-modal-ruti'
                                    onClick={handleAbrirAsignarModal}
                                >
                                    Asignar rutina
                                </button>
                            )
                        )}
                    </fieldset>
                    {!isGlobalRutina && (
                        <button 
                            className='btn-crear-rutina-modal-ruti'
                            onClick={handleSubmit}
                        >
                            {modoEdicion ? 'Guardar' : 'Crear rutina'}
                        </button>
                    )}
                </div>
            )}

            {/* --- Modal de Asignación --- */}
            {asignarModalVisible && (
                <div className='modal-asignar-ruti'>
                    <button
                        className='btn-cerrar-asignar-ruti'
                        onClick={handleCerrarAsignarModal}
                    >
                        ×
                    </button>
                    <h3 className='titulo-asignar-ruti'>Asignar Rutina a un usuario</h3>
                    <div className='asignar-input-container' style={{ position: 'relative' }}>
                        <input
                            type='text'
                            value={emailParaAsignar}
                            onChange={(e) => setEmailParaAsignar(e.target.value)}
                            placeholder="Buscar cliente..."
                            className='input-asignar-email'
                            autoComplete="off"
                        />
                        {emailParaAsignar && (
                            <ul style={{ position:'absolute', top:'100%', left:0, right:0, zIndex:1002, backgroundColor:'var(--background-color)', listStyle:'none', margin:0, padding:0, maxHeight:'150px', overflowY:'auto', border:'1px solid var(--secondary-color)', borderRadius:'4px' }}>
                                {clientesCentro
                                    .filter(c => (
                                        (`${c.Nombre} ${c.Apellido1} ${c.Apellido2}`.toLowerCase().includes(emailParaAsignar.toLowerCase()) ||
                                         c.Email.toLowerCase().includes(emailParaAsignar.toLowerCase()))
                                    ))
                                    .map(cliente => (
                                        <li key={cliente.id}
                                            style={{ padding:'8px', cursor:'pointer' }}
                                            onClick={() => setEmailParaAsignar(cliente.Email)}
                                        >
                                            {cliente.Nombre} {cliente.Apellido1} {cliente.Apellido2} - {cliente.Email}
                                        </li>
                                ))}
                            </ul>
                        )}
                        <button
                            onClick={handleAsignarEmail}
                            className='btn-agregar-email'
                        >
                            Añadir
                        </button>
                    </div>
                    <div className='lista-emails-asignados'>
                        <h4>Usuarios Asignados:</h4>
                        {emailsAsignados.length > 0 ? (
                            <ul>
                                {emailsAsignados.map((email, index) => (
                                    <li key={index}>
                                        <span>{email}</span>
                                        <button
                                            className='btn-eliminar-email'
                                            onClick={() => handleEliminarEmailAsignado(email)}
                                        >
                                            ×
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No hay usuarios asignados a esta rutina.</p>
                        )}
                    </div>
                </div>
            )}
            {/* --- Fin Modal de Asignación --- */}

        </main>
    )
}