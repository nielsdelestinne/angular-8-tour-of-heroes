import { browser, by, element } from 'protractor';
import {Page} from './page';

export class DashboardPage implements Page<DashboardPage> {
  navigateTo(): DashboardPage {
    browser.get('');
    this.assertOnPage();
    return this;
  }

  assertOnPage() {
    expect(browser.findElement(by.id('dashboard-title')).getText())
      .toEqual('Top Heroes');
  }

}
