import {browser, logging} from 'protractor';
import {HeroesPage} from './pages/heroes.po';
import {DashboardPage} from './pages/dashboard.po';

describe('workspace-project App', () => {

  let dashboardPage: DashboardPage;

  beforeEach(() => dashboardPage = new HeroesPage().navigateTo());

  it('should show the dashboard with the correct title', () => {
    dashboardPage.assertOnPage();
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });

});
