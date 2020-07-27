import { Moment } from 'moment';
import { IStudent } from 'app/shared/model/isourceproductapp/student.model';
import { StudentEventStatus } from 'app/shared/model/enumerations/student-event-status.model';

export interface IStudentEvents {
  id?: number;
  eventType?: string;
  eventDate?: Moment;
  eventStatus?: StudentEventStatus;
  student?: IStudent;
}

export class StudentEvents implements IStudentEvents {
  constructor(
    public id?: number,
    public eventType?: string,
    public eventDate?: Moment,
    public eventStatus?: StudentEventStatus,
    public student?: IStudent
  ) {}
}
