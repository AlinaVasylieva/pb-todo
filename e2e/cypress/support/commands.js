Cypress.Commands.add('createTodos', (data = 'todos') => {
    cy.fixture(data)
        .each(todo => {
            cy.get('.new-todo')
                .type(todo.name)
                .type('{enter}')
        })
})

Cypress.Commands.add('completeFirstTodo', (data = 'todos') => {
    cy.fixture(data)
    cy.get('.todo-list li')
        .first()
        .as('first-todo')

    cy.get('@first-todo')
        .find('.toggle')
        .click()
})