# Epic Services

Epic Services es una plataforma web para la gestión de solicitudes técnicas y mesa de ayuda. Permite a clientes crear solicitudes, a técnicos gestionar casos asignados y a administradores supervisar la operación completa.

## Tecnologías principales

- Next.js
- React
- TypeScript
- Firebase Authentication
- Cloud Firestore
- CSS global personalizado
- Vercel para despliegue

## Funcionalidades del MVP

### Autenticación

- Registro de usuarios cliente y técnico.
- Administradores creados manualmente desde Firebase.
- Inicio de sesión con correo y contraseña.
- Inicio de sesión con Google.
- Recuperación de contraseña.
- Cambio de contraseña.
- Protección de rutas por rol.

### Roles

#### Cliente

- Crear solicitudes técnicas.
- Ver únicamente sus propias solicitudes.
- Consultar detalle, historial y comentarios.
- Comentar solicitudes.
- Calificar solicitudes finalizadas.

#### Técnico

- Ver solicitudes nuevas disponibles.
- Tomar solicitudes.
- Ver solicitudes asignadas.
- Agregar comentarios.
- Cambiar estado y finalizar casos.

#### Administrador

- Ver todas las solicitudes.
- Asignar técnicos.
- Consultar métricas generales.
- Ver usuarios técnicos disponibles.
- Gestionar estados y seguimiento de casos.

## Backend con Firebase

El backend del MVP está implementado con Firebase:

- Firebase Authentication para usuarios y sesiones.
- Cloud Firestore para perfiles, tickets, comentarios, historial y calificaciones.

### Colecciones principales

```txt
users
tickets
tickets/{ticketId}/comments
tickets/{ticketId}/history