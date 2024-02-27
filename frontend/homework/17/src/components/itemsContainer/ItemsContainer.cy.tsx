import React from 'react'
import { ItemsContainer } from './ItemsContainer'
import { Provider } from 'react-redux'
import { store } from '../../redux/store'

describe('<ItemsContainer />', () => {
  it('renders items container', () => {
    // see: https://on.cypress.io/mounting-react
    cy.viewport(1076,876)
    cy.mount(<Provider store={store}><ItemsContainer /></Provider>)

    cy.get(".items-header-item").should("exist").should('have.text',"Add Items").and('be.visible');

    cy.get("#items-input").should("exist").and("be.visible")
    cy.get("#submit-btn").should("exist").should('be.disabled').and('be.visible')
    cy.get("#items-input").type("Test todo 1")
    cy.get("#submit-btn").should("exist").and('be.visible')

    cy.get(".sub-items-heading").should("exist").should("have.text","Items").and("be.visible")

    cy.get("#remove-checked").should("exist").should("have.text","Remove checked items").and("be.visible");

  })
})