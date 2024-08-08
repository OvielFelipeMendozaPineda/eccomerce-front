import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Authorized() {
    const navigate = useNavigate();

    useEffect(() => {
        const exchangeCodeForToken = async () => {
            const params = new URLSearchParams(window.location.search);
            const code = params.get('code');

            if (!code) {
                console.error('No se recibió un código de autorización.');
                return;
            }

            try {
                const response = await axios.post('http://127.0.0.1:9000/oauth2/token', new URLSearchParams({
                    grant_type: 'authorization_code',
                    code: code,
                    redirect_uri: 'http://127.0.0.1:8080/authorized'
                }), {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Authorization': `Basic ${btoa('frontend-app:1324')}`
                    }
                });

                localStorage.setItem('access_token', response.data.access_token);
                navigate('/home'); // Redirige a la página de inicio o a cualquier otra página protegida
            } catch (error) {
                console.error('Error al intercambiar el código por el token:', error);
            }
        };

        exchangeCodeForToken();
    }, [navigate]);

    return <div>Procesando...</div>;
}
