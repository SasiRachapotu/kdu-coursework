import React from "react";
import Header from "./Header";
import { Provider } from "react-redux";
import { store } from "../../redux/store";

describe("<Header />", () => {
  it("Renders Header", () => {
    // see: https://on.cypress.io/mounting-react
    cy.viewport(1076,876)
    cy.mount(
      <Provider store={store}>
        <Header />
      </Provider>
    );
    cy.get('.heading').should('exist').and('have.text','Item lister').and('be.visible');
    const searchText = 'Testing the search bar';
    cy.get('#search-item').type(searchText);
    cy.get('#search-item').should('have.value', searchText).and('be.visible');
  });
});
