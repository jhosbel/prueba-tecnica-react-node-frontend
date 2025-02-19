# Desafío React / MongoDB - Frontend

### 📝 Introducción

Este proyecto es la implementación del frontend para la prueba técnica "Desafío React / MongoDB". La aplicación permite consultar, mostrar y actualizar información de productos en una base de datos MongoDB mediante una API.

## 🛠️ Tecnologías utilizadas

- React con Vite para una configuración rápida y optimizada.

- TypeScript para mejorar la robustez del código y facilitar su mantenibilidad.

- React Router para la gestión de rutas en la aplicación.

- Tailwind CSS para estilizar la interfaz de manera rápida y eficiente.

- SweetAlert2 para mostrar alertas interactivas y amigables con el usuario.

## ⚙️ Instalación y ejecución del proyecto

Para ejecutar el frontend de la aplicación localmente, sigue estos pasos:

1. Clona el repositorio:
    ```
    git clone https://github.com/jhosbel/tu-repositorio.git
    ```

2. Accede al directorio del frontend:
    ```
    cd nombre-del-proyecto-frontend
    ```
3. Instala las dependencias necesarias:
    ```
    npm install
    ```
4. Crea un archivo `.env` en la raíz del proyecto y agrega la URL de la API backend:
    ```
    VITE_API_URL=http://localhost:5000
    ```
    (Asegúrate de reemplazar la URL con la dirección real de tu API si está desplegada.)

5. Inicia el servidor de desarrollo:
    ```
    npm run dev
    ```
    Abre el navegador en `http://localhost:5173` (puede variar según tu configuración).

## 📝 Justificación de elecciones técnicas

1. TypeScript

    Se eligió TypeScript en lugar de JavaScript para mejorar la calidad del código, proporcionando tipado estático, mejor autocompletado y prevención de errores en tiempo de desarrollo.

2. Vite en lugar de Create React App

    Vite ofrece un entorno de desarrollo más rápido y eficiente en comparación con CRA, optimizando la carga de módulos y reduciendo el tiempo de construcción.

3. Tailwind CSS en lugar de CSS tradicional o Bootstrap

    Tailwind facilita la creación de diseños responsivos y modulares sin necesidad de escribir archivos CSS adicionales.

4. SweetAlert2 en lugar de alertas nativas

    Proporciona una mejor experiencia de usuario con alertas personalizables y más atractivas.

5. React Router

    Se eligió React Router para manejar el enrutado de la aplicación y mejorar la navegación sin recargar la página.

## 📂 Estructura del proyecto

El proyecto sigue una organización modular para facilitar su mantenimiento y escalabilidad:

    /frontend
    ├── src
    │   ├── api          # Módulos para interactuar con la API 
    │   ├── components   # Componentes reutilizables
    │   ├── interfaces   # Interfaces para tipar los datos
    │   ├── App.tsx      # Componente principal de la aplicación
    │   ├── main.tsx     # Punto de entrada de la aplicación
    ├── .env             # Variables de entorno
    ├── .gitignore       # Archivos y carpetas ignoradas por Git
    ├── vite.config.ts   # Configuración de Vite
    └── tsconfig.json    # Configuración de TypeScript

## Funcionalidades implementadas

- Visualización de productos obtenidos desde la API.

- Actualización de precios especiales para ciertos usuarios.

- Formulario de subida para agregar datos a la colección de precios especiales.

- Navegación entre "Artículos" y "Subida".

- Alertas personalizadas con SweetAlert2 para notificar acciones exitosas o errores.