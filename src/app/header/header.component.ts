import { Component, OnInit } from '@angular/core';
import { ApiService } from '../products/services/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private api:ApiService){}
  //to hold searchTeam
searchTeam:string='';

cartItemCount:number=0;

wishItemCount:number=0;

ngOnInit(): void {
  this.api.getCartItemCount.subscribe((data:any)=>{
    console.log("length of cart array" ,data);
    this.cartItemCount=data;
    
  })
  this.api.getWishItemCount.subscribe((count:any)=>{
    console.log("length of wish array",count);
    this.wishItemCount=count;
    
  })

}

search(event:any){
  console.log(event.target.value);
  //to assign new value to behavior subject next() method

  this.api.searchTerm.next(event.target.value)   //add search term to behavior subject



  
}
}
