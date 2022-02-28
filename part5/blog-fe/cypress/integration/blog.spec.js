describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'John Adams',
      username: 'John',
      password: 'password',
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)

    const user2 = {
      name: 'Jon Doe',
      username: 'JD',
      password: 'password',
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user2)

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

    describe('When blog exist', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'Test blog',
          author: 'robot',
          url: 'http://test.me',
        })
      })

      it('A blog can be liked', function () {
        cy.contains('view').click()
        cy.contains('like').click()
        cy.contains('likes: 1')
      })

      it('can be deleted by the owner', function () {
        cy.contains('view').click()
        cy.contains('Test blog robot')
        cy.contains('Remove').click()
        cy.on('window:confirm', () => true)
        cy.contains('Test blog robot').should('not.exist')
      })

      it.only('cannot be deleted by non-owner', function () {
        cy.login({ username: 'JD', password: 'password' })
        cy.contains('view').click()
        cy.contains('Test blog robot')
        cy.contains('Remove').should('not.exist')
      })
    })
  })
})
