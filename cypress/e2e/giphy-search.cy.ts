describe('Giphy search', () => {
  beforeEach(() => {
    cy.interceptGiphySearch();
    cy.visit('/images');
  });

  it('redirects the root path to the search page', () => {
    cy.visit('/');
    cy.location('pathname').should('eq', '/images');
    cy.get('[data-cy=welcome-message]').should('be.visible');
    cy.get('[data-cy=search-submit]').should('be.disabled');
  });

  it('searches GIFs and paginates without calling the real API', () => {
    cy.searchGifs('cats');
    cy.wait('@giphySearch').then((interception) => {
      expect(interception.request.query['q']).to.eq('cats');
      expect(interception.request.query['offset']).to.eq('0');
    });

    cy.get('[data-cy=gif-image]').should('have.length', 2);
    cy.get('[data-cy=gif-image]').first().should('have.attr', 'src').and('include', 'page-one');
    cy.get('[data-cy=pagination-current]').invoke('text').should('match', /\s*1\s*/);
    cy.get('[data-cy=pagination-previous]').should('be.disabled');

    cy.get('[data-cy=pagination-next]').click();
    cy.wait('@giphySearch').its('request.query.offset').should('eq', '25');
    cy.get('[data-cy=gif-image]').first().should('have.attr', 'src').and('include', 'page-two');
    cy.get('[data-cy=pagination-current]').invoke('text').should('match', /\s*2\s*/);
    cy.get('[data-cy=pagination-next]').should('be.disabled');

    cy.get('[data-cy=pagination-previous]').click();
    cy.wait('@giphySearch').its('request.query.offset').should('eq', '0');
    cy.get('[data-cy=pagination-current]').invoke('text').should('match', /\s*1\s*/);
  });

  it('shows an empty state when nothing matches', () => {
    cy.searchGifs('empty-term');
    cy.wait('@giphySearch');

    cy.get('[data-cy=not-found]').should('be.visible');
    cy.get('[data-cy=pagination]').should('not.exist');
    cy.get('[data-cy=gif-image]').should('not.exist');
  });

  it('shows an error when the search request fails', () => {
    cy.searchGifs('fail-now');
    cy.wait('@giphySearch');

    cy.get('[data-cy=error-message]').should('contain.text', 'Unable to load images. Please try again.');
    cy.get('[data-cy=image-list]').should('not.exist');
  });
});
