import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { FormBuilder, Validators } from '@angular/forms';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  //from paypal
  public payPalConfig?: IPayPalConfig;
  //paypal showSuccess
  showSuccess: boolean = false;
   //
  proceedToPay:boolean=false;
  discountStatus: boolean = false;
  offerClick: boolean = false;

  paymentStatus: boolean = false;
  //to hold total price
  totalPrice: number = 0;

  //to hold cart items
  allCart: any = [];

  constructor(private api: ApiService, private fb: FormBuilder) { }

  userName: any;
  pin: any;
  phone: any;
  houseNumber: any;
  //address form

  addressForm = this.fb.group({  //group
    //arrays
    username: ['', [Validators.required, Validators.pattern('[a-zA-Z]*')]],
    housenumber: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    street: ['', [Validators.required, Validators.pattern('[a-zA-Z]*')]],
    state: ['', [Validators.required, Validators.pattern('[a-zA-Z]*')]],
    pincode: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    phone: ['', [Validators.required, Validators.pattern('[0-9]*')]]
  })



  ngOnInit(): void {
    //paypal fn call
    this.initConfig();

    this.api.getCart().subscribe((result: any) => {
      console.log(result);
      this.allCart = result;

      this.getCartTotal();


    },
      (error: any) => {
        console.log(error);
      });

  }

  //delete cart
  deleteCart(id: any) {
    this.api.deleteCart(id).subscribe((result: any) => {

      console.log(result);
      this.allCart = result;
      // alert("product deleted successfully")
      this.api.cartCount();
      this.getCartTotal();

    },
      (result: any) => {
        alert(result.error);
      }
    );

  }

  getCartTotal() {
    let total = 0;
    this.allCart.forEach((item: any) => {
      total = total + item.grandTotal;
      this.totalPrice = Math.ceil(total); //math dot ceil use to reduce point value it rounds the value


    });


  }
  //increment cart
  incrementCart(id: any) {
    this.api.incrementCart(id).subscribe((result: any) => {

      console.log(result);
      this.allCart = result;

      this.api.cartCount();
      this.getCartTotal();

    },
      (result: any) => {
        alert(result.error);
      }
    );

  }

  //decrement cart
  decrementCart(id: any) {
    this.api.decrementCart(id).subscribe((result: any) => {
      console.log(result);
      this.allCart = result;
      // alert("product added successfully")
      this.api.cartCount();
      this.getCartTotal();

    },
      (result: any) => {
        alert(result.error);
      }
    );

  }

  // submitForm
  submitForm() {
    if (this.addressForm.valid) {
      this.paymentStatus = true;
      this.userName = this.addressForm.value.username
      this.houseNumber = this.addressForm.value.housenumber
      this.pin = this.addressForm.value.pincode
      this.phone = this.addressForm.value.phone

    } else {
      alert('enter valid details')
    }
  }

  offerClicked() {
    this.offerClick = true;

  }

  discount(value: any) {

    this.totalPrice = Math.ceil(this.totalPrice * (100 - value) / 100)
    this.offerClick = false;
    this.discountStatus = true;

    // Math.ceil use to remove point value

  }
  //pay pal fn
  private initConfig(): void {
    this.payPalConfig = {
      currency: 'EUR',
      clientId: 'sb',
      createOrderOnClient: (data) => <ICreateOrderRequest>{
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: 'EUR',
              value: '9.99',
              breakdown: {
                item_total: {
                  currency_code: 'EUR',
                  value: '9.99'
                }
              }
            },
            items: [
              {
                name: 'Enterprise Subscription',
                quantity: '1',
                category: 'DIGITAL_GOODS',
                unit_amount: {
                  currency_code: 'EUR',
                  value: '9.99',
                },
              }
            ]
          }
        ]
      },
      advanced: {
        commit: 'true'
      },
      style: {
        label: 'paypal',
        layout: 'vertical'
      },
      onApprove: (data, actions) => {
        console.log('onApprove - transaction was approved, but not authorized', data, actions);
        actions.order.get().then((details: any) => {
          console.log('onApprove - you can get full order details inside onApprove: ', details);
        });
      },
      onClientAuthorization: (data) => {
        console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
        this.showSuccess = true;
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
      },
      onError: err => {
        console.log('OnError', err);
      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
      },
    };
  }

//payment btn
  makePay(){
    this.proceedToPay=true
  }
  //modal close form reset
  modalClose(){
    this.addressForm.reset();
    this.paymentStatus = false;
    this.showSuccess = false;
    this.discountStatus = false;
    this.offerClick = false;
    this.proceedToPay=false;
    this.totalPrice;
  } 

}
