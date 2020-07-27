import { element, by, ElementFinder } from 'protractor';

export class StudentEventsComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-student-events div table .btn-danger'));
  title = element.all(by.css('jhi-student-events div h2#page-heading span')).first();
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

export class StudentEventsUpdatePage {
  pageTitle = element(by.id('jhi-student-events-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  eventTypeInput = element(by.id('field_eventType'));
  eventDateInput = element(by.id('field_eventDate'));
  eventStatusSelect = element(by.id('field_eventStatus'));

  studentSelect = element(by.id('field_student'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setEventTypeInput(eventType: string): Promise<void> {
    await this.eventTypeInput.sendKeys(eventType);
  }

  async getEventTypeInput(): Promise<string> {
    return await this.eventTypeInput.getAttribute('value');
  }

  async setEventDateInput(eventDate: string): Promise<void> {
    await this.eventDateInput.sendKeys(eventDate);
  }

  async getEventDateInput(): Promise<string> {
    return await this.eventDateInput.getAttribute('value');
  }

  async setEventStatusSelect(eventStatus: string): Promise<void> {
    await this.eventStatusSelect.sendKeys(eventStatus);
  }

  async getEventStatusSelect(): Promise<string> {
    return await this.eventStatusSelect.element(by.css('option:checked')).getText();
  }

  async eventStatusSelectLastOption(): Promise<void> {
    await this.eventStatusSelect.all(by.tagName('option')).last().click();
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

export class StudentEventsDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-studentEvents-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-studentEvents'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
