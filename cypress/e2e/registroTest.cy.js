const password = '12345' 
let username = 'test' + Math.random().toString(36).substring(2, 15);
let email = username + '@example.com'   
let date = new Date();
let formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;


describe('template spec', () => {
    it('register', () => {
      cy.visit('http://localhost:3000')
      cy.get('.bg-gray-400 > a').click()
      cy.get('#name').type('test name')
      cy.get('#lastaname').type('test lastname')
      cy.get('#username').type(username)
      cy.get('#email').type(email)
      cy.get('#date').type(formattedDate)
      cy.get('#password').type(password)
      cy.get('.flex > .w-full').click()
      cy.wait(2000)
      cy.get('.Toastify__toast-body > :nth-child(2)').should('contain', 'Registro exitoso')
    })

    it('login', () => {
        cy.visit('http://localhost:3000')
        cy.get('.border.mb-2').type(email)
        cy.get('.p-8 > .bg-white > .mb-4').type(password)
        cy.get('.bg-blue-400').click()
        cy.wait(2000)
        cy.get('.Toastify__toast-body > :nth-child(2)').should('contain', 'Bienvenido')
    })

    it('register existente', () => {
        cy.visit('http://localhost:3000')
        cy.get('.bg-gray-400 > a').click()
        cy.get('#name').type('test name')
        cy.get('#lastaname').type('test lastname')
        cy.get('#username').type('anfega@outlook.es')
        cy.get('#email').type(email)
        cy.get('#date').type(formattedDate)
        cy.get('#password').type(password)
        cy.get('.flex > .w-full').click()
        cy.wait(2000)
        cy.get('.Toastify__toast-body > :nth-child(2)').should('contain', 'Ya existe un usuario con el mismo username o email. Por favor, elige otro')
      })

      it('login Invalido', () => {
        cy.visit('http://localhost:3000')
        cy.get('.border.mb-2').type(email)
        cy.get('.p-8 > .bg-white > .mb-4').type('contraseña')
        cy.get('.bg-blue-400').click()
        cy.wait(2000)
        cy.get('.Toastify__toast-body > :nth-child(2)').should('contain', 'Correo o usuario incorrecto')
    })
  })