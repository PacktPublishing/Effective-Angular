export const showHideSummaryBtn = () => cy.get('[data-test-id="show-summary-btn"]');
export const summaryValue = () => cy.get('[data-test-id="summary"]')

export function summaryIsShwon(isShown: boolean) {
  showHideSummaryBtn().should('contain', isShown ? 'Hide summary' : 'Show summary');
  summaryValue().should(isShown ? 'exist' : 'not.exist');
}

