describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:5173/')

    // testing the header for search bar and header name
    cy.get('.heading').should('exist').and('have.text','Item lister').and('be.visible');
    const searchText = 'Testing the search bar';

    // typing in search bar and testing
    cy.get('#search-item').type(searchText);
    cy.get('#search-item').should('have.value', searchText).and('be.visible');
    cy.get('#search-item').clear();

    // checking sub heading of Add Items
    cy.get(".items-header-item").should("exist").should('have.text',"Add Items").and('be.visible');


    // test the ui with items heading
    cy.get(".sub-items-heading").should("exist").should("have.text","Items").and("be.visible")

    // Add item input and submit button
    cy.get("#items-input").should("exist").and("be.visible")
    cy.get("#submit-btn").should("exist").should('be.disabled').and('be.visible')

    // typing in input bar
    cy.get("#items-input").type("Test todo 1")
    cy.get("#submit-btn").should("exist").and('be.visible')

    // submit to add new item
    cy.get("#submit-btn").should("exist").and('be.visible').click();


    // checking ui of the added item
    cy.get(".item").should("exist").and("be.visible");
    cy.get(".item-content").should("exist").and("be.visible").and("have.text","Test todo 1")

    cy.get("#checkbox").should("exist").and("be.visible");
    cy.get("#delete-btn").should("exist").and("be.visible");


    // add more items
    // typing in input bar
    cy.get("#items-input").type("Test todo 2")
    cy.get("#submit-btn").should("exist").and('be.visible')

    // submit to add new item
    cy.get("#submit-btn").should("exist").and('be.visible').click();


    // typing in input bar
    cy.get("#items-input").type("Test todo 3")
    cy.get("#submit-btn").should("exist").and('be.visible')

    // submit to add new item
    cy.get("#submit-btn").should("exist").and('be.visible').click();


    // checking if all items are there
    cy.get('.item').should('have.length', 3);

    cy.get('.item').contains('Test todo 3').should('exist');
    cy.get('.item').contains('Test todo 2').should('exist');
    cy.get('.item').contains('Test todo 1').should('exist');

    // typing in search bar and testing
    // checking search functionality
    cy.get('#search-item').type("Todo 1");
    cy.get('.item').contains('Test todo 1').should('exist');
    cy.get('.item').should("have.length",1);
    
    cy.get('#search-item').clear();

    cy.get('#search-item').type("Todo 3");
    cy.get('.item').contains('Test todo 3').should('exist');
    cy.get('.item').should("have.length",1);
    cy.get('#search-item').clear();


    // deleting individual element
    cy.get('.checkbox').eq(0).click();
    cy.get('.checkbox').eq(1).click();

    cy.get('.item-content-strike').eq(0).should('have.css', 'text-decoration', 'line-through 3px solid rgb(0, 0, 0)');
    cy.get('.item-content-strike').eq(1).should('have.css', 'text-decoration', 'line-through 3px solid rgb(0, 0, 0)');

    // test the ui for remove checked button
    cy.get("#remove-checked").should("exist").should("have.text","Remove checked items").and("be.visible");
    
    // remove using delete button
    cy.get("#remove-checked").click();
    cy.get('.item').contains('Test todo 1').should('not.exist');
    cy.get('.item').contains('Test todo 2').should('not.exist');

    // no items left
    cy.get(".delete").click()
    cy.get('.no-items-left').should('exist').and("have.text","No items left in todo")

    // search an item not present
    cy.get('#search-item').type("Todo 1");
    cy.get('.no-items-found').should('exist').and("have.text","No items found")
    cy.get('#search-item').clear();

  })
})