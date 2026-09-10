declare global {
  namespace Cypress {
    interface Chainable {
      searchGifs(query: string): Chainable<void>;
      interceptGiphySearch(alias?: string): Chainable<null>;
    }
  }
}

const GIPHY_SEARCH_URL = '**/v1/gifs/search*';

Cypress.Commands.add('searchGifs', (query: string) => {
  cy.get('[data-cy=search-input]').clear().type(query);
  cy.get('[data-cy=search-submit]').click();
});

Cypress.Commands.add('interceptGiphySearch', (alias = 'giphySearch') => {
  cy.intercept('GET', GIPHY_SEARCH_URL, (req) => {
    const query = String(req.query['q'] ?? '');
    const offset = String(req.query['offset'] ?? '0');

    if (query.includes('empty')) {
      req.reply({ fixture: 'giphy-empty.json' });
      return;
    }

    if (query.includes('fail')) {
      req.reply({ statusCode: 500, body: { message: 'Server error' } });
      return;
    }

    req.reply({
      fixture: offset === '25' ? 'giphy-page-2.json' : 'giphy-page-1.json',
    });
  }).as(alias);
});

export {};
