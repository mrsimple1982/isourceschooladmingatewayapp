import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { AbsenceRequestComponentsPage, AbsenceRequestDeleteDialog, AbsenceRequestUpdatePage } from './absence-request.page-object';

const expect = chai.expect;

describe('AbsenceRequest e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let absenceRequestComponentsPage: AbsenceRequestComponentsPage;
  let absenceRequestUpdatePage: AbsenceRequestUpdatePage;
  let absenceRequestDeleteDialog: AbsenceRequestDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load AbsenceRequests', async () => {
    await navBarPage.goToEntity('absence-request');
    absenceRequestComponentsPage = new AbsenceRequestComponentsPage();
    await browser.wait(ec.visibilityOf(absenceRequestComponentsPage.title), 5000);
    expect(await absenceRequestComponentsPage.getTitle()).to.eq(
      'isourceschooladmingatewayappApp.isourceproductappAbsenceRequest.home.title'
    );
    await browser.wait(
      ec.or(ec.visibilityOf(absenceRequestComponentsPage.entities), ec.visibilityOf(absenceRequestComponentsPage.noResult)),
      1000
    );
  });

  it('should load create AbsenceRequest page', async () => {
    await absenceRequestComponentsPage.clickOnCreateButton();
    absenceRequestUpdatePage = new AbsenceRequestUpdatePage();
    expect(await absenceRequestUpdatePage.getPageTitle()).to.eq(
      'isourceschooladmingatewayappApp.isourceproductappAbsenceRequest.home.createOrEditLabel'
    );
    await absenceRequestUpdatePage.cancel();
  });

  it('should create and save AbsenceRequests', async () => {
    const nbButtonsBeforeCreate = await absenceRequestComponentsPage.countDeleteButtons();

    await absenceRequestComponentsPage.clickOnCreateButton();

    await promise.all([
      absenceRequestUpdatePage.setAbsenceDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      absenceRequestUpdatePage.setReasonInput('reason'),
      absenceRequestUpdatePage.studentSelectLastOption(),
    ]);

    expect(await absenceRequestUpdatePage.getAbsenceDateInput()).to.contain(
      '2001-01-01T02:30',
      'Expected absenceDate value to be equals to 2000-12-31'
    );
    expect(await absenceRequestUpdatePage.getReasonInput()).to.eq('reason', 'Expected Reason value to be equals to reason');
    const selectedApprovalStatus = absenceRequestUpdatePage.getApprovalStatusInput();
    if (await selectedApprovalStatus.isSelected()) {
      await absenceRequestUpdatePage.getApprovalStatusInput().click();
      expect(await absenceRequestUpdatePage.getApprovalStatusInput().isSelected(), 'Expected approvalStatus not to be selected').to.be
        .false;
    } else {
      await absenceRequestUpdatePage.getApprovalStatusInput().click();
      expect(await absenceRequestUpdatePage.getApprovalStatusInput().isSelected(), 'Expected approvalStatus to be selected').to.be.true;
    }

    await absenceRequestUpdatePage.save();
    expect(await absenceRequestUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await absenceRequestComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last AbsenceRequest', async () => {
    const nbButtonsBeforeDelete = await absenceRequestComponentsPage.countDeleteButtons();
    await absenceRequestComponentsPage.clickOnLastDeleteButton();

    absenceRequestDeleteDialog = new AbsenceRequestDeleteDialog();
    expect(await absenceRequestDeleteDialog.getDialogTitle()).to.eq(
      'isourceschooladmingatewayappApp.isourceproductappAbsenceRequest.delete.question'
    );
    await absenceRequestDeleteDialog.clickOnConfirmButton();

    expect(await absenceRequestComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
