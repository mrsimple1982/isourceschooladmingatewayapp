import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { BusRouteComponentsPage, BusRouteDeleteDialog, BusRouteUpdatePage } from './bus-route.page-object';

const expect = chai.expect;

describe('BusRoute e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let busRouteComponentsPage: BusRouteComponentsPage;
  let busRouteUpdatePage: BusRouteUpdatePage;
  let busRouteDeleteDialog: BusRouteDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load BusRoutes', async () => {
    await navBarPage.goToEntity('bus-route');
    busRouteComponentsPage = new BusRouteComponentsPage();
    await browser.wait(ec.visibilityOf(busRouteComponentsPage.title), 5000);
    expect(await busRouteComponentsPage.getTitle()).to.eq('isourceschooladmingatewayappApp.isourceproductappBusRoute.home.title');
    await browser.wait(ec.or(ec.visibilityOf(busRouteComponentsPage.entities), ec.visibilityOf(busRouteComponentsPage.noResult)), 1000);
  });

  it('should load create BusRoute page', async () => {
    await busRouteComponentsPage.clickOnCreateButton();
    busRouteUpdatePage = new BusRouteUpdatePage();
    expect(await busRouteUpdatePage.getPageTitle()).to.eq(
      'isourceschooladmingatewayappApp.isourceproductappBusRoute.home.createOrEditLabel'
    );
    await busRouteUpdatePage.cancel();
  });

  it('should create and save BusRoutes', async () => {
    const nbButtonsBeforeCreate = await busRouteComponentsPage.countDeleteButtons();

    await busRouteComponentsPage.clickOnCreateButton();

    await promise.all([
      busRouteUpdatePage.setRouteNameInput('routeName'),
      busRouteUpdatePage.setDriverInput('driver'),
      busRouteUpdatePage.setMonitorInput('monitor'),
      busRouteUpdatePage.setDeviceIdInput('deviceId'),
      busRouteUpdatePage.setRouteStateInput('routeState'),
      busRouteUpdatePage.statusSelectLastOption(),
    ]);

    expect(await busRouteUpdatePage.getRouteNameInput()).to.eq('routeName', 'Expected RouteName value to be equals to routeName');
    expect(await busRouteUpdatePage.getDriverInput()).to.eq('driver', 'Expected Driver value to be equals to driver');
    expect(await busRouteUpdatePage.getMonitorInput()).to.eq('monitor', 'Expected Monitor value to be equals to monitor');
    expect(await busRouteUpdatePage.getDeviceIdInput()).to.eq('deviceId', 'Expected DeviceId value to be equals to deviceId');
    expect(await busRouteUpdatePage.getRouteStateInput()).to.eq('routeState', 'Expected RouteState value to be equals to routeState');

    await busRouteUpdatePage.save();
    expect(await busRouteUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await busRouteComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last BusRoute', async () => {
    const nbButtonsBeforeDelete = await busRouteComponentsPage.countDeleteButtons();
    await busRouteComponentsPage.clickOnLastDeleteButton();

    busRouteDeleteDialog = new BusRouteDeleteDialog();
    expect(await busRouteDeleteDialog.getDialogTitle()).to.eq('isourceschooladmingatewayappApp.isourceproductappBusRoute.delete.question');
    await busRouteDeleteDialog.clickOnConfirmButton();

    expect(await busRouteComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
