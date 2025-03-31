import { useState, useEffect, useRef } from 'react';
import { db } from './firebase';
import { doc, deleteDoc } from 'firebase/firestore';

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

    const DeleteUser = async () => {
        if (!clienteId) {
            console.error("No se proporcionó un ID de cliente válido");
            return;
        }
            // Cambia el ID de los clientes con el id de los documentos
        try {
            // Confirmación antes de eliminar
            if (!window.confirm("¿Estás seguro de eliminar este usuario?")) {
                return;
            }

            const docRef = doc(db, "clientes", clienteId);
            await deleteDoc(docRef);
            
            console.log("Usuario eliminado con éxito");
            onClose();
            if (onUserDeleted) onUserDeleted(); // Notifica al componente padre para actualizar la lista
            
        } catch (error) {
            console.error("Error al eliminar el usuario:", error);
            alert("No se pudo eliminar el usuario. Error: " + error.message);
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
                Ver rutinas
            </div>
            <div className="menu-item-m-p" id="log-off" /*onClick={DeleteUser}*/>
                Eliminar usuario
            </div>
        </div>
    );
}