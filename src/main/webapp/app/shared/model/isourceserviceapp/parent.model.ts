import { Moment } from 'moment';

export interface IParent {
  id?: number;
  name?: string;
  dateOfBirth?: Moment;
  parentMobileNumber?: string;
  parentEmail?: string;
  approvalStatus?: boolean;
  studentId?: string;
}

export class Parent implements IParent {
  constructor(
    public id?: number,
    public name?: string,
    public dateOfBirth?: Moment,
    public parentMobileNumber?: string,
    public parentEmail?: string,
    public approvalStatus?: boolean,
    public studentId?: string
  ) {
    this.approvalStatus = this.approvalStatus || false;
  }
}
