import {HeroesPage} from './heroes.po';

describe('Heroes', () => {

  let heroesPage;

  beforeEach(() => heroesPage = new HeroesPage().navigateTo());

  it('should show the hero\'s title after being selected', () => {
    heroesPage
      .selectHero(11)
      .expectSelectedHeroToBeShown('DR NICE');
  });

});
