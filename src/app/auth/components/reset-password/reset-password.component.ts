import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HelperService } from 'src/app/core/service/helper.service';
import { ToastrService } from 'ngx-toastr';
export const RegxPassword: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  hide:boolean=true;
  hiden:boolean=true;
  constructor(private _AuthService:AuthService,private _Router:Router,private _helper:HelperService,private _ToastrService: ToastrService){}
  ngOnInit(): void {
    
  }
resetPasswordForm=new FormGroup({
  email:new FormControl(null,[Validators.required,Validators.email]),
  seed:new FormControl(null,[Validators.required]),
  password:new FormControl(null,[Validators.required, Validators.maxLength(20), Validators.minLength(8)]),
  confirmPassword:new FormControl(null,[Validators.required,Validators.pattern(RegxPassword), Validators.maxLength(20), Validators.minLength(8)])

})
onSubmit(data:FormGroup){
  this._AuthService.onResetPassword(data.value).subscribe({
    next:(res)=>{
      console.log(res)
    },
    error:(err)=>{
      console.log(err)
     
    },
    complete:()=>{
      this._Router.navigateByUrl('/auth/login')
      this._ToastrService.success('Your Password Changed Successfully','Success')
    }
  })
}


getErrorMessageforPasswrod() {
  return this._helper.getErrorMessageforPasswrod(this.resetPasswordForm, 'password', { required: 'required', minlength: 'minlength', maxlength: 'maxlength', pattern: 'pattern' })
}

getErrorMessageforName() {
  return this._helper.getErrorMessageforName(this.resetPasswordForm, 'userName', { name: 'required', pattern: 'pattern' })
}



getErrorMessageForCountry() {
  return this._helper.getErrorMessageForCountry(this.resetPasswordForm, 'country', { required: 'required' })
}

getErrorMessageForPhoneNumber() {
  return this._helper.getErrorMessageForPhoneNumber(this.resetPasswordForm, 'phoneNumber', { required: 'required', pattern: 'pattern' })
}

}
