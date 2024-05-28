import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-facilitie',
  templateUrl: './add-facilitie.component.html',
  styleUrls: ['./add-facilitie.component.scss']
})
export class AddFacilitieComponent {
  mydata:string='';
  constructor(
    public dialogRef: MatDialogRef<AddFacilitieComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
}
