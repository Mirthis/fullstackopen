describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'John Adams',
      username: 'John',
      password: 'password',
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)

    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.get('#login-form')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      // ...
      cy.get('input[name="Username"]').type('John')
      cy.get('input[name="Password"]').type('password')
      cy.get('#login-submit').click()
      cy.contains('John Adams logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('input[name="Username"]').type('John')
      cy.get('input[name="Password"]').type('wrongpassword')
      cy.get('#login-submit').click()
      cy.contains('Wrong username or password')
    })
  })
})
