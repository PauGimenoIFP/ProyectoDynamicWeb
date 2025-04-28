import { Navigate, Outlet } from 'react-router-dom';

export function ProtectedRoute() {
    const udGym = localStorage.getItem('UdGym');

    if (!udGym) {
        // Si no hay UdGym en localStorage, redirige a Login
        return <Navigate to="/Login" replace />;
    }

    // Si hay UdGym, permite el acceso al componente hijo (la ruta protegida)
    return <Outlet />;
} 