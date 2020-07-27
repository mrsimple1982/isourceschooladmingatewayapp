import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { IsourceschooladmingatewayappTestModule } from '../../../../test.module';
import { StudentEventsDetailComponent } from 'app/entities/isourceproductapp/student-events/student-events-detail.component';
import { StudentEvents } from 'app/shared/model/isourceproductapp/student-events.model';

describe('Component Tests', () => {
  describe('StudentEvents Management Detail Component', () => {
    let comp: StudentEventsDetailComponent;
    let fixture: ComponentFixture<StudentEventsDetailComponent>;
    const route = ({ data: of({ studentEvents: new StudentEvents(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [IsourceschooladmingatewayappTestModule],
        declarations: [StudentEventsDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(StudentEventsDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(StudentEventsDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load studentEvents on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.studentEvents).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
