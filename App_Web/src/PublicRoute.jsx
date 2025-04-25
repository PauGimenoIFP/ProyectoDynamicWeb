import { Navigate, Outlet } from 'react-router-dom';

export function PublicRoute() {
    const udGym = localStorage.getItem('UdGym');

    if (udGym) {
        // Si hay UdGym en localStorage, redirige al Main_Panel
        return <Navigate to="/Main_Panel" replace />;
    }

    // Si no hay UdGym, permite el acceso al componente hijo (la ruta pública)
    return <Outlet />;
} 