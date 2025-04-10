import { useState, useEffect, useRef } from 'react';
import { db } from './firebase';
import { doc, updateDoc } from 'firebase/firestore';

export function UserContextMenu({ x, y, isVisible, onClose, clienteId, onUserDeleted }) {
    const menuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose]);

    const updateUserGymId = async () => {
        console.log(clienteId);
        if (!clienteId || typeof clienteId !== 'string') {
            console.error("No se proporcionó un ID de cliente válido");
            return;
        }
        try {
            // Confirmación antes de actualizar
            if (!window.confirm("¿Estás seguro de eliminar a este usuario del gimnasio?")) {
                return;
            }

            const docRef = doc(db, "clientes", clienteId);
            await updateDoc(docRef, { UdGimnasio: null });
            onClose();
            if (onUserDeleted) onUserDeleted(); // Notifica al componente padre para actualizar la lista
            
        } catch (error) {
            console.error("Error al actualizar el UdGimnasio:", error);
            alert("No se pudo actualizar el UdGimnasio. Error: " + error.message);
        }
    };

    if (!isVisible) return null;

    return (
        <div 
            ref={menuRef}
            className="menu-contextual-m-p"
            style={{
                position: 'fixed',
                top: y,
                left: x
            }}
        >
            <div className="menu-item-m-p" onClick={() => {}}>
                Asignar rutinas
            </div>
            <div className="menu-item-m-p" id="log-off" onClick={updateUserGymId}>
                Eliminar usuario
            </div>
        </div>
    );
}