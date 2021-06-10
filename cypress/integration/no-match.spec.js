/// <reference types="cypress" />

import NoMatch from '../page-objects/no-match';
import App from '../page-objects/app';

context('Error Page', function () {
  beforeEach(function () {
    cy.visit('/non-existing-page');
  });

  it('should display PowerOutageImage and Home link', function () {
    cy.get(NoMatch.selectors.powerOutageImage).should('exist');
    cy.get(NoMatch.selectors.homeLink).should('exist');
  });

  it('should navigate to / after click on home button', function () {
    cy.url().should('include', '/non-existing-page');
    cy.get(NoMatch.selectors.homeLink).click();
    cy.url().should('not.include', '/non-existing-page');

    cy.get(App.selectors.appLogo).should('exist');
  });
});
