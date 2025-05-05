import { useState, useEffect, useRef } from 'react';
import { db } from './firebase';
import { doc, updateDoc, getDoc, collection, query, where, getDocs, arrayRemove } from 'firebase/firestore';

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
            
            // --- Nueva lógica para limpiar rutinas --- 
            // 1. Obtener email del cliente
            const clientSnap = await getDoc(docRef);
            if (!clientSnap.exists()) {
                console.error("Client document not found after confirmation!");
                alert("Error: No se encontró el cliente para limpiar rutinas.");
                return;
            }
            const clientEmail = clientSnap.data().Email;
            if (!clientEmail) {
                 console.error("Client email not found!");
                 alert("Error: No se pudo obtener el email del cliente para limpiar rutinas.");
                 return;
            }

            // 2. Obtener password del gimnasio actual
            const udGym = localStorage.getItem('UdGym');
            if (!udGym) {
                console.error("Gym ID not found in local storage for routine cleanup.");
                 alert("Error: No se pudo identificar el gimnasio actual para limpiar rutinas.");
                return;
            }
            const gymDocRef = doc(db, "centrosDeportivos", udGym);
            const gymSnap = await getDoc(gymDocRef);
             if (!gymSnap.exists()) {
                 console.error("Gym document not found for routine cleanup!");
                 alert("Error: No se encontraron los datos del gimnasio para limpiar rutinas.");
                 return;
             }
            const gymPassword = gymSnap.data().password;
             if (!gymPassword) {
                 console.error("Gym password not found for routine cleanup!");
                 alert("Error: No se pudo obtener la identificación del gimnasio para limpiar rutinas.");
                 return;
             }

            // --- Fin nueva lógica ---

            // Actualizar UdGimnasio del cliente a null
            await updateDoc(docRef, { UdGimnasio: null });
            console.log(`User ${clienteId} removed from gym.`);

            // --- Lógica de limpieza de rutinas (Ejecución) ---
            // 3. Consultar rutinas asignadas
             const routinesRef = collection(db, "rutinas");
             const q = query(routinesRef, 
                             where("gymPassword", "==", gymPassword),
                             where("asignados", "array-contains", clientEmail));
            
             const querySnapshot = await getDocs(q);
             console.log(`Found ${querySnapshot.docs.length} routines assigned to ${clientEmail} by gym ${gymPassword} to clean.`);

            // 4. Eliminar email de 'asignados' en cada rutina encontrada
            const updatePromises = [];
            querySnapshot.forEach((routineDoc) => {
                console.log(`Removing ${clientEmail} from routine ${routineDoc.id}`);
                const routineRef = doc(db, "rutinas", routineDoc.id);
                updatePromises.push(
                    updateDoc(routineRef, {
                        asignados: arrayRemove(clientEmail)
                    })
                );
            });

            await Promise.all(updatePromises);
            console.log(`Successfully cleaned routines for ${clientEmail}.`);
            // --- Fin lógica de limpieza ---

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