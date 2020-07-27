import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { AbsenceRequestService } from 'app/entities/isourceproductapp/absence-request/absence-request.service';
import { IAbsenceRequest, AbsenceRequest } from 'app/shared/model/isourceproductapp/absence-request.model';

describe('Service Tests', () => {
  describe('AbsenceRequest Service', () => {
    let injector: TestBed;
    let service: AbsenceRequestService;
    let httpMock: HttpTestingController;
    let elemDefault: IAbsenceRequest;
    let expectedResult: IAbsenceRequest | IAbsenceRequest[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(AbsenceRequestService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new AbsenceRequest(0, currentDate, 'AAAAAAA', false);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            absenceDate: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a AbsenceRequest', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            absenceDate: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            absenceDate: currentDate,
          },
          returnedFromService
        );

        service.create(new AbsenceRequest()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a AbsenceRequest', () => {
        const returnedFromService = Object.assign(
          {
            absenceDate: currentDate.format(DATE_TIME_FORMAT),
            reason: 'BBBBBB',
            approvalStatus: true,
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            absenceDate: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of AbsenceRequest', () => {
        const returnedFromService = Object.assign(
          {
            absenceDate: currentDate.format(DATE_TIME_FORMAT),
            reason: 'BBBBBB',
            approvalStatus: true,
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            absenceDate: currentDate,
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a AbsenceRequest', () => {
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
