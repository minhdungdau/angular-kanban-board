import { JobListService } from './../job-list.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-new',
  templateUrl: './add-new.component.html',
  styleUrls: ['./add-new.component.css'],
})
export class AddNewComponent implements OnInit {
  @Input() placeholder: string = '';
  @Input() index: number = 0;
  @Input() listIndex?: number;
  @Output() onAddNew = new EventEmitter();

  input: string = '';

  constructor(
    private snackBar: MatSnackBar,
    private jobListService: JobListService
  ) {}

  ngOnInit(): void {}

  addNew() {
    // Do not add list or job with no name
    if (this.input.trim()) {
      //Add list
      if (this.listIndex === undefined) {
        this.jobListService.addNewList(this.input)
        this.snackBar.open('New List was created successfully!', 'Dismiss', {
          duration: 2000,
        });
      }
      //Add job
      else {
        this.jobListService.addNewJob(this.listIndex, this.input)
        this.snackBar.open('New Job was created successfully!', 'Dismiss', {
          duration: 2000,
        });
      }
      this.input = '';
    }
  }
}
