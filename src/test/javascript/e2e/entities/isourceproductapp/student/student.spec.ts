import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import { StudentComponentsPage, StudentDeleteDialog, StudentUpdatePage } from './student.page-object';

const expect = chai.expect;

describe('Student e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let studentComponentsPage: StudentComponentsPage;
  let studentUpdatePage: StudentUpdatePage;
  let studentDeleteDialog: StudentDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Students', async () => {
    await navBarPage.goToEntity('student');
    studentComponentsPage = new StudentComponentsPage();
    await browser.wait(ec.visibilityOf(studentComponentsPage.title), 5000);
    expect(await studentComponentsPage.getTitle()).to.eq('isourceschooladmingatewayappApp.isourceproductappStudent.home.title');
    await browser.wait(ec.or(ec.visibilityOf(studentComponentsPage.entities), ec.visibilityOf(studentComponentsPage.noResult)), 1000);
  });

  it('should load create Student page', async () => {
    await studentComponentsPage.clickOnCreateButton();
    studentUpdatePage = new StudentUpdatePage();
    expect(await studentUpdatePage.getPageTitle()).to.eq('isourceschooladmingatewayappApp.isourceproductappStudent.home.createOrEditLabel');
    await studentUpdatePage.cancel();
  });

  it('should create and save Students', async () => {
    const nbButtonsBeforeCreate = await studentComponentsPage.countDeleteButtons();

    await studentComponentsPage.clickOnCreateButton();

    await promise.all([
      studentUpdatePage.setNameInput('name'),
      studentUpdatePage.setDateOfBirthInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      studentUpdatePage.setStudentDivisionInput('studentDivision'),
      studentUpdatePage.setClassTeacherInput('classTeacher'),
      studentUpdatePage.setAddressInput('address'),
      studentUpdatePage.statusSelectLastOption(),
      studentUpdatePage.setParentMobileNumberInput('parentMobileNumber'),
      studentUpdatePage.setParentEmailInput('parentEmail'),
      studentUpdatePage.setBusStopInput('busStop'),
      studentUpdatePage.busRouteSelectLastOption(),
    ]);

    expect(await studentUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');
    expect(await studentUpdatePage.getDateOfBirthInput()).to.contain(
      '2001-01-01T02:30',
      'Expected dateOfBirth value to be equals to 2000-12-31'
    );
    expect(await studentUpdatePage.getStudentDivisionInput()).to.eq(
      'studentDivision',
      'Expected StudentDivision value to be equals to studentDivision'
    );
    expect(await studentUpdatePage.getClassTeacherInput()).to.eq(
      'classTeacher',
      'Expected ClassTeacher value to be equals to classTeacher'
    );
    expect(await studentUpdatePage.getAddressInput()).to.eq('address', 'Expected Address value to be equals to address');
    expect(await studentUpdatePage.getParentMobileNumberInput()).to.eq(
      'parentMobileNumber',
      'Expected ParentMobileNumber value to be equals to parentMobileNumber'
    );
    expect(await studentUpdatePage.getParentEmailInput()).to.eq('parentEmail', 'Expected ParentEmail value to be equals to parentEmail');
    expect(await studentUpdatePage.getBusStopInput()).to.eq('busStop', 'Expected BusStop value to be equals to busStop');

    await studentUpdatePage.save();
    expect(await studentUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await studentComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Student', async () => {
    const nbButtonsBeforeDelete = await studentComponentsPage.countDeleteButtons();
    await studentComponentsPage.clickOnLastDeleteButton();

    studentDeleteDialog = new StudentDeleteDialog();
    expect(await studentDeleteDialog.getDialogTitle()).to.eq('isourceschooladmingatewayappApp.isourceproductappStudent.delete.question');
    await studentDeleteDialog.clickOnConfirmButton();

    expect(await studentComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
