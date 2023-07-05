import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  getCartItemCount=new BehaviorSubject(0); //initial value
  // behavior sub can pass stream of data

  getWishItemCount=new BehaviorSubject(0);
  
  //to hold search team

  searchTerm=new BehaviorSubject('');

 Base_URL='http://localhost:5000'
  constructor(private http:HttpClient ) {
    this.cartCount()
  }
//get all products
  getAllProducts() {
    return this.http.get(`${this.Base_URL }/products/all-products`)
  }
//view particular product
  viewProduct(id:any) {
    return this.http.get(`${this.Base_URL }/products/viewProduct/${id}`) //same path declared in back end routes
    
  }

//wishlist
  addToWishlist(id:any,title:string,price:any,image:any) {
    const body = {
      id,
      title,
      price,
      image
    }

    return this.http.post(`${this.Base_URL }/products/addToWishlist`,body)
  }

// view wishlist
  viewWishlist() {
    
    return this.http.get(`${this.Base_URL }/products/getWishlist`)
  } 
//delete wishlist
  deleteWishlist(id:any) {
    return this.http.delete(`${this.Base_URL }/products/deleteWishlist/${id}`)
  }  


  //wish count
  wishCount() {
    this.viewWishlist().subscribe((data:any)=>{ //cart array
      this.getWishItemCount.next(data.length) //cart count=>length of cart array
    })
  }

//add to cart
  addToCart(product:any) {
    const body = {
      id:product.id,
      title:product.title,
      price:product.price,
      image:product.image,
      quantity:product.quantity
    }

    return this.http.post(`${this.Base_URL }/products/addToCart`,body)
  }

// get cart
  getCart() {
    return this.http.get(`${this.Base_URL }/products/getCart`)
  }

//cart count
  cartCount() {
    this.getCart().subscribe((result:any)=>{ //cart array
      this.getCartItemCount.next(result.length) //cart count=>length of cart array
    })
  }

//delete cart
  deleteCart(id:any) {
    return this.http.delete(`${this.Base_URL }/products/deleteCart/${id}`)
  }

//increment cart
  incrementCart(id:any) {
    return this.http.get(`${this.Base_URL }/products/incrementCart/${id}`)
  }

//decrement cart
  decrementCart(id:any) {
    return this.http.get(`${this.Base_URL }/products/decrementCart/${id}`)
  }

}





