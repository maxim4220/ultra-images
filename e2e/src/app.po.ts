import {browser, by, element, protractor} from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  getTitleText() {
    return element(by.css('app-root h1')).getText() as Promise<string>;
  }

  getSearchInput() {
    return element(by.id('search'));
  }

  triggerSearchWithEnter() {
    return browser.actions().sendKeys(protractor.Key.ENTER).perform();
  }

  getImageElements() {
    return element.all(by.css('.ap-image'));
  }

  scrollDown() {
    return browser.actions().mouseMove(this.getPaginationContainer()).perform();
  }

  getPaginationContainer() {
    return element(by.className('pagination'));
  }

  currentPaginationPage() {
    return element(by.className('page-item active'));
  }

  clickPaginationSecondPage() {
    return element(by.id('next-page')).click();
  }

  getNotFoundBlock() {
    return element(by.id('ap-not-found-block'));
  }

}
