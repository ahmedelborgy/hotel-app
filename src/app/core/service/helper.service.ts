import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
export const RegxUserName: RegExp = /^[a-zA-Z]+[0-9]+$/;
export const RegxPhoneNumber: RegExp = /^\d+$/;

@Injectable({
  providedIn: 'root'
})
export class HelperService {
  //lang:any;
  textDirection:string=''
  
  lang:any
  constructor(private _HttpClient: HttpClient, private _TranslateService:TranslateService) { 
    _TranslateService.onLangChange.subscribe((event:LangChangeEvent)=>{
      console.log(event.lang);
      this.lang=event.lang
    });
   this._TranslateService.onLangChange.subscribe((event: LangChangeEvent) => {
      event.lang==='en'?this.textDirection = 'ltr' : this.textDirection = 'rtl'
    })
  }

  onChangelang(lang:any){

    this._TranslateService.setDefaultLang(lang);
    this._TranslateService.use(lang);
    localStorage.setItem("lang", lang)
    console.log(lang)
  }



  getErrorMessageForPhoneNumber(form: FormGroup, controlName: string, validationError: any) {
    if (form.get(controlName)?.getError(validationError.required)) {
      return 'Phone number is requierd'
    }
    return form.get(controlName)?.getError(validationError.pattern) ? 'Only digit number, and must be 11 numbers' : ''
  }

  getErrorMessageForCountry(form: FormGroup, controlName: string, validationError: any) {
    if (form.get(controlName)?.getError(validationError.required)) {
      return 'Country is requierd'
    }
    return ''
  }


  getErrorMessageforName(form: FormGroup, controlName: string, validationError: any) {
    if (form.get(controlName)?.getError(validationError.name)) {
      return 'Name is requierd.';
    }

    return form.get(controlName)?.getError(validationError.pattern) ? 'The userName must contain characters and end with numbers without spaces.' : '';
  }


  getErrorMessageforPasswrod(form: FormGroup, controlName: string, validationError: any) {
    if (form.get(controlName)?.getError(validationError.required)) {

    }

    if (form.get(controlName)?.getError(validationError.maxlength)) {
      return 'MaxLength at max 20 characters long.';
    }
    if (form.get(controlName)?.getError(validationError.minlength)) {
      return 'MinLength at least 6 characters long.';
    }

    return form.get(controlName)?.getError(validationError.pattern) ? 'must include at least one lowercase letter, one uppercase letter, one digit, one special character' : '';
  }

  getAllRooms(): Observable<any> {
    return this._HttpClient.get('/admin/rooms')
  }

  get(): Observable<any> {
    return this._HttpClient.get('/admin/rooms')
  }

  gituserById(id: number): Observable<any> {
    return this._HttpClient.get(`/portal/users/${id}`);
  }




}
