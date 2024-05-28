import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HelperService, RegxPhoneNumber, RegxUserName } from 'src/app/core/service/helper.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
export const RegxPassword: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  message: string = '';
  files: File[] = [];
  hidePass = true;
  hideConfirmPass = true;
  profileImgValue: any
  role :string ='user';
  constructor(private _helper: HelperService, private _AuthService: AuthService, private _Router: Router,private _ToastrService: ToastrService){}

  ngOnInit(): void {

  }
  registerForm = new FormGroup({
    userName: new FormControl(null, [Validators.required, Validators.minLength(4),Validators.maxLength(15),Validators.pattern(RegxUserName),]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    country: new FormControl(null, [Validators.required,Validators.minLength(4),Validators.maxLength(15)],),
    phoneNumber: new FormControl(null, [Validators.required, Validators.pattern(RegxPhoneNumber)]),
    password: new FormControl(null, [Validators.required,Validators.pattern(RegxPassword)]),
    confirmPassword: new FormControl(null, [Validators.required,Validators.pattern(RegxPassword)]),
    role: new FormControl('user', [Validators.required]),
    profileImage: new FormControl('',),

  });


  onRegister(data: FormGroup) {
    
    let registerFormData = new FormData()
    registerFormData.append('profileImage', this.profileImgValue)
    registerFormData.append('userName', data.value.userName)
    registerFormData.append('email', data.value.email)
    registerFormData.append('phoneNumber', data.value.phoneNumber)
    registerFormData.append('password', data.value.password)
    registerFormData.append('confirmPassword', data.value.confirmPassword)
    registerFormData.append('country', data.value.country)
    registerFormData.append('role',data.value.role)
    console.log(data);

    console.log(registerFormData);
    this._AuthService.onRegister(registerFormData).subscribe({
      next: (response) => {
        

      }, error: (err) => {
        this._ToastrService.error(err.error.message,'Error')
      
      }, complete: () => {
        this._Router.navigate(['/auth/login'])
        this._ToastrService.success('You successfully Registered','Success')
      },
    })
  }

  onSelect(event: any) {
    console.log(event.addedFiles[0]);
    this.profileImgValue = event.addedFiles[0]
    this.files.push(...event.addedFiles);
  }

  onRemove(event: any) {
    this.files.splice(this.files.indexOf(event), 1);
    this.profileImgValue = false
  }
  getErrorMessageforPasswrod() {
    return this._helper.getErrorMessageforPasswrod(this.registerForm, 'password', { required: 'required', minlength: 'minlength', maxlength: 'maxlength', pattern: 'pattern' })
  }

  getErrorMessageforName() {
    return this._helper.getErrorMessageforName(this.registerForm, 'userName', { name: 'required', pattern: 'pattern' })
  }

  

  getErrorMessageForCountry() {
    return this._helper.getErrorMessageForCountry(this.registerForm, 'country', { required: 'required' })
  }

  getErrorMessageForPhoneNumber() {
    return this._helper.getErrorMessageForPhoneNumber(this.registerForm, 'phoneNumber', { required: 'required', pattern: 'pattern' })
  }


}
