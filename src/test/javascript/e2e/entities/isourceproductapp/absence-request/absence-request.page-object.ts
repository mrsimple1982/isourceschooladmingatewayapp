import { element, by, ElementFinder } from 'protractor';

export class AbsenceRequestComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-absence-request div table .btn-danger'));
  title = element.all(by.css('jhi-absence-request div h2#page-heading span')).first();
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

export class AbsenceRequestUpdatePage {
  pageTitle = element(by.id('jhi-absence-request-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  absenceDateInput = element(by.id('field_absenceDate'));
  reasonInput = element(by.id('field_reason'));
  approvalStatusInput = element(by.id('field_approvalStatus'));

  studentSelect = element(by.id('field_student'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setAbsenceDateInput(absenceDate: string): Promise<void> {
    await this.absenceDateInput.sendKeys(absenceDate);
  }

  async getAbsenceDateInput(): Promise<string> {
    return await this.absenceDateInput.getAttribute('value');
  }

  async setReasonInput(reason: string): Promise<void> {
    await this.reasonInput.sendKeys(reason);
  }

  async getReasonInput(): Promise<string> {
    return await this.reasonInput.getAttribute('value');
  }

  getApprovalStatusInput(): ElementFinder {
    return this.approvalStatusInput;
  }

  async studentSelectLastOption(): Promise<void> {
    await this.studentSelect.all(by.tagName('option')).last().click();
  }

  async studentSelectOption(option: string): Promise<void> {
    await this.studentSelect.sendKeys(option);
  }

  getStudentSelect(): ElementFinder {
    return this.studentSelect;
  }

  async getStudentSelectedOption(): Promise<string> {
    return await this.studentSelect.element(by.css('option:checked')).getText();
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

export class AbsenceRequestDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-absenceRequest-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-absenceRequest'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
