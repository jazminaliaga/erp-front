describe('Gestión de Stock - ERP', () => {
  beforeEach(() => {
    // Cambiá esta URL si tu app corre en otro puerto o ruta
    cy.visit('http://127.0.0.1:5500/pages/control.html');
  });

  it('Debería cargar correctamente el formulario de carga', () => {
    cy.get('form#productForm').should('exist');
    cy.get('#nombre').should('be.visible');
    cy.get('#marca').should('be.visible');
    cy.get('#cantidad').should('be.visible');
    cy.get('#descripcion').should('be.visible');
    cy.get('#precio').should('be.visible');
  });

  it('Debería permitir ingresar un nuevo producto y mostrarlo en la tabla', () => {
    const nombre = 'Alfajor';
    const marca = 'Aguila';
    const cantidad = 24;
    const descripcion = 'Alfajor triple';
    const precio = 800;

    // Llenar el formulario
    cy.get('#nombre').type(nombre);
    cy.get('#marca').type(marca);
    cy.get('#cantidad').type(cantidad);
    cy.get('#descripcion').type(descripcion);
    cy.get('#precio').type(precio);

    // Enviar el formulario
    cy.get('form#productForm').submit();

    // Validar que se muestre en la tabla
    cy.get('#productTable')
      .should('contain', nombre)
      .and('contain', marca)
      .and('contain', cantidad)
      .and('contain', precio);
  });

  it('No debería permitir guardar si falta un campo obligatorio', () => {

    // Completar todos excepto el nombre
    cy.get('#marca').type('Gomitas');
    cy.get('#cantidad').type(12);
    cy.get('#descripcion').type('Moritas');
    cy.get('#precio').type(1350);

    // Intentar enviar
    cy.get('form#productForm').submit();

    // Asegurar que no se agregó a la tabla
    cy.get('#productTable').should('not.contain', 'Gomitas');
  });

  it('Debería filtrar productos por nombre o marca', () => {

    // Agregar un producto único
    const nombre = 'Chocolate';
    const marca = 'Arcor';

    cy.get('#nombre').type(nombre);
    cy.get('#marca').type(marca);
    cy.get('#cantidad').type(15);
    cy.get('#descripcion').type('Air');
    cy.get('#precio').type(2200);
    cy.get('form#productForm').submit();

    // Esperar a que aparezca (solo si el guardado es asincrónico)
    cy.wait(500); // opcional

    // Filtrar por nombre
    cy.get('#filterNombre').select(nombre);
    cy.get('#productTable').should('contain', nombre);

    // Filtrar por marca
    cy.get('#filterMarca').select(marca);
    cy.get('#productTable').should('contain', marca);
  });

});
