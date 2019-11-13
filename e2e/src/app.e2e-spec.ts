import {AppPage} from './app.po';
import {browser, logging} from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getTitleText()).toEqual('Welcome to giphy search page!');
  });

  it('should be able to enter the text to search input and see images as a result that will display 25 images by default', () => {
    page.getSearchInput().sendKeys('cat');
    page.triggerSearchWithEnter();
    expect(page.getImageElements()).toBeTruthy();
    expect(page.getImageElements().count()).toBe(25);
    browser.sleep(3000); // just to see in slower action. 
  });

  it('should scroll down and see the pagination with current page of 1', () => {
    page.scrollDown();
    const currentPage = page.currentPaginationPage();
    expect(currentPage).toBeTruthy();
    expect(currentPage.getText()).toBe('1');
    browser.sleep(3000); // just to see in slower action.
  });

  it('should click second page pagination button and see new images, new current page must be 2', () => {
    page.clickPaginationSecondPage();
    page.scrollDown();
    expect(page.currentPaginationPage().getText()).toBe('2');
    browser.sleep(3000); // just to see in slower action.
  });

  it('should enter a new search that is wrong and instead of images - not found message will be shown.', () => {
    page.getSearchInput().clear();
    browser.sleep(1000); // just to see in slower action.
    page.getSearchInput().sendKeys('weghegwjiewgweggwegevwegtrsjstrjdtyk');
    page.triggerSearchWithEnter();
    expect(page.getNotFoundBlock().getText()).toContain('We\'re Sorry!');
    browser.sleep(3000); // just to see in slower action.
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
