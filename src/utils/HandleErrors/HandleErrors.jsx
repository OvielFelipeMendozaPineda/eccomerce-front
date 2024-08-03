import Swal from 'sweetalert2';


export const errorMessages = {
    400: {
        title: 'Solicitud incorrecta',
        text: 'El formato de la solicitud es incorrecto.',
    },
    401: {
        title: 'Credenciales incorrectas',
        text: 'Revisa tu nombre de usuario y contraseña.',
    },
    403: {
        title: 'Acceso denegado',
        text: 'No tienes permisos para acceder.',
    },
    404: {
        title: 'No encontrado',
        text: 'El recurso solicitado no existe.',
    },
    500: {
        title: 'Error del servidor',
        text: 'Hubo un problema con el servidor. Inténtalo de nuevo más tarde.',
    },
    503: {
        title: 'Servicio no disponible',
        text: 'El servicio está temporalmente fuera de servicio.',
    }
};


export const handleErrors = (error) => {
    if (error.response) {
        const errorMessage = errorMessages[error.response.status] || {
            title: 'Error desconocido',
            text: 'Ocurrió un error inesperado.',
        };

        Swal.fire({
            title: errorMessage.title,
            text: errorMessage.text,
            icon: 'error',
            confirmButtonText: 'Entendido'
        });

    } else if (error.request) {
        if (error.message.includes('Network Error')) {
            Swal.fire({
                title: 'Error de conexión',
                text: 'No se pudo conectar con el servidor. Verifica tu conexión a Internet o la disponibilidad del servidor.',
                icon: 'error',
                confirmButtonText: 'Entendido'
            });
        } else {
            Swal.fire({
                title: 'Error de red',
                text: 'No se pudo conectar con el servidor. Verifica tu conexión a Internet.',
                icon: 'error',
                confirmButtonText: 'Entendido'
            });
        }
    } else {
        Swal.fire({
            title: 'Error',
            text: 'Ocurrió un error inesperado durante la configuración de la solicitud.',
            icon: 'error',
            confirmButtonText: 'Entendido'
        });
    }
};
