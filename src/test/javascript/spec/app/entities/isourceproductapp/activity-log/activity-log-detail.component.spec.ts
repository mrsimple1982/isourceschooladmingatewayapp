import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { JhiDataUtils } from 'ng-jhipster';

import { IsourceschooladmingatewayappTestModule } from '../../../../test.module';
import { ActivityLogDetailComponent } from 'app/entities/isourceproductapp/activity-log/activity-log-detail.component';
import { ActivityLog } from 'app/shared/model/isourceproductapp/activity-log.model';

describe('Component Tests', () => {
  describe('ActivityLog Management Detail Component', () => {
    let comp: ActivityLogDetailComponent;
    let fixture: ComponentFixture<ActivityLogDetailComponent>;
    let dataUtils: JhiDataUtils;
    const route = ({ data: of({ activityLog: new ActivityLog(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [IsourceschooladmingatewayappTestModule],
        declarations: [ActivityLogDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(ActivityLogDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ActivityLogDetailComponent);
      comp = fixture.componentInstance;
      dataUtils = fixture.debugElement.injector.get(JhiDataUtils);
    });

    describe('OnInit', () => {
      it('Should load activityLog on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.activityLog).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });

    describe('byteSize', () => {
      it('Should call byteSize from JhiDataUtils', () => {
        // GIVEN
        spyOn(dataUtils, 'byteSize');
        const fakeBase64 = 'fake base64';

        // WHEN
        comp.byteSize(fakeBase64);

        // THEN
        expect(dataUtils.byteSize).toBeCalledWith(fakeBase64);
      });
    });

    describe('openFile', () => {
      it('Should call openFile from JhiDataUtils', () => {
        // GIVEN
        spyOn(dataUtils, 'openFile');
        const fakeContentType = 'fake content type';
        const fakeBase64 = 'fake base64';

        // WHEN
        comp.openFile(fakeContentType, fakeBase64);

        // THEN
        expect(dataUtils.openFile).toBeCalledWith(fakeContentType, fakeBase64);
      });
    });
  });
});
