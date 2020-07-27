import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { IsourceschooladmingatewayappTestModule } from '../../../../test.module';
import { BusEventsDetailComponent } from 'app/entities/isourceproductapp/bus-events/bus-events-detail.component';
import { BusEvents } from 'app/shared/model/isourceproductapp/bus-events.model';

describe('Component Tests', () => {
  describe('BusEvents Management Detail Component', () => {
    let comp: BusEventsDetailComponent;
    let fixture: ComponentFixture<BusEventsDetailComponent>;
    const route = ({ data: of({ busEvents: new BusEvents(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [IsourceschooladmingatewayappTestModule],
        declarations: [BusEventsDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(BusEventsDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(BusEventsDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load busEvents on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.busEvents).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
