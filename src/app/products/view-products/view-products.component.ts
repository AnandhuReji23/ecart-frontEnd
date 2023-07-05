import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-view-products',
  templateUrl: './view-products.component.html',
  styleUrls: ['./view-products.component.css']
})
export class ViewProductsComponent implements OnInit {
  
  productId:string=""
constructor(private viewRoute:ActivatedRoute, private api:ApiService){}

//to hold particular product details
product:any=[]
ngOnInit():void{
  this.viewRoute.params.subscribe((result:any)=>{
    console.log(result); //{productId:"1"} in log  view product
    console.log(result.productId); //1
    this.productId=result.productId;

    //fetch product details
    this.api.viewProduct(this.productId).subscribe((result:any)=>{
      console.log(result);
      this.product=result;
    },
    (result:any)=>{
      console.log(result.error);//error msg
    });
    
  })
}

//api fn to add product to wishlist
addToWishlist(){
  const{id,title,price,image}=this.product  //destructuring
  //api fn
  this.api.addToWishlist(id,title,price,image).subscribe((result:any)=>{
    alert(result);
},
(result:any)=>{
  alert(result.error); //error msg
});

}
addToCart(product:any){
  console.log(product);

  //add quantity
  Object.assign(product,{quantity:1})
  console.log(product);

  //api fn

  this.api.addToCart(product).subscribe((result:any)=>{
    //call cat count 
    this.api.cartCount();
    alert(result);
},
(result:any)=>{
  alert(result.error); //error msg
});
 
}

}