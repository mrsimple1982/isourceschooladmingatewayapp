import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { ActivityLogComponentsPage, ActivityLogDeleteDialog, ActivityLogUpdatePage } from './activity-log.page-object';
import * as path from 'path';

const expect = chai.expect;

describe('ActivityLog e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let activityLogComponentsPage: ActivityLogComponentsPage;
  let activityLogUpdatePage: ActivityLogUpdatePage;
  let activityLogDeleteDialog: ActivityLogDeleteDialog;
  const fileNameToUpload = 'logo-jhipster.png';
  const fileToUpload = '../../../../../../../src/main/webapp/content/images/' + fileNameToUpload;
  const absolutePath = path.resolve(__dirname, fileToUpload);

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load ActivityLogs', async () => {
    await navBarPage.goToEntity('activity-log');
    activityLogComponentsPage = new ActivityLogComponentsPage();
    await browser.wait(ec.visibilityOf(activityLogComponentsPage.title), 5000);
    expect(await activityLogComponentsPage.getTitle()).to.eq('isourceschooladmingatewayappApp.isourceproductappActivityLog.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(activityLogComponentsPage.entities), ec.visibilityOf(activityLogComponentsPage.noResult)),
      1000
    );
  });

  it('should load create ActivityLog page', async () => {
    await activityLogComponentsPage.clickOnCreateButton();
    activityLogUpdatePage = new ActivityLogUpdatePage();
    expect(await activityLogUpdatePage.getPageTitle()).to.eq(
      'isourceschooladmingatewayappApp.isourceproductappActivityLog.home.createOrEditLabel'
    );
    await activityLogUpdatePage.cancel();
  });

  it('should create and save ActivityLogs', async () => {
    const nbButtonsBeforeCreate = await activityLogComponentsPage.countDeleteButtons();

    await activityLogComponentsPage.clickOnCreateButton();

    await promise.all([
      activityLogUpdatePage.setActivityTypeInput('activityType'),
      activityLogUpdatePage.setActivityDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      activityLogUpdatePage.setFacultyInput('faculty'),
      activityLogUpdatePage.setImagesInput(absolutePath),
      activityLogUpdatePage.setCommentInput('comment'),
    ]);

    expect(await activityLogUpdatePage.getActivityTypeInput()).to.eq(
      'activityType',
      'Expected ActivityType value to be equals to activityType'
    );
    expect(await activityLogUpdatePage.getActivityDateInput()).to.contain(
      '2001-01-01T02:30',
      'Expected activityDate value to be equals to 2000-12-31'
    );
    expect(await activityLogUpdatePage.getFacultyInput()).to.eq('faculty', 'Expected Faculty value to be equals to faculty');
    expect(await activityLogUpdatePage.getImagesInput()).to.endsWith(
      fileNameToUpload,
      'Expected Images value to be end with ' + fileNameToUpload
    );
    expect(await activityLogUpdatePage.getCommentInput()).to.eq('comment', 'Expected Comment value to be equals to comment');

    await activityLogUpdatePage.save();
    expect(await activityLogUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await activityLogComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last ActivityLog', async () => {
    const nbButtonsBeforeDelete = await activityLogComponentsPage.countDeleteButtons();
    await activityLogComponentsPage.clickOnLastDeleteButton();

    activityLogDeleteDialog = new ActivityLogDeleteDialog();
    expect(await activityLogDeleteDialog.getDialogTitle()).to.eq(
      'isourceschooladmingatewayappApp.isourceproductappActivityLog.delete.question'
    );
    await activityLogDeleteDialog.clickOnConfirmButton();

    expect(await activityLogComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
