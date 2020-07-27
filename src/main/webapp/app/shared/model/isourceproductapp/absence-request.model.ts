import { Moment } from 'moment';
import { IStudent } from 'app/shared/model/isourceproductapp/student.model';

export interface IAbsenceRequest {
  id?: number;
  absenceDate?: Moment;
  reason?: string;
  approvalStatus?: boolean;
  student?: IStudent;
}

export class AbsenceRequest implements IAbsenceRequest {
  constructor(
    public id?: number,
    public absenceDate?: Moment,
    public reason?: string,
    public approvalStatus?: boolean,
    public student?: IStudent
  ) {
    this.approvalStatus = this.approvalStatus || false;
  }
}
