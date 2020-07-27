import { element, by, ElementFinder } from 'protractor';

export class BusEventsComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-bus-events div table .btn-danger'));
  title = element.all(by.css('jhi-bus-events div h2#page-heading span')).first();
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

export class BusEventsUpdatePage {
  pageTitle = element(by.id('jhi-bus-events-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  eventTypeInput = element(by.id('field_eventType'));
  eventDateInput = element(by.id('field_eventDate'));
  eventStatusSelect = element(by.id('field_eventStatus'));

  busRouteSelect = element(by.id('field_busRoute'));

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

export class BusEventsDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-busEvents-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-busEvents'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
