import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { IsourceschooladmingatewayappTestModule } from '../../../../test.module';
import { AbsenceRequestUpdateComponent } from 'app/entities/isourceproductapp/absence-request/absence-request-update.component';
import { AbsenceRequestService } from 'app/entities/isourceproductapp/absence-request/absence-request.service';
import { AbsenceRequest } from 'app/shared/model/isourceproductapp/absence-request.model';

describe('Component Tests', () => {
  describe('AbsenceRequest Management Update Component', () => {
    let comp: AbsenceRequestUpdateComponent;
    let fixture: ComponentFixture<AbsenceRequestUpdateComponent>;
    let service: AbsenceRequestService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [IsourceschooladmingatewayappTestModule],
        declarations: [AbsenceRequestUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(AbsenceRequestUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AbsenceRequestUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AbsenceRequestService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new AbsenceRequest(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new AbsenceRequest();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
