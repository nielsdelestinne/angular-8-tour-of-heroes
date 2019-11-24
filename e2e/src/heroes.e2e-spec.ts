import {HeroesPage} from './pages/heroes.po';
import {browser, logging} from 'protractor';

describe('Heroes', () => {

  let heroesPage: HeroesPage;

  beforeEach(() => heroesPage = new HeroesPage().navigateTo());

  it('should show the hero\'s title after being selected', () => {
    heroesPage
      .selectHero(11)
      .expectSelectedHeroToBeShown('DR NICE (11)');
  });

  it('should should show newly created hero as last item of overview list', () => {
    heroesPage
      .insertHeroNameToCreate('Daddyman')
      .clickCreateHeroButton()
      .expectCreatedHeroVisibleInList('Daddyman');
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });

});
