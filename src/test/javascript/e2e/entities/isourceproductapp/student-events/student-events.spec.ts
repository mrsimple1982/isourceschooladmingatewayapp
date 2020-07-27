import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { StudentEventsComponentsPage, StudentEventsDeleteDialog, StudentEventsUpdatePage } from './student-events.page-object';

const expect = chai.expect;

describe('StudentEvents e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let studentEventsComponentsPage: StudentEventsComponentsPage;
  let studentEventsUpdatePage: StudentEventsUpdatePage;
  let studentEventsDeleteDialog: StudentEventsDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load StudentEvents', async () => {
    await navBarPage.goToEntity('student-events');
    studentEventsComponentsPage = new StudentEventsComponentsPage();
    await browser.wait(ec.visibilityOf(studentEventsComponentsPage.title), 5000);
    expect(await studentEventsComponentsPage.getTitle()).to.eq('isourceschooladmingatewayappApp.isourceproductappStudentEvents.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(studentEventsComponentsPage.entities), ec.visibilityOf(studentEventsComponentsPage.noResult)),
      1000
    );
  });

  it('should load create StudentEvents page', async () => {
    await studentEventsComponentsPage.clickOnCreateButton();
    studentEventsUpdatePage = new StudentEventsUpdatePage();
    expect(await studentEventsUpdatePage.getPageTitle()).to.eq(
      'isourceschooladmingatewayappApp.isourceproductappStudentEvents.home.createOrEditLabel'
    );
    await studentEventsUpdatePage.cancel();
  });

  it('should create and save StudentEvents', async () => {
    const nbButtonsBeforeCreate = await studentEventsComponentsPage.countDeleteButtons();

    await studentEventsComponentsPage.clickOnCreateButton();

    await promise.all([
      studentEventsUpdatePage.setEventTypeInput('eventType'),
      studentEventsUpdatePage.setEventDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      studentEventsUpdatePage.eventStatusSelectLastOption(),
      studentEventsUpdatePage.studentSelectLastOption(),
    ]);

    expect(await studentEventsUpdatePage.getEventTypeInput()).to.eq('eventType', 'Expected EventType value to be equals to eventType');
    expect(await studentEventsUpdatePage.getEventDateInput()).to.contain(
      '2001-01-01T02:30',
      'Expected eventDate value to be equals to 2000-12-31'
    );

    await studentEventsUpdatePage.save();
    expect(await studentEventsUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await studentEventsComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last StudentEvents', async () => {
    const nbButtonsBeforeDelete = await studentEventsComponentsPage.countDeleteButtons();
    await studentEventsComponentsPage.clickOnLastDeleteButton();

    studentEventsDeleteDialog = new StudentEventsDeleteDialog();
    expect(await studentEventsDeleteDialog.getDialogTitle()).to.eq(
      'isourceschooladmingatewayappApp.isourceproductappStudentEvents.delete.question'
    );
    await studentEventsDeleteDialog.clickOnConfirmButton();

    expect(await studentEventsComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
