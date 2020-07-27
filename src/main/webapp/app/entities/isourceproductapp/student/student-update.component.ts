import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IStudent, Student } from 'app/shared/model/isourceproductapp/student.model';
import { StudentService } from './student.service';
import { IBusRoute } from 'app/shared/model/isourceproductapp/bus-route.model';
import { BusRouteService } from 'app/entities/isourceproductapp/bus-route/bus-route.service';

@Component({
  selector: 'jhi-student-update',
  templateUrl: './student-update.component.html',
})
export class StudentUpdateComponent implements OnInit {
  isSaving = false;
  busroutes: IBusRoute[] = [];

  editForm = this.fb.group({
    id: [],
    name: [],
    dateOfBirth: [],
    studentDivision: [],
    classTeacher: [],
    address: [],
    status: [],
    parentMobileNumber: [],
    parentEmail: [],
    busStop: [],
    busRoute: [],
  });

  constructor(
    protected studentService: StudentService,
    protected busRouteService: BusRouteService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ student }) => {
      if (!student.id) {
        const today = moment().startOf('day');
        student.dateOfBirth = today;
      }

      this.updateForm(student);

      this.busRouteService
        .query({ filter: 'student-is-null' })
        .pipe(
          map((res: HttpResponse<IBusRoute[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IBusRoute[]) => {
          if (!student.busRoute || !student.busRoute.id) {
            this.busroutes = resBody;
          } else {
            this.busRouteService
              .find(student.busRoute.id)
              .pipe(
                map((subRes: HttpResponse<IBusRoute>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IBusRoute[]) => (this.busroutes = concatRes));
          }
        });
    });
  }

  updateForm(student: IStudent): void {
    this.editForm.patchValue({
      id: student.id,
      name: student.name,
      dateOfBirth: student.dateOfBirth ? student.dateOfBirth.format(DATE_TIME_FORMAT) : null,
      studentDivision: student.studentDivision,
      classTeacher: student.classTeacher,
      address: student.address,
      status: student.status,
      parentMobileNumber: student.parentMobileNumber,
      parentEmail: student.parentEmail,
      busStop: student.busStop,
      busRoute: student.busRoute,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const student = this.createFromForm();
    if (student.id !== undefined) {
      this.subscribeToSaveResponse(this.studentService.update(student));
    } else {
      this.subscribeToSaveResponse(this.studentService.create(student));
    }
  }

  private createFromForm(): IStudent {
    return {
      ...new Student(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      dateOfBirth: this.editForm.get(['dateOfBirth'])!.value
        ? moment(this.editForm.get(['dateOfBirth'])!.value, DATE_TIME_FORMAT)
        : undefined,
      studentDivision: this.editForm.get(['studentDivision'])!.value,
      classTeacher: this.editForm.get(['classTeacher'])!.value,
      address: this.editForm.get(['address'])!.value,
      status: this.editForm.get(['status'])!.value,
      parentMobileNumber: this.editForm.get(['parentMobileNumber'])!.value,
      parentEmail: this.editForm.get(['parentEmail'])!.value,
      busStop: this.editForm.get(['busStop'])!.value,
      busRoute: this.editForm.get(['busRoute'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IStudent>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: IBusRoute): any {
    return item.id;
  }
}
