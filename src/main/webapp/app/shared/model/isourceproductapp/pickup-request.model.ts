import { Moment } from 'moment';
import { IStudent } from 'app/shared/model/isourceproductapp/student.model';

export interface IPickupRequest {
  id?: number;
  pickupDate?: Moment;
  pickupTime?: Moment;
  reason?: string;
  approvalStatus?: boolean;
  student?: IStudent;
}

export class PickupRequest implements IPickupRequest {
  constructor(
    public id?: number,
    public pickupDate?: Moment,
    public pickupTime?: Moment,
    public reason?: string,
    public approvalStatus?: boolean,
    public student?: IStudent
  ) {
    this.approvalStatus = this.approvalStatus || false;
  }
}
