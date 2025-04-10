import './App.css'
import arrow from './assets/arrow-back.png';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { db } from './firebase';
import { updateDoc, getDoc, doc } from "firebase/firestore"; 
import axios from 'axios';
import { Cloudinary } from '@cloudinary/url-gen';
import { AdvancedImage } from '@cloudinary/react';

const cld = new Cloudinary({ cloud: { cloudName: 'deggvl6qi' } });

export function Edit_Profile(){
  const navigate = useNavigate();
  const [nombreGym, setNombreGym] = useState('');
  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const [imageUrl, setImageUrl] = useState(null); // Estado para almacenar la URL de la imagen
  const [precioMensual, setPrecioMensual] = useState('');
  const [precioAnual, setPrecioAnual] = useState('');
  const [CodigoPostal, setCodigoPostal] = useState('');
  const [Ciudad, setCiudad] = useState('');
  const [Telefono, setTelefono] = useState('');
  const [Pais, setPais] = useState('');
  const [Direccion, setDireccion] = useState('');
  const [NifCif, setNifCif] = useState('');
  const [Logo, setLogo] = useState('');
  const [docId, setDocId] = useState(''); // Estado para almacenar el ID del documento

  useEffect(() => {
    const fetchGymData = async () => {
        const udGym = localStorage.getItem('UdGym');
        if (udGym) {
            setDocId(udGym); // Almacena el ID del gimnasio
            const docRef = doc(db, "centrosDeportivos", udGym);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setNombreGym(docSnap.data().nombre);
                setPrecioMensual(docSnap.data().mensual);
                setPrecioAnual(docSnap.data().anual);
                setCodigoPostal(docSnap.data().codigoPostal);
                setCiudad(docSnap.data().ciudad);
                setTelefono(docSnap.data().telefono);
                setPais(docSnap.data().pais);
                setDireccion(docSnap.data().direccion);
                setNifCif(docSnap.data().nifCif);
                setLogo(docSnap.data().logoUrl);
                
            } else {
                console.error("No se encontró el documento del gimnasio.");
            }
        }
    };

    fetchGymData();
}, []);
  
  const goToPanel = () => {
    navigate('/Main_Panel');
  };

  // Maneja el cambio de archivo tanto para el input como para el drop
  const handleLogoChange = async (file) => {
    if (file) {
      setLogoFile(file);
      const previewUrl = URL.createObjectURL(file);
      setLogoPreview(previewUrl);

      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'Dynamic'); // Usa el nombre de tu upload preset

      try {
        const response = await axios.post('https://api.cloudinary.com/v1_1/deggvl6qi/image/upload', formData);
        const imageUrl = response.data.secure_url; // Obtén la URL de la imagen
        setImageUrl(imageUrl); // Almacena la URL en el estado
        console.log("URL de la imagen en Cloudinary: ", imageUrl);
      } catch (error) {
        console.error("Error al subir la imagen a Cloudinary: ", error);
      }
    }
  };

  const handleFileInputChange = (e) => {
    if(e.target.files && e.target.files[0]){
      handleLogoChange(e.target.files[0]);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if(e.dataTransfer.files && e.dataTransfer.files[0]){
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Usa el docId que has almacenado
      const Mensual = document.getElementById('Mensual').value + " €";
      const Anual = document.getElementById('Anual').value + " €";

      // Crea un objeto para almacenar los cambios
      const updates = {};
      const fieldsToUpdate = [
        { id: 'nomGym', key: 'nombre' },
        { id: 'NIF/CIF', key: 'nifCif' },
        { id: 'direccion', key: 'direccion' },
        { id: 'codPostal', key: 'codigoPostal' },
        { id: 'ciudad', key: 'ciudad' },
        { id: 'pais', key: 'pais' },
        { id: 'telefono', key: 'telefono' },
        { id: 'Mensual', key: 'mensual', value: Mensual },
        { id: 'Anual', key: 'anual', value: Anual },
      ];

      // Solo agrega al objeto de actualizaciones si el campo tiene un valor
      fieldsToUpdate.forEach(field => {
        const value = field.value || document.getElementById(field.id).value;
        if (value) {
          updates[field.key] = value;
        }
      });

      // Actualiza el documento existente en lugar de crear uno nuevo
      await updateDoc(doc(db, "centrosDeportivos", docId), {
        ...updates,
        logoUrl: imageUrl, // Guarda la URL de Cloudinary
      });
      
      console.log("Gym actualizado con ID: ", docId);
      goToPanel(); // Navega a la siguiente página después de guardar
    } catch (e) {
      console.error("Error al actualizar el documento: ", e);
      alert.error("Error al actualizar el gimnasio, vuelva a intentarlo más tarde o contacte con nosotros si persiste.");
    }
  };

  return (
    <main className="main-signup-s">
      <div className='boton-atras-s'>
        <img src={arrow} className='arrow-back-s' onClick={goToPanel}/>
      </div>
      <div className='img-container-s'>
        <div className='img-logo-m-p'>
          <img src={Logo} alt='foto del gym' className='img-logo-ep'/>
        </div>
        <h2 className='gym-nombre-m-p' title={nombreGym}>{nombreGym}</h2>
      </div>
      <form className="container-formulario-s">
            <div className="texto-titulo-ep">
              <h1>Datos del Centro Deportivo</h1>
            </div>
        <div className='grid-s'>
          <div className="marco-input-s">
            <div className='form-s'>
              <label>Nombre del centro deportivo </label>
              <br />
              <input 
                type='text' 
                className="input-s" 
                id="nomGym" 
                value={nombreGym} 
                onChange={(e) => setNombreGym(e.target.value)}
              />
              <br />
              <label>Identificador fiscal (NIF/CIF) </label>
              <br />
              <input 
                type='text' 
                className="input-s" 
                id="NIF/CIF" 
                value={NifCif} 
                onChange={(e) => setNifCif(e.target.value)}
              />
              <br />
              <label>Dirección completa </label>
              <br />
              <input 
                type='text' 
                className="input-s" 
                id="direccion" 
                value={Direccion} 
                onChange={(e) => setDireccion(e.target.value)}
              />
              <br />
            </div>
            <div className='form-pequeño-s'>
              <label>Logo del Gym </label>
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
            <div className='grid-pequeño-s'>
              <div className='marco-CodTel-pequeño-s'>
                <label>Pago Mensual </label>
                <input 
                  className="input-pequeños-s" 
                  id="Mensual" 
                  max={99999} 
                  placeholder=" €" 
                  value={precioMensual.replace(' €', '')} 
                  onInput={handleNumberInput} 
                  onChange={(e) => setPrecioMensual(e.target.value)}
                />
              </div>
              <div className='marco-CodTel-pequeño-derecho-s'>
                <label>Pago Anual </label>
                <input 
                  className="input-pequeños-derecho-s" 
                  id="Anual" 
                  max={99999} 
                  placeholder=" €" 
                  value={precioAnual.replace(' €', '')} 
                  onInput={handleNumberInput} 
                  onChange={(e) => setPrecioAnual(e.target.value)}
                />
              </div>
              <div className='marco-CodTel-pequeño-s'>
                <label>Código postal </label>
                <input 
                  className="input-pequeños-s" 
                  id="codPostal" 
                  max={99999} 
                  value={CodigoPostal} 
                  onInput={handleNumberInput} 
                  onChange={(e) => setCodigoPostal(e.target.value)}
                />
              </div>
              <div className='marco-CodTel-pequeño-derecho-s'>
                <label>Ciudad </label>
                <input 
                  className="input-pequeños-derecho-s" 
                  id="ciudad" 
                  max={999999999} 
                  value={Ciudad} 
                  onChange={(e) => setCiudad(e.target.value)}
                />
              </div>
              <div className='marco-CodTel-pequeño-s'>
                <label>País </label>
                <input 
                  className="input-pequeños-s" 
                  id="pais" 
                  value={Pais} 
                  onChange={(e) => setPais(e.target.value)}
                />
              </div>
              <div className='marco-CodTel-pequeño-derecho-s'>
                <label>Teléfono </label>
                <input 
                  className="input-pequeños-derecho-s" 
                  id="telefono" 
                  max={999999999} 
                  value={Telefono} 
                  onInput={handleNumberInput} 
                  onChange={(e) => setTelefono(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </form>
      <div className='btn-container-s'>
        <button className='btn-save-s' onClick={handleSubmit}>Guardar Cambios</button>
      </div>
    </main>
  )
}