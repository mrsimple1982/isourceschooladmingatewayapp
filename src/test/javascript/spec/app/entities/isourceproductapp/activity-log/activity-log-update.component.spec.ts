import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { IsourceschooladmingatewayappTestModule } from '../../../../test.module';
import { ActivityLogUpdateComponent } from 'app/entities/isourceproductapp/activity-log/activity-log-update.component';
import { ActivityLogService } from 'app/entities/isourceproductapp/activity-log/activity-log.service';
import { ActivityLog } from 'app/shared/model/isourceproductapp/activity-log.model';

describe('Component Tests', () => {
  describe('ActivityLog Management Update Component', () => {
    let comp: ActivityLogUpdateComponent;
    let fixture: ComponentFixture<ActivityLogUpdateComponent>;
    let service: ActivityLogService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [IsourceschooladmingatewayappTestModule],
        declarations: [ActivityLogUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(ActivityLogUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ActivityLogUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ActivityLogService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new ActivityLog(123);
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
        const entity = new ActivityLog();
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
