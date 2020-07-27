import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { IsourceschooladmingatewayappTestModule } from '../../../../test.module';
import { BusRouteDetailComponent } from 'app/entities/isourceproductapp/bus-route/bus-route-detail.component';
import { BusRoute } from 'app/shared/model/isourceproductapp/bus-route.model';

describe('Component Tests', () => {
  describe('BusRoute Management Detail Component', () => {
    let comp: BusRouteDetailComponent;
    let fixture: ComponentFixture<BusRouteDetailComponent>;
    const route = ({ data: of({ busRoute: new BusRoute(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [IsourceschooladmingatewayappTestModule],
        declarations: [BusRouteDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(BusRouteDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(BusRouteDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load busRoute on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.busRoute).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
