describe('Todo list filters', () => {
    beforeEach(() =>{
        cy.visit('/')
    })

    context('List has a single todo', () => {
        it('States a todo as singular', () =>{
           cy.get('.new-todo')
             .type('Watch a tutorial')
             .type('{enter}')
            cy.get('.todo-count')
              .should('contain', '1 item left')
        })

    context('List has multiple todos', () => {
        beforeEach(() =>{
          cy.createTodos()
          cy.completeFirstTodo()
        })
  
        it('Filters the todo list', () => {
          const filters = [
              { link: 'Active', expectedLength: 3},
              { link: 'Completed', expectedLength: 1},
              { link: 'All', expectedLength: 4},
          ]
          cy.wrap(filters)
            .each(filter => {
                cy.contains(filter.link)
                .click()
                cy.get('.todo-list li')
                .should('have.length', filter.expectedLength)
            })
        })
    })
})
});
