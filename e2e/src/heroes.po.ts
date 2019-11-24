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
      .toEqual('Welcome to the Heroes overview');
  }

  selectHero(heroId: number) {
    browser.findElement(by.id(`hero-id-${heroId}`)).click();
    return this;
  }

  expectSelectedHeroToBeShown(heroName: string) {
    expect(browser.findElement(by.id('hero-detail-title')).getText())
      .toContain(heroName);
  }

}
