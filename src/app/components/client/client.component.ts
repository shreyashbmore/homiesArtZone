import { Component } from '@angular/core';
import { Auth } from 'aws-amplify';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CognitoService } from 'src/app/services/cognito.service';
import { APIsService } from 'src/app/apis.service';
import { User } from 'src/app/models/user';
import { environment } from 'src/environments/environment';
import { SharedDataService } from 'src/app/services/shared-data.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent {
  user : User = {} as User;
  constructor(private cognito : CognitoService, private apiService : APIsService, private sharedData : SharedDataService){

  }
  
  ngOnInit() : void{
    this.sharedData.setIsSignIn(true);
    this.getUserData();
  }

  async getUserData() {
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

    
  }

  public callingGetUserData(userID : string){
    var tempData : any;
    
    return tempData;
  }

  public signOut() {
    environment.isSignedIn = false;
    this.cognito.signOutRedirect();
  }

  public getCart(){
    return this.user.cart;
  }
}
