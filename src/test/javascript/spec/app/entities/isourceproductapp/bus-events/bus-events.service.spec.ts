import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { BusEventsService } from 'app/entities/isourceproductapp/bus-events/bus-events.service';
import { IBusEvents, BusEvents } from 'app/shared/model/isourceproductapp/bus-events.model';
import { BusRouteEventStatus } from 'app/shared/model/enumerations/bus-route-event-status.model';

describe('Service Tests', () => {
  describe('BusEvents Service', () => {
    let injector: TestBed;
    let service: BusEventsService;
    let httpMock: HttpTestingController;
    let elemDefault: IBusEvents;
    let expectedResult: IBusEvents | IBusEvents[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(BusEventsService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new BusEvents(0, 'AAAAAAA', currentDate, BusRouteEventStatus.PLANNED);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            eventDate: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a BusEvents', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            eventDate: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            eventDate: currentDate,
          },
          returnedFromService
        );

        service.create(new BusEvents()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a BusEvents', () => {
        const returnedFromService = Object.assign(
          {
            eventType: 'BBBBBB',
            eventDate: currentDate.format(DATE_TIME_FORMAT),
            eventStatus: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            eventDate: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of BusEvents', () => {
        const returnedFromService = Object.assign(
          {
            eventType: 'BBBBBB',
            eventDate: currentDate.format(DATE_TIME_FORMAT),
            eventStatus: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            eventDate: currentDate,
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a BusEvents', () => {
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
