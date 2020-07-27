import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { IsourceschooladmingatewayappTestModule } from '../../../../test.module';
import { BusEventsUpdateComponent } from 'app/entities/isourceproductapp/bus-events/bus-events-update.component';
import { BusEventsService } from 'app/entities/isourceproductapp/bus-events/bus-events.service';
import { BusEvents } from 'app/shared/model/isourceproductapp/bus-events.model';

describe('Component Tests', () => {
  describe('BusEvents Management Update Component', () => {
    let comp: BusEventsUpdateComponent;
    let fixture: ComponentFixture<BusEventsUpdateComponent>;
    let service: BusEventsService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [IsourceschooladmingatewayappTestModule],
        declarations: [BusEventsUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(BusEventsUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(BusEventsUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(BusEventsService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new BusEvents(123);
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
        const entity = new BusEvents();
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
