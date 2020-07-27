import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { PickupRequestComponentsPage, PickupRequestDeleteDialog, PickupRequestUpdatePage } from './pickup-request.page-object';

const expect = chai.expect;

describe('PickupRequest e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let pickupRequestComponentsPage: PickupRequestComponentsPage;
  let pickupRequestUpdatePage: PickupRequestUpdatePage;
  let pickupRequestDeleteDialog: PickupRequestDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load PickupRequests', async () => {
    await navBarPage.goToEntity('pickup-request');
    pickupRequestComponentsPage = new PickupRequestComponentsPage();
    await browser.wait(ec.visibilityOf(pickupRequestComponentsPage.title), 5000);
    expect(await pickupRequestComponentsPage.getTitle()).to.eq('isourceschooladmingatewayappApp.isourceproductappPickupRequest.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(pickupRequestComponentsPage.entities), ec.visibilityOf(pickupRequestComponentsPage.noResult)),
      1000
    );
  });

  it('should load create PickupRequest page', async () => {
    await pickupRequestComponentsPage.clickOnCreateButton();
    pickupRequestUpdatePage = new PickupRequestUpdatePage();
    expect(await pickupRequestUpdatePage.getPageTitle()).to.eq(
      'isourceschooladmingatewayappApp.isourceproductappPickupRequest.home.createOrEditLabel'
    );
    await pickupRequestUpdatePage.cancel();
  });

  it('should create and save PickupRequests', async () => {
    const nbButtonsBeforeCreate = await pickupRequestComponentsPage.countDeleteButtons();

    await pickupRequestComponentsPage.clickOnCreateButton();

    await promise.all([
      pickupRequestUpdatePage.setPickupDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      pickupRequestUpdatePage.setPickupTimeInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      pickupRequestUpdatePage.setReasonInput('reason'),
      pickupRequestUpdatePage.studentSelectLastOption(),
    ]);

    expect(await pickupRequestUpdatePage.getPickupDateInput()).to.contain(
      '2001-01-01T02:30',
      'Expected pickupDate value to be equals to 2000-12-31'
    );
    expect(await pickupRequestUpdatePage.getPickupTimeInput()).to.contain(
      '2001-01-01T02:30',
      'Expected pickupTime value to be equals to 2000-12-31'
    );
    expect(await pickupRequestUpdatePage.getReasonInput()).to.eq('reason', 'Expected Reason value to be equals to reason');
    const selectedApprovalStatus = pickupRequestUpdatePage.getApprovalStatusInput();
    if (await selectedApprovalStatus.isSelected()) {
      await pickupRequestUpdatePage.getApprovalStatusInput().click();
      expect(await pickupRequestUpdatePage.getApprovalStatusInput().isSelected(), 'Expected approvalStatus not to be selected').to.be.false;
    } else {
      await pickupRequestUpdatePage.getApprovalStatusInput().click();
      expect(await pickupRequestUpdatePage.getApprovalStatusInput().isSelected(), 'Expected approvalStatus to be selected').to.be.true;
    }

    await pickupRequestUpdatePage.save();
    expect(await pickupRequestUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await pickupRequestComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last PickupRequest', async () => {
    const nbButtonsBeforeDelete = await pickupRequestComponentsPage.countDeleteButtons();
    await pickupRequestComponentsPage.clickOnLastDeleteButton();

    pickupRequestDeleteDialog = new PickupRequestDeleteDialog();
    expect(await pickupRequestDeleteDialog.getDialogTitle()).to.eq(
      'isourceschooladmingatewayappApp.isourceproductappPickupRequest.delete.question'
    );
    await pickupRequestDeleteDialog.clickOnConfirmButton();

    expect(await pickupRequestComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
