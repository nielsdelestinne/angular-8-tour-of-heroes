import {Page} from './page';
import {browser, by} from 'protractor';

export class HeroesPage implements Page<HeroesPage> {

  navigateTo(): HeroesPage {
    browser.get('heroes');
    this.assertOnPage();
    return this;
  }

  assertOnPage() {
    expect(browser.findElement(by.id('heroes-overview-title')).getText())
      .toEqual('Heroes overview');
  }

  selectHero(heroId: number) {
    browser.findElement(by.id(`hero-item-id-${heroId}`)).click();
    return this;
  }

  insertHeroNameToCreate(name: string) {
    browser.findElement(by.id('name-for-hero')).sendKeys(name);
    return this;
  }

  clickCreateHeroButton() {
    browser.findElement(by.id('create-hero-button')).click();
    return this;
  }

  expectCreatedHeroVisibleInList(heroName: string) {
    expect(browser.element.all(by.css('#heroes-overview ul li'))
      .last().getText())
      .toContain(heroName);
  }

  expectSelectedHeroToBeShown(heroName: string) {
    expect(browser.findElement(by.id('hero-detail-title')).getText())
      .toEqual('Hero detail');
    expect(browser.findElement(by.css('#hero-detail-component h4')).getText())
      .toEqual(heroName);
    return this;
  }

}
