
# ERP – Gestión de Stock 🗃️

Este es un sistema ERP simple para la gestión de stock, desarrollado como proyecto final de la Tecnicatura en Desarrollo de Software en la Universidad Nacional de Cuyo. La aplicación permite registrar productos, filtrarlos, editarlos y eliminarlos desde una interfaz web, con autenticación mediante Firebase. Está dividida en frontend y backend, ambos desplegados en la nube.

---

## 🌐 Accesos al Proyecto

- 🔗 [Frontend desplegado en Render](https://erp-stock-front.onrender.com)
- 🔗 [Backend API REST en Render](https://erp-stock-back.onrender.com/api/productos)

> ⚠️ Nota: Render puede tardar unos segundos en despertar los servicios si no han sido accedidos recientemente.

---

## ⚙️ Tecnologías Utilizadas

### Frontend
- HTML5, CSS3, JavaScript
- Firebase Authentication

### Backend
- Java 17
- Spring Boot 3
- Spring Web, Spring Data JPA
- Hibernate
- CORS

### Base de Datos
- MySQL (hosteado en [TiDB Cloud](https://tidbcloud.com/))

### Testing
- JUnit 5 (pruebas unitarias)
- Spring Boot Test (pruebas de integración)
- Postman + Newman (pruebas de integración vía API REST)
- Cypress (pruebas E2E del frontend)

### Herramientas de Gestión
- GitHub (repositorios separados para frontend y backend)
- Notion (planificación, gestión de tareas y sprints)

---

## 🧱 Arquitectura del Proyecto

El sistema sigue una arquitectura **cliente-servidor**, con **estructura monolítica**:

[Frontend (JS + HTML)]  <--->  [Backend REST (Spring Boot)]  <--->  [Base de datos MySQL en TiDB]

- Frontend se comunica con el backend a través de endpoints REST.
- El backend gestiona la lógica de negocio y persistencia de datos.

---

## 🧪 Pruebas Automatizadas

| Tipo                  | Herramienta            | Resultado     |
|-----------------------|------------------------|---------------|
| Unitarias             | JUnit                  | ✅ Aprobadas   |
| Integración (Java)    | Spring Boot Test       | ✅ Aprobadas   |
| Integración (API)     | Postman + Newman       | ✅ Aprobadas   |
| End-to-End (E2E)      | Cypress                | ✅ Aprobadas   |

Todas las pruebas fueron exitosas, incluyendo casos válidos, inválidos y errores esperados. La validación fue realizada contra la API REST y la interfaz gráfica.

---

## 🔧 Cómo ejecutar el proyecto localmente

### Requisitos
- Java 17
- Git
- MySQL o acceso a TiDB (opcional)
- Navegador web

### 1. Clonar repositorios

#### Backend:
```bash
git clone https://github.com/[ORGANIZACION]/erp-backend.git
cd erp-backend
./mvnw spring-boot:run
```

#### Frontend:
```bash
git clone https://github.com/[ORGANIZACION]/erp-frontend.git
cd erp-frontend
# Abrir el archivo index.html directamente en el navegador
```

> ⚠️ Asegurate de configurar correctamente la URL del backend en los scripts JS si se ejecuta localmente.

---

## ✅ Funcionalidades Principales

- ✔️ Autenticación de usuarios (Firebase)
- ✔️ Registro de productos
- ✔️ Edición y eliminación
- ✔️ Filtrado por nombre o marca
- ✔️ Validación de campos obligatorios
- ✔️ Consumo de API REST desde el frontend

---

## 📂 Estructura del Repositorio

**Frontend** → [ERP Frontend GitHub](https://github.com/[ORGANIZACION]/erp-frontend)  
**Backend** → [ERP Backend GitHub](https://github.com/[ORGANIZACION]/erp-backend)

Ambos repos cuentan con documentación, código modular y buenas prácticas de organización.

---

## 🧠 Equipo de Desarrollo

- Iriel Moro
- Jazmín Aliaga
- Abigail Lucero
- Michael Huaman

---


