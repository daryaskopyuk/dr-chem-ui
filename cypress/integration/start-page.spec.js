/// <reference types="cypress" />

import App from '../page-objects/app';

context('Start Page', function () {
  beforeEach(function () {
    cy.visit('/');
  });

  it('should display DataRobot logo and repo link', function () {
    cy.get(App.selectors.appLogo).should('exist');
    cy.get(App.selectors.appLink).should('exist');
  });
});
