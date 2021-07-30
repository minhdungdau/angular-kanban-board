import { MatSnackBar } from '@angular/material/snack-bar';
import { JobListService } from './../job-list.service';
import { DialogConfirmComponent } from './../dialog-confirm-delete/dialog-confirm-delete.component';
import { JOBLIST } from './../job-list.model';
import { Component, OnInit } from '@angular/core';

import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  jobLists: JOBLIST[] = [];
  input: string = '';
  listIndex: number = 0;
  constructor(
    public dialog: MatDialog,
    public jobListService: JobListService,
    public snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.jobLists = this.jobListService.getJobLists()
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
    this.jobListService.updateLocalStorage();
  }

  onConfirmDelelteList(indexList: number) {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      width: '300px',
      height: 'fit-content',
      data: {
        title: 'Confirm delete list',
        message: `Are you sure to delete List <i>"${this?.jobLists[indexList].name}"</i>`,
        button: {
          ok: 'Confirm',
          cancel: 'Cancel',
        },
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.snackBar.open(`List ${this?.jobLists[indexList].name} was deleted`, 'Dismiss', {
          duration: 1000,
        });
        this.jobListService.deleteList(indexList);       
      } else {
        throw new Error
      }
    });
  }

  onConfirmDelelteJob(listIndex: number, jobIndex: number) {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      width: '300px',
      height: 'fit-content',
      data: {
        title: 'Confirm delete job',
        message: `Are you sure to delete job <i>"${this?.jobLists[listIndex].jobs[jobIndex]}"</i>`,
        button: {
          ok: 'Confirm',
          cancel: 'Cancel',
        },
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.snackBar.open(`Job ${this?.jobLists[listIndex].jobs[jobIndex]} was deleted`, 'Dismiss', {
          duration: 1000,
        });
        this.jobListService.deleteJob(listIndex, jobIndex);       
      } else {
        throw new Error
      }
    });
  }
}
