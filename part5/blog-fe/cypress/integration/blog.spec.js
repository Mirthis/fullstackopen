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

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'John', password: 'password' })
    })

    it('A blog can be created', function () {
      cy.contains('create new blog').click()
      cy.get('input[name="title"]').type('Blog created durign e2e testing')
      cy.get('input[name="author"]').type('robot')
      cy.get('input[name="url"]').type('http://e2e.test.me')
      cy.get('#create-blog-submit').click()
      cy.contains('Blog created durign e2e testing robot')
    })
  })
})
