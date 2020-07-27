import { element, by, ElementFinder } from 'protractor';

export class PickupRequestComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-pickup-request div table .btn-danger'));
  title = element.all(by.css('jhi-pickup-request div h2#page-heading span')).first();
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

export class PickupRequestUpdatePage {
  pageTitle = element(by.id('jhi-pickup-request-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  pickupDateInput = element(by.id('field_pickupDate'));
  pickupTimeInput = element(by.id('field_pickupTime'));
  reasonInput = element(by.id('field_reason'));
  approvalStatusInput = element(by.id('field_approvalStatus'));

  studentSelect = element(by.id('field_student'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setPickupDateInput(pickupDate: string): Promise<void> {
    await this.pickupDateInput.sendKeys(pickupDate);
  }

  async getPickupDateInput(): Promise<string> {
    return await this.pickupDateInput.getAttribute('value');
  }

  async setPickupTimeInput(pickupTime: string): Promise<void> {
    await this.pickupTimeInput.sendKeys(pickupTime);
  }

  async getPickupTimeInput(): Promise<string> {
    return await this.pickupTimeInput.getAttribute('value');
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

export class PickupRequestDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-pickupRequest-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-pickupRequest'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
