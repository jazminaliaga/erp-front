const apiUrl = "https://erp-back-production.up.railway.app/api/productos"; 
let allProducts = [];

// Función auxiliar para manejar las solicitudes HTTP
async function handleRequest(url, method, body = null) {
    const options = {
        method,
        headers: {
            "Content-Type": "application/json",
        },
    };
    
    if (body) {
        options.body = JSON.stringify(body);
    }
    
    try {
        const response = await fetch(url, options);
        
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || `Error HTTP! estado: ${response.status}`);
        }
        
        return response.status !== 204 ? await response.json() : null;
    } catch (error) {
        console.error(`Error en la solicitud ${method} ${url}:`, error);
        alert(`Error: ${error.message}`);
        throw error;
    }
}

// Manejador del formulario
document.getElementById("productForm").addEventListener("submit", async function (e) {
    e.preventDefault();
    
    const productId = document.getElementById("productId").value;
    const product = {
        nombre: document.getElementById("nombre").value,
        cantidad: parseInt(document.getElementById("cantidad").value),
        marca: document.getElementById("marca").value,
        descripcion: document.getElementById("descripcion").value,
        precio: parseFloat(document.getElementById("precio").value),
    };
    
    try {
        if (productId) {
            await updateProduct(productId, product);
        } else {
            await createProduct(product);
        }
    } catch (error) {
        console.error("Error al procesar el formulario:", error);
    }
});

// Funciones CRUD
async function createProduct(product) {
    await handleRequest(apiUrl, "POST", product);
    await fetchProducts();
    document.getElementById("productForm").reset();
}

async function fetchProducts() {
    try {
        const products = await handleRequest(apiUrl, "GET");
        allProducts = products;
        renderProductTable(products);
        populateHeaderFilters(); // Agregado para poblar los filtros en los headers
    } catch (error) {
        console.error("Error al cargar productos:", error);
    }
}

// Filtro dinámico (selects en encabezados)
function populateHeaderFilters() {
    const nombreSelect = document.getElementById("filterNombre");
    const marcaSelect = document.getElementById("filterMarca");

    const nombres = [...new Set(allProducts.map(p => p.nombre))];
    const marcas = [...new Set(allProducts.map(p => p.marca))];

    nombreSelect.innerHTML = '<option value="">▼</option>';
    marcaSelect.innerHTML = '<option value="">▼</option>';

    nombres.forEach(nombre => {
        const option = document.createElement("option");
        option.value = nombre;
        option.textContent = nombre;
        nombreSelect.appendChild(option);
    });

    marcas.forEach(marca => {
        const option = document.createElement("option");
        option.value = marca;
        option.textContent = marca;
        marcaSelect.appendChild(option);
    });
}

function filterByColumn(type, value) {
    const filtered = allProducts.filter(product => {
        if (!value) return true;
        return product[type] === value;
    });
    renderProductTable(filtered);
}

// Tabla de productos
function renderProductTable(products) {
    const tableBody = document.getElementById("productTable");
    tableBody.innerHTML = products.map(product => `
        <tr>
            <td>${product.id}</td>
            <td>${product.nombre}</td>
            <td>${product.cantidad}</td>
            <td>${product.marca}</td>
            <td>${product.descripcion}</td>
            <td>${product.precio}</td>
            <td>
                <button onclick="editProduct(${product.id})" class="btn btn-secondary btn-sm">Editar</button>
                <button onclick="confirmDelete(${product.id})" class="btn btn-danger btn-sm">Eliminar</button>
            </td>
        </tr>
    `).join("");
}

// Actualizar producto
async function updateProduct(id, product) {
    await handleRequest(`${apiUrl}/${id}`, "PUT", product);
    await fetchProducts();
    document.getElementById("productForm").reset();
    document.getElementById("productId").value = "";
}

// Cargar datos en el formulario
async function editProduct(id) {
    try {
        const product = await handleRequest(`${apiUrl}/${id}`, "GET");
        document.getElementById("productId").value = product.id;
        document.getElementById("nombre").value = product.nombre;
        document.getElementById("cantidad").value = product.cantidad;
        document.getElementById("marca").value = product.marca;
        document.getElementById("descripcion").value = product.descripcion;
        document.getElementById("precio").value = product.precio;
    } catch (error) {
        console.error("Error al editar producto:", error);
    }
}

// Confirmar eliminación
async function confirmDelete(id) {
    if (confirm("¿Estás seguro de que deseas eliminar este producto?")) {
        try {
            await handleRequest(`${apiUrl}/${id}`, "DELETE");
            await fetchProducts();
        } catch (error) {
            console.error("Error al eliminar producto:", error);
        }
    }
}

// Inicialización
document.addEventListener("DOMContentLoaded", () => {
    fetchProducts();
});
