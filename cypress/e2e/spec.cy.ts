describe('E2E Wiki app', () => {
  beforeEach(() => {
    // Load the page
    cy.visit('http://localhost:5173');
    cy.get('.ant-spin').should('not.exist');
  });

  it('User can change language and date and interact with content', () => {
    // Select new language
    cy.get('.ant-select-selector').first().click();
    cy.contains('.ant-select-item-option-content', 'Deutsch').click();
    // Wait until data loads
    cy.get('.ant-skeleton-content').should('not.exist');

    // Select new language date
    cy.get('.ant-picker-input').first().click();
    cy.get('.ant-picker-cell-in-view').first().click();
    // Wait until data loads
    cy.get('.ant-skeleton-content').should('not.exist');

    // Click on one of the cards
    cy.get('.ant-card-cover').first().click();
  });

  it('User can navigate app pages', () => {
    // Nivigate and assert you switched to image page
    cy.contains('.ant-menu-title-content', 'Image of the day').click();
    cy.get('.ant-skeleton-content').should('not.exist');
    cy.contains('h3', 'See below the most featured image of 2024/04/25!').should('exist');
    // Nivigate and assert you switched to single article page
    cy.contains('.ant-menu-title-content', 'Article of the day').click();
    cy.get('.ant-skeleton-content').should('not.exist');
    cy.contains('h3', 'See below the most featured article of 2024/04/25!').should('exist');
  });
});
