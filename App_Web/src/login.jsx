import './app.css';
import './index.css';
import logo from './assets/logo_dynamic_lema_blanco.png';
import arrow from './assets/arrow-back.png';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from './firebase'; // Asegúrate de que la configuración de Firestore esté correctamente importada

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const q = query(collection(db, "Admin"), where("email", "==", email), where("password", "==", password));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const adminData = querySnapshot.docs[0].data();
        localStorage.setItem('UdGym', adminData.UdGym); // Guarda el UdGym en el almacenamiento local
        localStorage.setItem('AdminName', adminData.nombre);
        navigate('/Main_Panel');
      } else {
        alert("Correo electrónico o contraseña incorrectos.");
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      alert("Hubo un problema al iniciar sesión. Por favor, inténtalo de nuevo.");
    }
  };

  const handleBack = () => {
    navigate('/'); // O la ruta que prefieras para "atrás"
  };

  return(
    <main className="main-l">
      {/* Botón de Atrás */}
      <button className="back-button-l" onClick={handleBack}>
        <img src={arrow} alt="Volver" />
      </button>
      
      <div className="container-login-l">
        <div className="container-logo-l">
          <img src={logo} className="logo-dynamic-l" alt="Logo Dynamic" />
        </div>
        <div className="container-formulario-l">
          <h2 className="titulo-l">Inicio de Sesión</h2>
          <form className="formulario-l" onSubmit={handleLogin}>
            <label className="label-email-l" htmlFor="email">Correo electrónico</label>
            <input 
              id="email" 
              className="email-l" 
              placeholder="" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label className="label-contraseña-l" htmlFor="contraseña">Contraseña</label>
            <input 
              id="contraseña" 
              type="password" 
              className="contraseña-l" 
              placeholder="" 
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="boton-entrar-l" type="submit">Entrar</button>
          </form>
        </div>
      </div>
    </main>
  );
}
