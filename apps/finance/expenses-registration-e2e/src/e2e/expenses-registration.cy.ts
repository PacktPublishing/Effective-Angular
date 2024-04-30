import { showHideSummaryBtn, summaryIsShwon } from '../support/expenses-overview.po';


describe('finance-expenses-registration', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/api/expenses', { fixture: 'expenses.json' }).as('getExpenses');
    cy.visit('');
    cy.wait('@getExpenses');
  });

  it('should redirect to the expenses-overview page when we load the root application route', () => {
    cy.url().should('equal', 'http://localhost:4200/expenses-overview');
  });

  it('should toggle the summary and adjust the button text', () => {
    summaryIsShwon(false);
    showHideSummaryBtn().click();
    summaryIsShwon(true);
    showHideSummaryBtn().click();
    summaryIsShwon(false);
  });
});
