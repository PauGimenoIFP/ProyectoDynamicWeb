import { useState, useEffect, useRef } from 'react';
import { db } from './firebase';
import { doc, updateDoc, getDoc } from 'firebase/firestore';

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

    const toggleSubscriptionStatus = async () => {
        if (!clienteId || typeof clienteId !== 'string') {
            console.error("No se proporcionó un ID de cliente válido");
            return;
        }
        try {
            const docRef = doc(db, "clientes", clienteId);
            
            // Obtener el estado actual
            const docSnap = await getDoc(docRef);
            if (!docSnap.exists()) {
                console.error("El documento del cliente no existe");
                return;
            }
            
            // Invertir el valor actual
            const currentStatus = docSnap.data().EstadoSuscripcion;
            const newStatus = !currentStatus;
            
            // Actualizar el documento
            await updateDoc(docRef, { EstadoSuscripcion: newStatus });
            onClose();
            if (onUserDeleted) onUserDeleted(); // Notifica al componente padre para actualizar la lista
            
        } catch (error) {
            console.error("Error al actualizar el estado de suscripción:", error);
            alert("No se pudo actualizar el estado de suscripción. Error: " + error.message);
        }
    };
    const toggleSubscriptionPlan = async () => {
        if (!clienteId || typeof clienteId !== 'string') {
            console.error("No se proporcionó un ID de cliente válido");
            return;
        }
        try {
            const docRef = doc(db, "clientes", clienteId);
            
            // Obtener el estado actual
            const docSnap = await getDoc(docRef);
            if (!docSnap.exists()) {
                console.error("El documento del cliente no existe");
                return;
            }
            
            // Obtener el ID del gimnasio
            const udGym = localStorage.getItem('UdGym');
            const gymRef = doc(db, "centrosDeportivos", udGym);
            const gymSnap = await getDoc(gymRef);
            if (!gymSnap.exists()) {
                console.error("El documento del gimnasio no existe");
                return;
            }
            
            // Obtener el valor de PagoMensual
            let PagoMensual = gymSnap.data().mensual;
            let PagoAnual = gymSnap.data().anual;
            let Pago;
            // Invertir el valor actual
            let currentPlan = docSnap.data().PlanSuscripcion;
            if (currentPlan === 'Mensual') {
                currentPlan = 'Anual';
                Pago = PagoAnual;
            } else {
                currentPlan = 'Mensual';
                Pago = PagoMensual;
            }
            
            // Actualizar el documento
            await updateDoc(docRef, { PlanSuscripcion: currentPlan, APagar: Pago }); // Actualiza APagar también
            onClose();
            if (onUserDeleted) onUserDeleted(); // Notifica al componente padre para actualizar la lista
            
        } catch (error) {
            console.error("Error al actualizar el estado de suscripción:", error);
            alert("No se pudo actualizar el estado de suscripción. Error: " + error.message);
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
            <div className="menu-item-m-p" onClick={toggleSubscriptionStatus}>
                Cambiar estado de pago
            </div>
            <div className="menu-item-m-p" onClick={toggleSubscriptionPlan}>
                Cambiar plan de suscripción
            </div>
            <div className="menu-item-m-p" id="log-off" onClick={updateUserGymId}>
                Eliminar usuario
            </div>
        </div>
    );
}