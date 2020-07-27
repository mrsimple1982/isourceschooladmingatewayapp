import { element, by, ElementFinder } from 'protractor';

export class BusRouteComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-bus-route div table .btn-danger'));
  title = element.all(by.css('jhi-bus-route div h2#page-heading span')).first();
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

export class BusRouteUpdatePage {
  pageTitle = element(by.id('jhi-bus-route-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  routeNameInput = element(by.id('field_routeName'));
  driverInput = element(by.id('field_driver'));
  monitorInput = element(by.id('field_monitor'));
  deviceIdInput = element(by.id('field_deviceId'));
  routeStateInput = element(by.id('field_routeState'));
  statusSelect = element(by.id('field_status'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setRouteNameInput(routeName: string): Promise<void> {
    await this.routeNameInput.sendKeys(routeName);
  }

  async getRouteNameInput(): Promise<string> {
    return await this.routeNameInput.getAttribute('value');
  }

  async setDriverInput(driver: string): Promise<void> {
    await this.driverInput.sendKeys(driver);
  }

  async getDriverInput(): Promise<string> {
    return await this.driverInput.getAttribute('value');
  }

  async setMonitorInput(monitor: string): Promise<void> {
    await this.monitorInput.sendKeys(monitor);
  }

  async getMonitorInput(): Promise<string> {
    return await this.monitorInput.getAttribute('value');
  }

  async setDeviceIdInput(deviceId: string): Promise<void> {
    await this.deviceIdInput.sendKeys(deviceId);
  }

  async getDeviceIdInput(): Promise<string> {
    return await this.deviceIdInput.getAttribute('value');
  }

  async setRouteStateInput(routeState: string): Promise<void> {
    await this.routeStateInput.sendKeys(routeState);
  }

  async getRouteStateInput(): Promise<string> {
    return await this.routeStateInput.getAttribute('value');
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

export class BusRouteDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-busRoute-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-busRoute'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
