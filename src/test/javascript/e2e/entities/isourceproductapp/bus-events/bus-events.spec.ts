import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { BusEventsComponentsPage, BusEventsDeleteDialog, BusEventsUpdatePage } from './bus-events.page-object';

const expect = chai.expect;

describe('BusEvents e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let busEventsComponentsPage: BusEventsComponentsPage;
  let busEventsUpdatePage: BusEventsUpdatePage;
  let busEventsDeleteDialog: BusEventsDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load BusEvents', async () => {
    await navBarPage.goToEntity('bus-events');
    busEventsComponentsPage = new BusEventsComponentsPage();
    await browser.wait(ec.visibilityOf(busEventsComponentsPage.title), 5000);
    expect(await busEventsComponentsPage.getTitle()).to.eq('isourceschooladmingatewayappApp.isourceproductappBusEvents.home.title');
    await browser.wait(ec.or(ec.visibilityOf(busEventsComponentsPage.entities), ec.visibilityOf(busEventsComponentsPage.noResult)), 1000);
  });

  it('should load create BusEvents page', async () => {
    await busEventsComponentsPage.clickOnCreateButton();
    busEventsUpdatePage = new BusEventsUpdatePage();
    expect(await busEventsUpdatePage.getPageTitle()).to.eq(
      'isourceschooladmingatewayappApp.isourceproductappBusEvents.home.createOrEditLabel'
    );
    await busEventsUpdatePage.cancel();
  });

  it('should create and save BusEvents', async () => {
    const nbButtonsBeforeCreate = await busEventsComponentsPage.countDeleteButtons();

    await busEventsComponentsPage.clickOnCreateButton();

    await promise.all([
      busEventsUpdatePage.setEventTypeInput('eventType'),
      busEventsUpdatePage.setEventDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      busEventsUpdatePage.eventStatusSelectLastOption(),
      busEventsUpdatePage.busRouteSelectLastOption(),
    ]);

    expect(await busEventsUpdatePage.getEventTypeInput()).to.eq('eventType', 'Expected EventType value to be equals to eventType');
    expect(await busEventsUpdatePage.getEventDateInput()).to.contain(
      '2001-01-01T02:30',
      'Expected eventDate value to be equals to 2000-12-31'
    );

    await busEventsUpdatePage.save();
    expect(await busEventsUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await busEventsComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last BusEvents', async () => {
    const nbButtonsBeforeDelete = await busEventsComponentsPage.countDeleteButtons();
    await busEventsComponentsPage.clickOnLastDeleteButton();

    busEventsDeleteDialog = new BusEventsDeleteDialog();
    expect(await busEventsDeleteDialog.getDialogTitle()).to.eq(
      'isourceschooladmingatewayappApp.isourceproductappBusEvents.delete.question'
    );
    await busEventsDeleteDialog.clickOnConfirmButton();

    expect(await busEventsComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
