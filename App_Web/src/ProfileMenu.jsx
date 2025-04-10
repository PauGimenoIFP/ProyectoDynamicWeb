import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import foto_perfil from './assets/foto-perfil-ej.png';

export function ProfileMenu() {
    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(false);
    const [adminName, setAdminName] = useState('');
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

    useEffect(() => {
        const storedAdminName = localStorage.getItem('AdminName');
        if (storedAdminName) {
            setAdminName(storedAdminName);
        }
    }, []);

    const goToStart = () => {
        navigate('/');
    }; const goToEdit = () => {
        navigate('/Edit_Profile');
    };

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    return (
        <div className="perfil-container-m-p" ref={menuRef}>
            <img 
                src={foto_perfil} 
                alt='foto de perfil' 
                className='img-perfil-m-p'
                onClick={toggleMenu}
                title={adminName}
            />
            {showMenu && (
                <div className="menu-desplegable-m-p">
                    <div className="menu-item-m-p">
                        Ajustes
                    </div>
                    <div className="menu-item-m-p" onClick={goToEdit}>
                        Mi gimnasio
                    </div>
                    <div className="menu-item-m-p" onClick={goToStart} id='log-off'>
                        Cerrar sesión
                    </div>
                </div>
            )}
        </div>
    );
} 