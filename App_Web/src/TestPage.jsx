import { subirClientes } from './clientesData';
import { useNavigate } from 'react-router-dom';

export function TestPage() {
    const navigate = useNavigate();

    const handleSubirClientes = async () => {
        await subirClientes();
    };

    const goBack = () => {
        navigate(-1);
    };

    return (
        <main style={{ padding: '20px', color: 'white' }}>
            <h1>Página de Pruebas</h1>
            <div style={{ display: 'flex', gap: '10px' }}>
                <button 
                    onClick={handleSubirClientes}
                    style={{ 
                        padding: '10px 20px',
                        backgroundColor: 'var(--primary-color)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer'
                    }}
                >
                    Subir Clientes de Prueba
                </button>
                <button 
                    onClick={goBack}
                    style={{ 
                        padding: '10px 20px',
                        backgroundColor: 'var(--inputs)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer'
                    }}
                >
                    Volver
                </button>
            </div>
        </main>
    );
} 