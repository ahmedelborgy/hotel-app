import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-ads',
  templateUrl: './delete-ads.component.html',
  styleUrls: ['./delete-ads.component.scss']
})
export class DeleteAdsComponent {
  
  constructor(
    public dialogRef: MatDialogRef<DeleteAdsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }
  onNoClick(): void {
    this.dialogRef.close();
  }


}
