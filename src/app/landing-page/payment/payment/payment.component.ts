import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  injectStripe,
  StripeElementsDirective,
  StripeCardComponent,
} from 'ngx-stripe';
import {
  StripeElementsOptions,
  StripeCardElementOptions,
} from '@stripe/stripe-js';
import { Router, ActivatedRoute } from '@angular/router';
import { RoomDetailsService } from '../../services/room-details service/room-details.service';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent {
  payId:any
  stripeTest: any;
  // stripe: any;
  card: any;
  @ViewChild(StripeCardComponent) cardElement!: StripeCardComponent;
  stripe = injectStripe('pk_test_51OTjURBQWp069pqTmqhKZHNNd3kMf9TTynJtLJQIJDOSYcGM7xz3DabzCzE7bTxvuYMY0IX96OHBjsysHEKIrwCK006Mu7mKw8'
);
 
constructor(private _Router:Router,private _roomDetailsService: RoomDetailsService, private _ActivatedRoute: ActivatedRoute) {
  this.payId = _ActivatedRoute.snapshot.params['_id'];
}
  cardOptions: StripeCardElementOptions = {
    style: {
      base: {
        iconColor: '#666EE8',
        color: '#31325F',
        fontWeight: '300',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '18px',
        '::placeholder': {
          color: '#CFD7E0',
        },
      },
    },
  };

  elementsOptions: StripeElementsOptions = {
    locale: 'en',
  };
  createToken() {
    const name = 'aya';
    this.stripe
      .createToken(this.cardElement.element, { name })
      .subscribe((result: any) => {
        if (result.token) {
          this._roomDetailsService.onClickPay( result.token.id,this.payId).subscribe({
            next:(res)=>{

            },
            error:(err)=>{

            },
            complete:()=>{
              this._Router.navigate(['/#/landing-page/payment'])
            }
          })
          
          console.log(result.token.id);
        } else if (result.error) {
          // Error creating the token
          console.log(result.error.message);
        }
      });
  }

}
