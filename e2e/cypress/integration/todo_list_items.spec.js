describe('Todo list actions', () => {
    const TODO_LIST = '.todo-list li'
    
    beforeEach(() => {
        cy.visit('/')
        cy.createTodos()
    })
    it('Creates new todos', () => {
        cy.get(TODO_LIST)
            .should('have.length', 4)
    })

    it('Completes active todo', () => {
        cy.completeFirstTodo()

        cy.get(TODO_LIST)
            .first()
            .as('first-todo')

        cy.get('@first-todo')
            .find('.toggle')
            .should('be.checked')

        cy.get('@first-todo')
            .should('have.class', 'completed')

        cy.get('.todo-count')
            .should('contain', 3)
    })
})
