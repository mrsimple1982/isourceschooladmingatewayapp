import { Component } from '@angular/core';

const STUDENT_NOTIFICATION = [
  {
    name: 'Mihir Vadalia',
    standard: '9A',
    type: 'warning',
  },
  {
    name: 'Chandra Sharma',
    standard: '10A',
    type: 'danger',
  },
  {
    name: 'Ravi Avhad',
    standard: '11A',
    type: 'warning',
  },
  {
    name: 'Viral Thakkar',
    standard: '12A',
    type: 'danger',
  },
];

const PARENTS_REQUEST = [
  {
    name: 'Mihir Vadalia',
    standard: '9A',
    parentName: 'John Doe',
    parentCellNumber: '+91 98989 98989',
    requestedDate: '28th July 2020',
    reason: 'Doctor Appointment',
  },
  {
    name: 'Chandra Sharma',
    standard: '10A',
    parentName: 'Jack Doe',
    parentCellNumber: '+91 12345 56789',
    requestedDate: '28th July 2020',
    reason: 'Full-day Leave',
  },
  {
    name: 'Ravi Avhad',
    standard: '11A',
    parentName: 'Jane Doe',
    parentCellNumber: '+91 12312 87945',
    requestedDate: '29th July 2020',
    reason: 'Half-day Leave',
  },
];

@Component({
  selector: 'jhi-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  studentsNotification = STUDENT_NOTIFICATION;
  parentsRequest = PARENTS_REQUEST;
}
