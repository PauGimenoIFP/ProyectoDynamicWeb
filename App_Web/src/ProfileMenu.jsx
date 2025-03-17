import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import foto_perfil from './assets/foto-perfil-ej.png';

export function ProfileMenu() {
    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const goToStart = () => {
        navigate('/');
    };

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    return (
        <div className="perfil-container-m-p" ref={menuRef}>
            <img 
                src={foto_perfil} 
                alt='foto del gym' 
                className='img-perfil-m-p'
                onClick={toggleMenu}
            />
            {showMenu && (
                <div className="menu-desplegable-m-p">
                    <div className="menu-item-m-p">
                        Ajustes
                    </div>
                    <div className="menu-item-m-p" onClick={goToStart} id='log-off'>
                        Cerrar sesión
                    </div>
                </div>
            )}
        </div>
    );
} 