import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { IsourceschooladmingatewayappTestModule } from '../../../../test.module';
import { PickupRequestUpdateComponent } from 'app/entities/isourceproductapp/pickup-request/pickup-request-update.component';
import { PickupRequestService } from 'app/entities/isourceproductapp/pickup-request/pickup-request.service';
import { PickupRequest } from 'app/shared/model/isourceproductapp/pickup-request.model';

describe('Component Tests', () => {
  describe('PickupRequest Management Update Component', () => {
    let comp: PickupRequestUpdateComponent;
    let fixture: ComponentFixture<PickupRequestUpdateComponent>;
    let service: PickupRequestService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [IsourceschooladmingatewayappTestModule],
        declarations: [PickupRequestUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(PickupRequestUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PickupRequestUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PickupRequestService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new PickupRequest(123);
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
        const entity = new PickupRequest();
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
