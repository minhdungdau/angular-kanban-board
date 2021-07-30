import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-confirm-delete',
  templateUrl: './dialog-confirm-delete.component.html',
  styleUrls: ['./dialog-confirm-delete.component.css'],
})
export class DialogConfirmComponent implements OnInit {
  title: string = "Confirm";
  message: any = `<p>Are you sure?</p>`;
  cancelButtonText: string = "Cancel";
  confirmButtonText: string = "Confirm";
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<DialogConfirmComponent>
  ) {
    if (data) {
      this.title = data.title || this.title
      this.message = data.message || this.message;
      if (data.button) {
        this.confirmButtonText = data.button.ok || this.confirmButtonText;
        this.cancelButtonText = data.button.cancel || this.cancelButtonText;
      }
    }
  }
  ngOnInit(): void {}
  onConfirmClick(): void {
    this.dialogRef.close(true);
  }
}
