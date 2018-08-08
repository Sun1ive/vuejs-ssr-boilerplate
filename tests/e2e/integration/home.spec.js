describe('Display home page', () => {
  it('should display title', () => {
    cy.visit('/home');
    cy.screenshot();
  });
});