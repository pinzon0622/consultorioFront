import React, { useState } from 'react';
import axios from 'axios';

function ProtectedComponent({ token }) {
    const [message, setMessage] = useState('');

    const fetchProtectedData = async () => {
        try {
            const response = await axios.get('http://localhost:8080/protected', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setMessage(response.data.logged_in_as.username);
        } catch (error) {
            setMessage('No autorizado');
        }
    };

    return (
        <div>
            <button onClick={fetchProtectedData}>Obtener Datos Protegidos</button>
            {message && <p>Hola {message}</p>}
            
        </div>
    );
    
}

export default ProtectedComponent;
