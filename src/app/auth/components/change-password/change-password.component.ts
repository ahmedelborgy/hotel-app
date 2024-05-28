import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {

  hide:boolean=true;
  confirmHide:boolean=true;
  confirmNewHide:boolean=true;
  userpassword = new FormGroup({
    oldPassword: new FormControl(null,[Validators.required,Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,16}$')]),
    newPassword: new FormControl(null,[Validators.required,Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,16}$')]),
    confirmPassword: new FormControl(null,[Validators.required,Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,16}$')])

  })

  constructor(private _router:Router,private _AuthServiceService:AuthService,private _ToastrService: ToastrService){}

  onSubmit(data:FormGroup){
    console.log(data.value);
    this._AuthServiceService.onUserChangePassword(data.value).subscribe({
      next:(res:any)=>{
        
        localStorage.setItem('userToken', res.token)
        this._AuthServiceService.getProfile();
      },
      error:(err:any)=>{
        console.log(err);
      },
      complete:()=>{
        this._AuthServiceService.myLogout();
        this._ToastrService.success('Your Password Changed Successfully','Success')
        
      }
    })
  }

}
