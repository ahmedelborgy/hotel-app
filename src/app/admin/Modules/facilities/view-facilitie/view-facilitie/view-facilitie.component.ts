import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-view-facilitie',
  templateUrl: './view-facilitie.component.html',
  styleUrls: ['./view-facilitie.component.scss']
})
export class ViewFacilitieComponent implements OnInit{
  constructor(
    public dialogRef: MatDialogRef<ViewFacilitieComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit(): void {
    
  }
}
