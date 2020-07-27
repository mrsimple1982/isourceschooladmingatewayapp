import { Moment } from 'moment';

export interface IActivityLog {
  id?: number;
  activityType?: string;
  activityDate?: Moment;
  faculty?: string;
  imagesContentType?: string;
  images?: any;
  comment?: string;
}

export class ActivityLog implements IActivityLog {
  constructor(
    public id?: number,
    public activityType?: string,
    public activityDate?: Moment,
    public faculty?: string,
    public imagesContentType?: string,
    public images?: any,
    public comment?: string
  ) {}
}
