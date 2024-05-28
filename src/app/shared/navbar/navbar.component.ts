import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import {TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  lang:any=localStorage.getItem('lang')
  constructor(private _AuthService: AuthService,private _TranslateService:TranslateService) {
  
    if(localStorage.getItem('lang')!==null){
      this.onChangeLang(this.lang)
    }
  
   }
  userRole = localStorage.getItem('userRole')
  userName = localStorage.getItem('userName')
  onChangeLang(lang:string){
    console.log(lang)
    this._TranslateService.setDefaultLang(lang);
    this._TranslateService.use(lang)
  }
  logOut() {
    this._AuthService.myLogout()
  }
  ngOnInit(): void {

  }
}
