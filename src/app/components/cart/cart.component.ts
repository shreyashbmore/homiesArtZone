import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from 'aws-amplify';
import { APIsService } from 'src/app/apis.service';
import { CognitoService } from 'src/app/services/cognito.service';
import { SharedDataService } from 'src/app/services/shared-data.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  
  paintingInfo : any = [];

  cart : any;
  
  constructor(private apiService:APIsService,private sharedData:SharedDataService,private cognito:CognitoService,private router:Router){
    this.apiService.getUserData(this.sharedData.getUserData().user_id).subscribe((data : any) => {

      this.cart = data.listCart;
      for(let i = 0; i<this.cart.length; i++){
        this.apiService.getPaintingData(this.cart[i]).subscribe((data : any) => {
          try{
            data.count = 1;
            this.paintingInfo.push(data);
          }
          catch(e){
  
          }
        });
      } 

    })
  }

 
  public incrementValue(i : any)
  {      
    i.count++;
  }

  public decrementValue(i : any)
  {
    
    i.count--;
    if(i.count == 0){
      var data = this.sharedData.getUserData().user_id;
      this.apiService.removeFromCart(data, i.paintingID).subscribe((data : any) => {
      })
      
      const index = this.paintingInfo.indexOf(i, 1);
      if (index > -1) {
        this.paintingInfo.splice(index, 1);
      }
      
      setTimeout(() => {
        location.reload();
      }, 1000);
    }
    
  }


  createPurchaseList() {
    const cart = this.sharedData.getUserData().cart;
    const paintingList = [];
  
    for (let i of this.paintingInfo) {
      const painting = {paintingID: i.paintingID, count:i.count};
      paintingList.push(painting);
    }
  
    var json = JSON.stringify(paintingList);

    this.apiService.purchase_list(this.sharedData.getUserData().user_id,json).subscribe((data: any) => {
    

    })
  }

  async callpopup()
  { 
    var msg = 'Order is placed successfully!';
    if (this.cart.length == 0 ){
        msg = 'Cart is empty,please select painting!!';
    }
   
    Swal.fire(
      {
        text: msg,
        icon: 'success',
        confirmButtonText: 'OK'
      })
      this.router.navigate(['']);
  } 
  


  getTotalPrice() {
    let total = 0;
    for (let i of this.paintingInfo) {
      if(i.count>0)
      total += i.price * i.count;
    }
    return total;
  }
  
}
