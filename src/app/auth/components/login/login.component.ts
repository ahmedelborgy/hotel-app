import { Component } from '@angular/core';
import { AuthService } from './../../services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HelperService } from 'src/app/core/service/helper.service';
import { ToastrService } from 'ngx-toastr';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthService } from '@abacritt/angularx-social-login';
export const RegxPassword: RegExp = /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {


  accessToken = '';
  hidePass = true;
  password_type: string = 'text';
  see: boolean = true;


  constructor(private authService: SocialAuthService, private _AuthService: AuthService, private _Router: Router, private _helper: HelperService, private _ToastrService: ToastrService) {
    this._AuthService.myLogout();
  }

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(RegxPassword)])
  })



  getAccessToken(): void {
    this.authService.getAccessToken(GoogleLoginProvider.PROVIDER_ID).then(accessToken => this.accessToken = accessToken);
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);

  }


  handleForm(data: FormGroup): void {


    let userData = data.value;
    this._AuthService.onLogin(userData).subscribe({
      next: (response) => {
        localStorage.setItem('userToken', response.data.token);
        localStorage.setItem('userName', response.data.user.userName);
        console.log(localStorage.getItem('userName'));
        localStorage.setItem('userToken', response.data.token);
        this._AuthService.getProfile();
      }, error: (err) => {
        this._ToastrService.error(err.error.message, 'Error')
      }, complete: () => {
        this._Router.navigate(["admin"])
        this._ToastrService.success('You successfully Loggedin', 'Success')
      }
    })
  }

  toggleSee() {
    this.see = !this.see;
    this.password_type = this.see ? 'text' : 'password';
  }


  getErrorMessageforPasswrod() {
    return this._helper.getErrorMessageforPasswrod(this.loginForm, 'password', { required: 'required', minlength: 'minlength', maxlength: 'maxlength', pattern: 'pattern' })
  }



}
