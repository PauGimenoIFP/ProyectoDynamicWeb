import './App.css'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import lupa from './assets/icono-lupa.png';
import { clientes } from './clientesData';
import { ProfileMenu } from './ProfileMenu';
import { collection, getDocs, doc, getDoc, addDoc, updateDoc } from 'firebase/firestore';
import { db } from './firebase'; // Importa la configuración de Firestore

export function Rutinas(){
    const navigate = useNavigate();
    const [nombreGym, setNombreGym] = useState('');
    const [Logo, setLogo] = useState('');
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
    const [modoEdicion, setModoEdicion] = useState(false);

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
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Evita el comportamiento por defecto del formulario

        // Recoger los datos de la rutina
        const rutinaData = {
            nombre: nombreRutina,
            dias: Object.keys(diasSeleccionados).filter(d => diasSeleccionados[d]),
            ejercicios: ejerciciosPorDia
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

    const handleAgregarEjercicio = (dia) => {
        setEjerciciosPorDia(prev => ({
            ...prev,
            [dia]: prev[dia].map((musculo, index) => 
                index === 0 
                    ? {
                        ...musculo,
                        ejercicios: [...musculo.ejercicios, {
                            nombre: '',
                            series: 1,
                            repeticiones: ['']
                        }]
                    }
                    : musculo
            )
        }));
    };

    const handleAgregarEjercicioAMusculo = (dia, musculoIndex) => {
        setEjerciciosPorDia(prev => ({
            ...prev,
            [dia]: prev[dia].map((musculo, index) => 
                index === musculoIndex 
                    ? {
                        ...musculo,
                        ejercicios: [...musculo.ejercicios, {
                            nombre: '',
                            series: 1,
                            repeticiones: ['']
                        }]
                    }
                    : musculo
            )
        }));
    };

    const handleEliminarEjercicio = (dia, ejercicioIndex) => {
        if (ejerciciosPorDia[dia][0].ejercicios.length > 1) {  // Evita eliminar si solo queda un ejercicio
            setEjerciciosPorDia(prev => ({
                ...prev,
                [dia]: prev[dia].map((musculo, index) => 
                    index === 0 
                        ? {
                            ...musculo,
                            ejercicios: musculo.ejercicios.filter((_, index) => index !== ejercicioIndex)
                        }
                        : musculo
                )
            }));
        }
    };

    const handleEliminarEjercicioDeMusculo = (dia, musculoIndex, ejercicioIndex) => {
        if (ejerciciosPorDia[dia][musculoIndex].ejercicios.length > 1) {
            setEjerciciosPorDia(prev => ({
                ...prev,
                [dia]: prev[dia].map((musculo, idx) => 
                    idx === musculoIndex 
                        ? {
                            ...musculo,
                            ejercicios: musculo.ejercicios.filter((_, i) => i !== ejercicioIndex)
                        }
                        : musculo
                )
            }));
        }
    };

    const handleDiaChange = (dia) => {
        setDiasSeleccionados(prev => {
            const nuevosSeleccionados = {
                ...prev,
                [dia]: !prev[dia]
            };
            
            // Contar cuántos días están seleccionados
            const diasActivos = Object.entries(nuevosSeleccionados)
                .filter(([_, seleccionado]) => seleccionado)
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
            .filter(([_, seleccionado]) => seleccionado)
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

    useEffect(() => {
        fetchGymData(); // Llama a la función para obtener datos del gimnasio al montar el componente
        fetchRutinas(); // Llama a la función para obtener las rutinas
    }, []);

    const fetchGymData = async () => {
        const udGym = localStorage.getItem('UdGym');
        if (udGym) {
            const docRef = doc(db, "centrosDeportivos", udGym);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setNombreGym(docSnap.data().nombre);
                setLogo(docSnap.data().logoUrl);
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
            setRutinas(rutinasData);
        } catch (error) {
            console.error("Error al obtener las rutinas: ", error);
        }
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
                <input type='text' id='search' className='input-m-p' placeholder=" Busca un cliente..."></input>
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
                        {rutinas.map((rutina) => (
                            <div 
                                key={rutina.id} 
                                className='btn-crear-ruti' 
                                onClick={() => handleAbrirRutina(rutina)}
                            >
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
                                                            onChange={(e) => handleRepeticionChange(diaSeleccionado, musculoIndex, ejercicioIndex, serieIndex, e.target.value)}
                                                            className='input-repeticiones-ruti'
                                                            placeholder={`S${serieIndex + 1}`}
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

                    <button 
                        className='btn-crear-rutina-modal-ruti'
                        onClick={handleSubmit}
                    >
                        {modoEdicion ? 'Guardar' : 'Crear rutina'}
                    </button>
                </div>
            )}
        </main>
    )
}