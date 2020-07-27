import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { IsourceschooladmingatewayappTestModule } from '../../../../test.module';
import { AbsenceRequestDetailComponent } from 'app/entities/isourceproductapp/absence-request/absence-request-detail.component';
import { AbsenceRequest } from 'app/shared/model/isourceproductapp/absence-request.model';

describe('Component Tests', () => {
  describe('AbsenceRequest Management Detail Component', () => {
    let comp: AbsenceRequestDetailComponent;
    let fixture: ComponentFixture<AbsenceRequestDetailComponent>;
    const route = ({ data: of({ absenceRequest: new AbsenceRequest(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [IsourceschooladmingatewayappTestModule],
        declarations: [AbsenceRequestDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(AbsenceRequestDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(AbsenceRequestDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load absenceRequest on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.absenceRequest).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
