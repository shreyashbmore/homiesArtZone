// import { Component } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Auth } from 'aws-amplify';
import { environment } from 'src/environments/environment';
import { APIsService } from '../apis.service';
import { User } from '../models/user';
import { CognitoService } from '../services/cognito.service';
import { SharedDataService } from '../services/shared-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user : User = {} as User;
  imageURL : string = '';
  discount : number = 10;
  

  constructor(private cognito:CognitoService, private sharedData : SharedDataService,private apiService:APIsService) {
    this.getUserData();
    this.apiService.getHomePainting().subscribe((data : any) => {
      this.imageURL = data.link;
      if(data.dic){
      this.discount = data.dic;
      }
    })

  }

  ngOnInit(): void {

    this.getUserData();    
  }

  async getUserData() {
    try{
      const localData = await Auth.currentAuthenticatedUser();
    
      var str = localData.keyPrefix+'.'+localData.username+'.idToken';
      const helper = new JwtHelperService();
      var temp : any = localStorage.getItem(str)
      const decodedToken = helper.decodeToken(temp);
      this.apiService.getUserData(localData.username).subscribe((data : any) => {

        this.user.user_id = localData.username;
        this.user.email = decodedToken.email;
        this.user.address = decodedToken.address;
        this.user.phoneNumber = decodedToken.phone_number;
        this.user.gender = decodedToken.gender;
        this.user.name = decodedToken.name;
        this.user.cart = data.listCart;
        this.user.shoped = data.listShoped;
        
        this.sharedData.setUserData(this.user);

      })
      if(decodedToken.email=="sklord25@gmail.com" ){
        this.sharedData.setIsAdmin(true);
      }

      this.sharedData.setIsSignIn(true);
    }
    catch(e){

    }
  }
  

  public isAdmin(){
    return this.sharedData.getIsAdmin();
  }

}
