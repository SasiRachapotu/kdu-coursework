import React from 'react'
import Item from './Item'
import { Provider } from 'react-redux'
import { store } from '../../redux/store'

describe('<Item />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <Provider store={store}>
    <Item listItem={{id:"1234",text:"hello",checked:false}}/>
    </Provider>
    )
    cy.get(".item").should("exist").and("be.visible");
    cy.get(".item-content").should("exist").and("be.visible").and("have.text","hello")
    cy.get("#checkbox").should("exist").and("be.visible");
    cy.get("#delete-btn").should("exist").and("be.visible");
  })
})