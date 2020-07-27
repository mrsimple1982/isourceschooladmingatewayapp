import { element, by, ElementFinder } from 'protractor';

export class StudentComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-student div table .btn-danger'));
  title = element.all(by.css('jhi-student div h2#page-heading span')).first();
  noResult = element(by.id('no-result'));
  entities = element(by.id('entities'));

  async clickOnCreateButton(): Promise<void> {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(): Promise<void> {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons(): Promise<number> {
    return this.deleteButtons.count();
  }

  async getTitle(): Promise<string> {
    return this.title.getAttribute('jhiTranslate');
  }
}

export class StudentUpdatePage {
  pageTitle = element(by.id('jhi-student-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  nameInput = element(by.id('field_name'));
  dateOfBirthInput = element(by.id('field_dateOfBirth'));
  studentDivisionInput = element(by.id('field_studentDivision'));
  classTeacherInput = element(by.id('field_classTeacher'));
  addressInput = element(by.id('field_address'));
  statusSelect = element(by.id('field_status'));
  parentMobileNumberInput = element(by.id('field_parentMobileNumber'));
  parentEmailInput = element(by.id('field_parentEmail'));
  busStopInput = element(by.id('field_busStop'));

  busRouteSelect = element(by.id('field_busRoute'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setNameInput(name: string): Promise<void> {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput(): Promise<string> {
    return await this.nameInput.getAttribute('value');
  }

  async setDateOfBirthInput(dateOfBirth: string): Promise<void> {
    await this.dateOfBirthInput.sendKeys(dateOfBirth);
  }

  async getDateOfBirthInput(): Promise<string> {
    return await this.dateOfBirthInput.getAttribute('value');
  }

  async setStudentDivisionInput(studentDivision: string): Promise<void> {
    await this.studentDivisionInput.sendKeys(studentDivision);
  }

  async getStudentDivisionInput(): Promise<string> {
    return await this.studentDivisionInput.getAttribute('value');
  }

  async setClassTeacherInput(classTeacher: string): Promise<void> {
    await this.classTeacherInput.sendKeys(classTeacher);
  }

  async getClassTeacherInput(): Promise<string> {
    return await this.classTeacherInput.getAttribute('value');
  }

  async setAddressInput(address: string): Promise<void> {
    await this.addressInput.sendKeys(address);
  }

  async getAddressInput(): Promise<string> {
    return await this.addressInput.getAttribute('value');
  }

  async setStatusSelect(status: string): Promise<void> {
    await this.statusSelect.sendKeys(status);
  }

  async getStatusSelect(): Promise<string> {
    return await this.statusSelect.element(by.css('option:checked')).getText();
  }

  async statusSelectLastOption(): Promise<void> {
    await this.statusSelect.all(by.tagName('option')).last().click();
  }

  async setParentMobileNumberInput(parentMobileNumber: string): Promise<void> {
    await this.parentMobileNumberInput.sendKeys(parentMobileNumber);
  }

  async getParentMobileNumberInput(): Promise<string> {
    return await this.parentMobileNumberInput.getAttribute('value');
  }

  async setParentEmailInput(parentEmail: string): Promise<void> {
    await this.parentEmailInput.sendKeys(parentEmail);
  }

  async getParentEmailInput(): Promise<string> {
    return await this.parentEmailInput.getAttribute('value');
  }

  async setBusStopInput(busStop: string): Promise<void> {
    await this.busStopInput.sendKeys(busStop);
  }

  async getBusStopInput(): Promise<string> {
    return await this.busStopInput.getAttribute('value');
  }

  async busRouteSelectLastOption(): Promise<void> {
    await this.busRouteSelect.all(by.tagName('option')).last().click();
  }

  async busRouteSelectOption(option: string): Promise<void> {
    await this.busRouteSelect.sendKeys(option);
  }

  getBusRouteSelect(): ElementFinder {
    return this.busRouteSelect;
  }

  async getBusRouteSelectedOption(): Promise<string> {
    return await this.busRouteSelect.element(by.css('option:checked')).getText();
  }

  async save(): Promise<void> {
    await this.saveButton.click();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class StudentDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-student-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-student'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
