import { Component } from '@angular/core';
import { HelperService } from '../core/service/helper.service';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent {
  lang:any;
  constructor(private helperService:HelperService, private _TranslateService:TranslateService){
    _TranslateService.onLangChange.subscribe((event:LangChangeEvent)=>{
      console.log(event.lang);
      this.lang=event.lang
    });
  
  }
}
