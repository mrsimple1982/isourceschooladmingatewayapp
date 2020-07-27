import { Moment } from 'moment';
import { IBusRoute } from 'app/shared/model/isourceproductapp/bus-route.model';
import { IStudentEvents } from 'app/shared/model/isourceproductapp/student-events.model';
import { IPickupRequest } from 'app/shared/model/isourceproductapp/pickup-request.model';
import { IAbsenceRequest } from 'app/shared/model/isourceproductapp/absence-request.model';
import { StudentStatus } from 'app/shared/model/enumerations/student-status.model';

export interface IStudent {
  id?: number;
  name?: string;
  dateOfBirth?: Moment;
  studentDivision?: string;
  classTeacher?: string;
  address?: string;
  status?: StudentStatus;
  parentMobileNumber?: string;
  parentEmail?: string;
  busStop?: string;
  busRoute?: IBusRoute;
  studentEvents?: IStudentEvents[];
  pickupRequest?: IPickupRequest;
  absenceRequest?: IAbsenceRequest;
}

export class Student implements IStudent {
  constructor(
    public id?: number,
    public name?: string,
    public dateOfBirth?: Moment,
    public studentDivision?: string,
    public classTeacher?: string,
    public address?: string,
    public status?: StudentStatus,
    public parentMobileNumber?: string,
    public parentEmail?: string,
    public busStop?: string,
    public busRoute?: IBusRoute,
    public studentEvents?: IStudentEvents[],
    public pickupRequest?: IPickupRequest,
    public absenceRequest?: IAbsenceRequest
  ) {}
}
