import './App.css'
import { useNavigate } from 'react-router-dom';

export function main_Panel(){
    const navigate = useNavigate();

    const goToStart = () => {
        navigate('/');
    };
    return (
        <main>
            
        </main>
    )
}