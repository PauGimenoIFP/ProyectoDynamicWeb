import './App.css'
import logosolo from './assets/logo_dynamic_letras_blanco.png';
import arrow from './assets/arrow-back.png';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
// ... otros imports

export function SignUp_Form(){
  const navigate = useNavigate();
  
  // Estados para el logo
  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);

  const goToStart = () => {
    navigate('/');
  };

  const goToPlans = () => {
    navigate('/Package_Payment');
  };

  // Maneja el cambio de archivo tanto para el input como para el drop
  const handleLogoChange = (file) => {
    if(file){
      setLogoFile(file);
      const previewUrl = URL.createObjectURL(file);
      setLogoPreview(previewUrl);
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
              <label>Nombre del centro deportivo</label>
              <br />
              <input type='text' className="input-s" id="nomGym" placeholder=" Obligatorio" required />
              <br />
              <label>Modalidad legal</label>
              <br />
              <input type='text' className="input-s" id="modalidad" placeholder=" Obligatorio" required />
              <br />
              <label>Identificador fiscal (NIF/CIF)</label>
              <br />
              <input type='text' className="input-s" id="NIF/CIF" placeholder=" Obligatorio" required />
              <br />
              <label>Dirección completa</label>
              <br />
              <input type='text' className="input-s" id="direccion" placeholder=" Obligatorio" required />
              <br />
            </div>
            <div className='form-pequeño-s'>
              <div className='grid-pequeño-s'>
                <div className='marco-CodTel-pequeño-s'>
                  <label>Código postal</label>
                  <input className="input-pequeños-s" id="codPostal" max={99999} placeholder=" Obligatorio" required />
                </div>
                <div className='marco-CodTel-pequeño-derecho-s'>
                  <label>Ciudad</label>
                  <input className="input-pequeños-derecho-s" id="ciudad" max={999999999} placeholder=" Obligatorio" required />
                </div>
                <div className='marco-CodTel-pequeño-s'>
                  <label>País</label>
                  <input className="input-pequeños-s" id="pais" max={99999} placeholder=" Obligatorio" required />
                </div>
                <div className='marco-CodTel-pequeño-derecho-s'>
                  <label>Teléfono</label>
                  <input className="input-pequeños-derecho-s" id="telefono" max={999999999} placeholder=" Obligatorio" required />
                </div>
              </div>
            </div>
            <div className='form-pequeño-s'>
              <label>Logo del Gym</label>
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
              <label>Nombre</label>
              <br />
              <input type='text' className="input-s" id="nom" placeholder=" Obligatorio" required />
              <br />
              <label>Primer apellido</label>
              <br />
              <input type='text' className="input-s" id="primerApellido" placeholder=" Obligatorio" required />
              <br />
              <label>Segundo apellido</label>
              <br />
              <input type='text' className="input-s" id="segundoApellido" placeholder=" Obligatorio" required />
              <br />
              <label>Correo electrónico (Cuenta Dynamic)</label>
              <br />
              <input type='text' className="input-s" id="email" placeholder=" Obligatorio" required />
              <br />
              <label>Contraseña</label>
              <br />
              <input type='password' className="input-s" id="contraseña" placeholder=" Obligatorio" required />
              <br />
              <label>Repite la contraseña</label>
              <br />
              <input type='password' className="input-s" id="contraseña2" placeholder=" Obligatorio" required />
            </div>
          </div>
        </div>
      </form>
      <div className="separador-s"></div>
      <div className='btn-container-s'>
        <button className='btn-save-s' onClick={goToPlans}>Confirmar</button>
      </div>
    </main>
  )
}
