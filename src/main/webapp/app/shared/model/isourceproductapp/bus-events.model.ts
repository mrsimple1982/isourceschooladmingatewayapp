import { Moment } from 'moment';
import { IBusRoute } from 'app/shared/model/isourceproductapp/bus-route.model';
import { BusRouteEventStatus } from 'app/shared/model/enumerations/bus-route-event-status.model';

export interface IBusEvents {
  id?: number;
  eventType?: string;
  eventDate?: Moment;
  eventStatus?: BusRouteEventStatus;
  busRoute?: IBusRoute;
}

export class BusEvents implements IBusEvents {
  constructor(
    public id?: number,
    public eventType?: string,
    public eventDate?: Moment,
    public eventStatus?: BusRouteEventStatus,
    public busRoute?: IBusRoute
  ) {}
}
