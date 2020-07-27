import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { PickupRequestService } from 'app/entities/isourceproductapp/pickup-request/pickup-request.service';
import { IPickupRequest, PickupRequest } from 'app/shared/model/isourceproductapp/pickup-request.model';

describe('Service Tests', () => {
  describe('PickupRequest Service', () => {
    let injector: TestBed;
    let service: PickupRequestService;
    let httpMock: HttpTestingController;
    let elemDefault: IPickupRequest;
    let expectedResult: IPickupRequest | IPickupRequest[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(PickupRequestService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new PickupRequest(0, currentDate, currentDate, 'AAAAAAA', false);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            pickupDate: currentDate.format(DATE_TIME_FORMAT),
            pickupTime: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a PickupRequest', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            pickupDate: currentDate.format(DATE_TIME_FORMAT),
            pickupTime: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            pickupDate: currentDate,
            pickupTime: currentDate,
          },
          returnedFromService
        );

        service.create(new PickupRequest()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a PickupRequest', () => {
        const returnedFromService = Object.assign(
          {
            pickupDate: currentDate.format(DATE_TIME_FORMAT),
            pickupTime: currentDate.format(DATE_TIME_FORMAT),
            reason: 'BBBBBB',
            approvalStatus: true,
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            pickupDate: currentDate,
            pickupTime: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of PickupRequest', () => {
        const returnedFromService = Object.assign(
          {
            pickupDate: currentDate.format(DATE_TIME_FORMAT),
            pickupTime: currentDate.format(DATE_TIME_FORMAT),
            reason: 'BBBBBB',
            approvalStatus: true,
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            pickupDate: currentDate,
            pickupTime: currentDate,
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a PickupRequest', () => {
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
