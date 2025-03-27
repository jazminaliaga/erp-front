// Funciones CRUD
async function createEmployee(employee) {
    await handleRequest(apiUrl, "POST", employee);
    await fetchEmployees();
    document.getElementById("employeeForm").reset();
}

async function fetchEmployees() {
    try {
        const employees = await handleRequest(apiUrl, "GET");
        renderEmployeeTable(employees);
    } catch (error) {
        console.error("Error al cargar empleados:", error);
    }
}

function renderEmployeeTable(employees) {
    const tableBody = document.getElementById("employeeTable");
    tableBody.innerHTML = employees.map(employee => `
        <tr>
            <td>${employee.id}</td>
            <td>${employee.nombre}</td>
            <td>${employee.apellido}</td>
            <td>${employee.dni}</td>
            <td>${employee.email}</td>
            <td>${employee.telefono}</td>
            <td>
                <button onclick="editEmployee(${employee.id})" class="btn btn-secondary btn-sm">Editar</button>
                <button onclick="confirmDelete(${employee.id})" class="btn btn-danger btn-sm">Eliminar</button>
            </td>
        </tr>
    `).join("");
}

async function updateEmployee(id, employee) {
    await handleRequest(`${apiUrl}/${id}`, "PUT", employee);
    await fetchEmployees();
    document.getElementById("employeeForm").reset();
    document.getElementById("employeeId").value = "";
}

// Manejador del formulario
document.getElementById("employeeForm").addEventListener("submit", async function (e) {
    e.preventDefault();
    
    const employeeId = document.getElementById("employeeId").value;
    const employee = {
        nombre: document.getElementById("nombre").value,
        apellido: document.getElementById("apellido").value,
        dni: document.getElementById("dni").value,
        email: document.getElementById("email").value,
        telefono: document.getElementById("telefono").value,
        usuario: document.getElementById("usuario").value,
        contrasena: document.getElementById("contrasena").value,
    };
    
    try {
        if (employeeId) {
            await updateEmployee(employeeId, employee);
        } else {
            await createEmployee(employee);
        }
    } catch (error) {
        console.error("Error al guardar empleado:", error);
    }
});
