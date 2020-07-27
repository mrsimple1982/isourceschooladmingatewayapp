import { element, by, ElementFinder } from 'protractor';

export class ActivityLogComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-activity-log div table .btn-danger'));
  title = element.all(by.css('jhi-activity-log div h2#page-heading span')).first();
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

export class ActivityLogUpdatePage {
  pageTitle = element(by.id('jhi-activity-log-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  activityTypeInput = element(by.id('field_activityType'));
  activityDateInput = element(by.id('field_activityDate'));
  facultyInput = element(by.id('field_faculty'));
  imagesInput = element(by.id('file_images'));
  commentInput = element(by.id('field_comment'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setActivityTypeInput(activityType: string): Promise<void> {
    await this.activityTypeInput.sendKeys(activityType);
  }

  async getActivityTypeInput(): Promise<string> {
    return await this.activityTypeInput.getAttribute('value');
  }

  async setActivityDateInput(activityDate: string): Promise<void> {
    await this.activityDateInput.sendKeys(activityDate);
  }

  async getActivityDateInput(): Promise<string> {
    return await this.activityDateInput.getAttribute('value');
  }

  async setFacultyInput(faculty: string): Promise<void> {
    await this.facultyInput.sendKeys(faculty);
  }

  async getFacultyInput(): Promise<string> {
    return await this.facultyInput.getAttribute('value');
  }

  async setImagesInput(images: string): Promise<void> {
    await this.imagesInput.sendKeys(images);
  }

  async getImagesInput(): Promise<string> {
    return await this.imagesInput.getAttribute('value');
  }

  async setCommentInput(comment: string): Promise<void> {
    await this.commentInput.sendKeys(comment);
  }

  async getCommentInput(): Promise<string> {
    return await this.commentInput.getAttribute('value');
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

export class ActivityLogDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-activityLog-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-activityLog'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
