import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { IsourceschooladmingatewayappTestModule } from '../../../../test.module';
import { StudentEventsUpdateComponent } from 'app/entities/isourceproductapp/student-events/student-events-update.component';
import { StudentEventsService } from 'app/entities/isourceproductapp/student-events/student-events.service';
import { StudentEvents } from 'app/shared/model/isourceproductapp/student-events.model';

describe('Component Tests', () => {
  describe('StudentEvents Management Update Component', () => {
    let comp: StudentEventsUpdateComponent;
    let fixture: ComponentFixture<StudentEventsUpdateComponent>;
    let service: StudentEventsService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [IsourceschooladmingatewayappTestModule],
        declarations: [StudentEventsUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(StudentEventsUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(StudentEventsUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(StudentEventsService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new StudentEvents(123);
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
        const entity = new StudentEvents();
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
