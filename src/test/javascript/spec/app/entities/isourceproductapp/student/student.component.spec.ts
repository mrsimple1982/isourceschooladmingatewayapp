import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, convertToParamMap, Data } from '@angular/router';

import { IsourceschooladmingatewayappTestModule } from '../../../../test.module';
import { StudentComponent } from 'app/entities/isourceproductapp/student/student.component';
import { StudentService } from 'app/entities/isourceproductapp/student/student.service';
import { Student } from 'app/shared/model/isourceproductapp/student.model';

describe('Component Tests', () => {
  describe('Student Management Component', () => {
    let comp: StudentComponent;
    let fixture: ComponentFixture<StudentComponent>;
    let service: StudentService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [IsourceschooladmingatewayappTestModule],
        declarations: [StudentComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: {
              data: {
                subscribe: (fn: (value: Data) => void) =>
                  fn({
                    pagingParams: {
                      predicate: 'id',
                      reverse: false,
                      page: 0,
                    },
                  }),
              },
              queryParamMap: {
                subscribe: (fn: (value: Data) => void) =>
                  fn(
                    convertToParamMap({
                      page: '1',
                      size: '1',
                      sort: 'id,desc',
                    })
                  ),
              },
            },
          },
        ],
      })
        .overrideTemplate(StudentComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(StudentComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(StudentService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Student(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.students && comp.students[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });

    it('should load a page', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Student(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.loadPage(1);

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.students && comp.students[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });

    it('should calculate the sort attribute for an id', () => {
      // WHEN
      comp.ngOnInit();
      const result = comp.sort();

      // THEN
      expect(result).toEqual(['id,desc']);
    });

    it('should calculate the sort attribute for a non-id attribute', () => {
      // INIT
      comp.ngOnInit();

      // GIVEN
      comp.predicate = 'name';

      // WHEN
      const result = comp.sort();

      // THEN
      expect(result).toEqual(['name,desc', 'id']);
    });
  });
});
