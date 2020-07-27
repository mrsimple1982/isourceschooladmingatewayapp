import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { ParentComponentsPage, ParentDeleteDialog, ParentUpdatePage } from './parent.page-object';

const expect = chai.expect;

describe('Parent e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let parentComponentsPage: ParentComponentsPage;
  let parentUpdatePage: ParentUpdatePage;
  let parentDeleteDialog: ParentDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Parents', async () => {
    await navBarPage.goToEntity('parent');
    parentComponentsPage = new ParentComponentsPage();
    await browser.wait(ec.visibilityOf(parentComponentsPage.title), 5000);
    expect(await parentComponentsPage.getTitle()).to.eq('isourceschooladmingatewayappApp.isourceserviceappParent.home.title');
    await browser.wait(ec.or(ec.visibilityOf(parentComponentsPage.entities), ec.visibilityOf(parentComponentsPage.noResult)), 1000);
  });

  it('should load create Parent page', async () => {
    await parentComponentsPage.clickOnCreateButton();
    parentUpdatePage = new ParentUpdatePage();
    expect(await parentUpdatePage.getPageTitle()).to.eq('isourceschooladmingatewayappApp.isourceserviceappParent.home.createOrEditLabel');
    await parentUpdatePage.cancel();
  });

  it('should create and save Parents', async () => {
    const nbButtonsBeforeCreate = await parentComponentsPage.countDeleteButtons();

    await parentComponentsPage.clickOnCreateButton();

    await promise.all([
      parentUpdatePage.setNameInput('name'),
      parentUpdatePage.setDateOfBirthInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      parentUpdatePage.setParentMobileNumberInput('parentMobileNumber'),
      parentUpdatePage.setParentEmailInput('parentEmail'),
      parentUpdatePage.setStudentIdInput('studentId'),
    ]);

    expect(await parentUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');
    expect(await parentUpdatePage.getDateOfBirthInput()).to.contain(
      '2001-01-01T02:30',
      'Expected dateOfBirth value to be equals to 2000-12-31'
    );
    expect(await parentUpdatePage.getParentMobileNumberInput()).to.eq(
      'parentMobileNumber',
      'Expected ParentMobileNumber value to be equals to parentMobileNumber'
    );
    expect(await parentUpdatePage.getParentEmailInput()).to.eq('parentEmail', 'Expected ParentEmail value to be equals to parentEmail');
    const selectedApprovalStatus = parentUpdatePage.getApprovalStatusInput();
    if (await selectedApprovalStatus.isSelected()) {
      await parentUpdatePage.getApprovalStatusInput().click();
      expect(await parentUpdatePage.getApprovalStatusInput().isSelected(), 'Expected approvalStatus not to be selected').to.be.false;
    } else {
      await parentUpdatePage.getApprovalStatusInput().click();
      expect(await parentUpdatePage.getApprovalStatusInput().isSelected(), 'Expected approvalStatus to be selected').to.be.true;
    }
    expect(await parentUpdatePage.getStudentIdInput()).to.eq('studentId', 'Expected StudentId value to be equals to studentId');

    await parentUpdatePage.save();
    expect(await parentUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await parentComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Parent', async () => {
    const nbButtonsBeforeDelete = await parentComponentsPage.countDeleteButtons();
    await parentComponentsPage.clickOnLastDeleteButton();

    parentDeleteDialog = new ParentDeleteDialog();
    expect(await parentDeleteDialog.getDialogTitle()).to.eq('isourceschooladmingatewayappApp.isourceserviceappParent.delete.question');
    await parentDeleteDialog.clickOnConfirmButton();

    expect(await parentComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
