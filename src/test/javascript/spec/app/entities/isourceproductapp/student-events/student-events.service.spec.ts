import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { StudentEventsService } from 'app/entities/isourceproductapp/student-events/student-events.service';
import { IStudentEvents, StudentEvents } from 'app/shared/model/isourceproductapp/student-events.model';
import { StudentEventStatus } from 'app/shared/model/enumerations/student-event-status.model';

describe('Service Tests', () => {
  describe('StudentEvents Service', () => {
    let injector: TestBed;
    let service: StudentEventsService;
    let httpMock: HttpTestingController;
    let elemDefault: IStudentEvents;
    let expectedResult: IStudentEvents | IStudentEvents[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(StudentEventsService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new StudentEvents(0, 'AAAAAAA', currentDate, StudentEventStatus.PLANNED);
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

      it('should create a StudentEvents', () => {
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

        service.create(new StudentEvents()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a StudentEvents', () => {
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

      it('should return a list of StudentEvents', () => {
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

      it('should delete a StudentEvents', () => {
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
