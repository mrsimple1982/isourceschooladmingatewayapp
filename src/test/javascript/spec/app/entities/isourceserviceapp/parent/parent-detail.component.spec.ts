import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { IsourceschooladmingatewayappTestModule } from '../../../../test.module';
import { ParentDetailComponent } from 'app/entities/isourceserviceapp/parent/parent-detail.component';
import { Parent } from 'app/shared/model/isourceserviceapp/parent.model';

describe('Component Tests', () => {
  describe('Parent Management Detail Component', () => {
    let comp: ParentDetailComponent;
    let fixture: ComponentFixture<ParentDetailComponent>;
    const route = ({ data: of({ parent: new Parent(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [IsourceschooladmingatewayappTestModule],
        declarations: [ParentDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(ParentDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ParentDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load parent on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.parent).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
