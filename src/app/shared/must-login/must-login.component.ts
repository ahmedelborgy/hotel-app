import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-must-login',
  templateUrl: './must-login.component.html',
  styleUrls: ['./must-login.component.scss']
})
export class MustLoginComponent {

  constructor(public dialogRef: MatDialogRef<MustLoginComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public _MatDialog: MatDialog, private _Router: Router
  ) { }


  onNoClick(): void {
    this.dialogRef.close();
  }

  login() {
    this._Router.navigate(['/auth/login']);
    this.dialogRef.close();

  }

  register() {
    this._Router.navigate(['/auth/register']);
    this.dialogRef.close();

  }
}
