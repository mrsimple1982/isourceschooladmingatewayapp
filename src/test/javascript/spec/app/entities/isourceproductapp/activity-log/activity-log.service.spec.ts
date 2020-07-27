import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { ActivityLogService } from 'app/entities/isourceproductapp/activity-log/activity-log.service';
import { IActivityLog, ActivityLog } from 'app/shared/model/isourceproductapp/activity-log.model';

describe('Service Tests', () => {
  describe('ActivityLog Service', () => {
    let injector: TestBed;
    let service: ActivityLogService;
    let httpMock: HttpTestingController;
    let elemDefault: IActivityLog;
    let expectedResult: IActivityLog | IActivityLog[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(ActivityLogService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new ActivityLog(0, 'AAAAAAA', currentDate, 'AAAAAAA', 'image/png', 'AAAAAAA', 'AAAAAAA');
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            activityDate: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a ActivityLog', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            activityDate: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            activityDate: currentDate,
          },
          returnedFromService
        );

        service.create(new ActivityLog()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a ActivityLog', () => {
        const returnedFromService = Object.assign(
          {
            activityType: 'BBBBBB',
            activityDate: currentDate.format(DATE_TIME_FORMAT),
            faculty: 'BBBBBB',
            images: 'BBBBBB',
            comment: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            activityDate: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of ActivityLog', () => {
        const returnedFromService = Object.assign(
          {
            activityType: 'BBBBBB',
            activityDate: currentDate.format(DATE_TIME_FORMAT),
            faculty: 'BBBBBB',
            images: 'BBBBBB',
            comment: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            activityDate: currentDate,
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a ActivityLog', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
