import { IBusEvents } from 'app/shared/model/isourceproductapp/bus-events.model';
import { IStudent } from 'app/shared/model/isourceproductapp/student.model';
import { BusRouteStatus } from 'app/shared/model/enumerations/bus-route-status.model';

export interface IBusRoute {
  id?: number;
  routeName?: string;
  driver?: string;
  monitor?: string;
  deviceId?: string;
  routeState?: string;
  status?: BusRouteStatus;
  busEvents?: IBusEvents[];
  student?: IStudent;
}

export class BusRoute implements IBusRoute {
  constructor(
    public id?: number,
    public routeName?: string,
    public driver?: string,
    public monitor?: string,
    public deviceId?: string,
    public routeState?: string,
    public status?: BusRouteStatus,
    public busEvents?: IBusEvents[],
    public student?: IStudent
  ) {}
}
