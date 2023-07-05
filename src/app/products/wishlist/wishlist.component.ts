import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit{

  allWishlist:any=[]
  constructor (private api:ApiService){}
  ngOnInit():void{
    this.api. viewWishlist().subscribe((result:any)=>{
      console.log(result);
      this.allWishlist=result;
      
    });

   
  }

    //delete 
    deleteWishlist(id:any){
      this.api.deleteWishlist(id).subscribe((result:any)=>{
      
        console.log(result);
        this.allWishlist=result;
        // alert("product deleted successfully")

      },
      (result:any)=>{
        alert(result.error)
      }
      );
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
        this.deleteWishlist(product.id);
        alert(result);
    },
    (result:any)=>{
      alert(result.error); //error msg
    });
     
    }
    
}


