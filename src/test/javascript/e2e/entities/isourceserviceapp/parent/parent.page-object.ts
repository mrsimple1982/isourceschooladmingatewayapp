import { element, by, ElementFinder } from 'protractor';

export class ParentComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-parent div table .btn-danger'));
  title = element.all(by.css('jhi-parent div h2#page-heading span')).first();
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

export class ParentUpdatePage {
  pageTitle = element(by.id('jhi-parent-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  nameInput = element(by.id('field_name'));
  dateOfBirthInput = element(by.id('field_dateOfBirth'));
  parentMobileNumberInput = element(by.id('field_parentMobileNumber'));
  parentEmailInput = element(by.id('field_parentEmail'));
  approvalStatusInput = element(by.id('field_approvalStatus'));
  studentIdInput = element(by.id('field_studentId'));

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

  getApprovalStatusInput(): ElementFinder {
    return this.approvalStatusInput;
  }

  async setStudentIdInput(studentId: string): Promise<void> {
    await this.studentIdInput.sendKeys(studentId);
  }

  async getStudentIdInput(): Promise<string> {
    return await this.studentIdInput.getAttribute('value');
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

export class ParentDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-parent-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-parent'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
