import './App.css'
import logosolo from './assets/logo_dynamic_letras_blanco.png';
import arrow from './assets/arrow-back.png';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { db } from './firebase';
import { collection, addDoc, updateDoc, getDocs } from "firebase/firestore"; 
import axios from 'axios';

export function SignUp_Form(){
  const navigate = useNavigate();
  
  // Estados para el logo
  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const [imageUrl, setImageUrl] = useState(null); // Estado para almacenar la URL de la imagen

  const goToStart = () => {
    navigate('/Package_Payment');
  };

  const goToPlans = () => {
    const selectedPlan = localStorage.getItem('selectedPlan'); // Obtener el plan seleccionado

    // Navegar a la página correspondiente según el plan
    if (selectedPlan === 'basic') {
      navigate('/Package_Payment1');
    } else if (selectedPlan === 'premium') {
      navigate('/Package_Payment2');
    } else if (selectedPlan === 'medium') {
      navigate('/Package_Payment3');
    } else {
      navigate('/Login'); // Navegar a Login si no hay un plan seleccionado
    }
  };

  // Maneja el cambio de archivo tanto para el input como para el drop
  const handleLogoChange = async (file) => {
    if (file) {
      setLogoFile(file);
      const previewUrl = URL.createObjectURL(file);
      setLogoPreview(previewUrl);
      
      // Subir la imagen a Cloudinary
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'Dynamic'); // Reemplaza con tu upload preset

      try {
        const response = await axios.post('https://api.cloudinary.com/v1_1/deggvl6qi/image/upload', formData);
        const uploadedImageUrl = response.data.secure_url; // Obtén la URL de la imagen
        setImageUrl(uploadedImageUrl); // Almacena la URL en el estado
        console.log("URL de la imagen en Cloudinary: ", uploadedImageUrl);
      } catch (error) {
        console.error("Error al subir la imagen a Cloudinary: ", error);
      }
    }
  };

  const handleFileInputChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleLogoChange(e.target.files[0]);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleLogoChange(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleNumberInput = (e) => {
    const value = e.target.value;
    e.target.value = value.replace(/[^0-9]/g, '');
  };

  const generateUniquePassword = async () => {
    let uniquePassword;
    let exists = true;

    while (exists) {
      uniquePassword = Math.floor(100000000 + Math.random() * 900000000); // Genera un número de 9 dígitos
      const querySnapshot = await getDocs(collection(db, "centrosDeportivos"));
      exists = querySnapshot.docs.some(doc => doc.data().password === uniquePassword.toString());
    }

    return uniquePassword.toString();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const requiredFields = [
      'nomGym', 'NIF/CIF', 'direccion', 
      'codPostal', 'ciudad', 'pais', 'telefono', 
      'nom', 'primerApellido', 'email', 'contraseña', 'contraseña2',
      'Mensual', 'Anual'
    ];

    for (let fieldId of requiredFields) {
      const field = document.getElementById(fieldId);
      if (!field.value.trim()) {
        alert("Por favor, completa todos los campos obligatorios.");
        return; // Detener la ejecución si algún campo requerido está vacío
      }
    }

    const email = document.getElementById('email').value;
    if (!email.includes('@')) {
      alert("Por favor, introduce un correo electrónico válido.");
      return; // Detener la ejecución si el correo electrónico no contiene "@"
    }

    const password = document.getElementById('contraseña').value;
    const confirmPassword = document.getElementById('contraseña2').value;

    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden. Por favor, inténtalo de nuevo.");
      return; // Detener la ejecución si las contraseñas no coinciden
    }

    // Verifica si hay un archivo de logo
    if (!logoFile) {
      alert("Por favor, sube un logo.");
      return;
    }

    try {
      const uniquePassword = await generateUniquePassword();

      const Mensual = document.getElementById('Mensual').value + " €";
      const Anual = document.getElementById('Anual').value + " €";

      const docRef = await addDoc(collection(db, "centrosDeportivos"), {
        nombre: document.getElementById('nomGym').value,
        nifCif: document.getElementById('NIF/CIF').value,
        direccion: document.getElementById('direccion').value,
        codigoPostal: document.getElementById('codPostal').value,
        ciudad: document.getElementById('ciudad').value,
        pais: document.getElementById('pais').value,
        telefono: document.getElementById('telefono').value,
        mensual: Mensual,
        anual: Anual,
        password: uniquePassword,
        logoUrl: imageUrl, // Añadir la URL de la imagen a la base de datos
      });

      const nombreCon = document.getElementById('nom').value + " " + document.getElementById('primerApellido').value + " " + document.getElementById('segundoApellido').value
      
      const docRefAdmin = await addDoc(collection(db, "Admin"), {
        nombre: nombreCon,
        email: document.getElementById('email').value,
        password: document.getElementById('contraseña').value,
        UdGym: docRef.id,
      });

      // Actualiza el documento de centrosDeportivos con el ID de Admin
      await updateDoc(docRef, {
        UdAdmin: docRefAdmin.id
      });
      
      console.log("Gym escrito con ID: ", docRef.id);
      console.log("Admin escrito con ID: ", docRefAdmin.id);
      goToPlans(); // Navega a la siguiente página después de guardar
    } catch (e) {
      console.error("Error al añadir el documento: ", e);
      alert.error("Error al añadir el gimnasio o Admin, vuelva a intentarlo más tarde o contacte con nosotros si persiste.");
    }
  };

  const selectedPlan = localStorage.getItem('selectedPlan');
  console.log("Plan seleccionado:", selectedPlan);

  return (
    <main className="main-signup-s">
      <div className='boton-atras-s'>
        <img src={arrow} className='arrow-back-s' onClick={goToStart}/>
      </div>
      <div className='img-container-s'>
        <img src={logosolo} className='logo-dynamic-s'/>
      </div>
      <form className="container-formulario-s">
        <div className='grid-s'>
          <div className="marco-input-s">
            <div className="texto-titulo-s">
              <h1>Datos del Centro Deportivo</h1>
            </div>
            <div className='form-s'>
              <label>Nombre del centro deportivo *</label>
              <br />
              <input type='text' className="input-s" id="nomGym" />
              <br />
              <label>Identificador fiscal (NIF/CIF) *</label>
              <br />
              <input type='text' className="input-s" id="NIF/CIF" />
              <br />
              <label>Dirección completa *</label>
              <br />
              <input type='text' className="input-s" id="direccion" />
              <br />
            </div>
            <div className='form-pequeño-s'>
              <div className='grid-pequeño-s'>
                <div className='marco-CodTel-pequeño-s'>
                  <label>Código postal *</label>
                  <input className="input-pequeños-s" id="codPostal" max={99999} onInput={handleNumberInput}/>
                </div>
                <div className='marco-CodTel-pequeño-derecho-s'>
                  <label>Ciudad *</label>
                  <input className="input-pequeños-derecho-s" id="ciudad" max={999999999} />
                </div>
                <div className='marco-CodTel-pequeño-s'>
                  <label>País *</label>
                  <input className="input-pequeños-s" id="pais" />
                </div>
                <div className='marco-CodTel-pequeño-derecho-s'>
                  <label>Teléfono *</label>
                  <input className="input-pequeños-derecho-s" id="telefono" max={999999999} onInput={handleNumberInput}/>
                </div>
                <div className='marco-CodTel-pequeño-s'>
                  <label>Pago Mensual *</label>
                  <input 
                    className="input-pequeños-s" id="Mensual" max={99999} placeholder=" €" onInput={handleNumberInput}
                  />
                </div>
                <div className='marco-CodTel-pequeño-derecho-s'>
                  <label>Pago Anual *</label>
                  <input className="input-pequeños-derecho-s" id="Anual" max={99999} placeholder=" €" onInput={handleNumberInput}/>
                </div>
              </div>
            </div>
            <div className='form-pequeño-s'>
              <label>Logo del Gym *</label>
              <br />
              <div 
                className="logo-drop-area-s" 
                onDrop={handleDrop} 
                onDragOver={handleDragOver}
              >
                {logoPreview ? (
                  <img 
                    src={logoPreview} 
                    alt="Vista previa del logo" 
                    className="logo-preview-s" 
                  />
                ) : (
                  <>
                    <p>Arrastra tu logo aquí</p>
                    <button 
                      type="button"
                      className="btn-drop-area-s"  
                      onClick={() => document.getElementById('logoGym').click()}
                    >
                      Examinar...
                    </button>
                  </>
                )}
                <input 
                  type='file' 
                  id="logoGym" 
                  accept="image/*" 
                  onChange={handleFileInputChange}
                  style={{ display: 'none' }}
                />
              </div>
            </div>
          </div>
          <div className="marco-input-derecho-s">
            <div className="texto-titulo-derecho-s">
              <h1>Datos del Responsable</h1>
            </div>
            <div className='form-derecho-s'>
              <label>Nombre *</label>
              <br />
              <input type='text' className="input-s" id="nom" />
              <br />
              <label>Primer apellido *</label>
              <br />
              <input type='text' className="input-s" id="primerApellido" />
              <br />
              <label>Segundo apellido</label>
              <br />
              <input type='text' className="input-s" id="segundoApellido" placeholder=" Opcional"/>
              <br />
              <label>Correo electrónico (Cuenta Dynamic) *</label>
              <br />
              <input type='text' className="input-s" id="email" />
              <br />
              <label>Contraseña *</label>
              <br />
              <input type='password' className="input-s" id="contraseña" />
              <br />
              <label>Repite la contraseña *</label>
              <br />
              <input type='password' className="input-s" id="contraseña2" />
            </div>
          </div>
        </div>
      </form>
      <div className="separador-s"></div>
      <div className='btn-container-s'>
        <button className='btn-save-s' onClick={handleSubmit}>Confirmar</button>
      </div>
    </main>
  )
}
