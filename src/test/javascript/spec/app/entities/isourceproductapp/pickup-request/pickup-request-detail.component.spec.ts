import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { IsourceschooladmingatewayappTestModule } from '../../../../test.module';
import { PickupRequestDetailComponent } from 'app/entities/isourceproductapp/pickup-request/pickup-request-detail.component';
import { PickupRequest } from 'app/shared/model/isourceproductapp/pickup-request.model';

describe('Component Tests', () => {
  describe('PickupRequest Management Detail Component', () => {
    let comp: PickupRequestDetailComponent;
    let fixture: ComponentFixture<PickupRequestDetailComponent>;
    const route = ({ data: of({ pickupRequest: new PickupRequest(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [IsourceschooladmingatewayappTestModule],
        declarations: [PickupRequestDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(PickupRequestDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PickupRequestDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load pickupRequest on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.pickupRequest).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
