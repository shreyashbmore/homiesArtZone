import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Amplify, Auth } from 'aws-amplify';
import { environment } from 'src/environments/environment';
import { APIsService } from '../apis.service';
import { User } from '../models/user';
import { SharedDataService } from './shared-data.service';


@Injectable({
  providedIn: 'root'
})
export class CognitoService {
  user : User = {} as User;
  constructor(private sharedData: SharedDataService, private apiService : APIsService) {
    Amplify.configure({
       Auth : environment.cognito
    })
   }

  //  public signUp(user:User) :Promise<any>{
  //    return Auth.signUp({
  //      username: user.email,
  //      password: user.password,
  //      attributes: {
  //        email : user.email,
  //        name : user.name,
  //        gender : user.gender,
  //        phone_number : user.phoneNumber,
  //        address : user.address
  //      }
  //    })
  //  }

  //  public confirmSignUp(user:User) :Promise<any>{
  //    return Auth.confirmSignUp(user.email,user.code);
  //  }

  //  public signIn(user:User) :Promise<any>{
  //   return Auth.signIn(user.email, user.password);
  //  }

  //  public signOut() :Promise<any>{
  //   return Auth.signOut()
  //  }

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
      if(decodedToken.email=="sklord25@gmail.com" ){
            this.sharedData.setIsAdmin(true);
          }
      
          this.sharedData.setIsSignIn(true);

    })
  }

   public forgotPassword(email : string) : Promise<any>{
    return Auth.forgotPassword(email);
   }

   public forgotPasswordSubmit(email : string, code : string, new_pass: string) :Promise<any>{
    return Auth.forgotPasswordSubmit(email, code, new_pass);
   }

   async updateUser(new_data : any) {
    const user = await Auth.currentAuthenticatedUser();
    await Auth.updateUserAttributes(user, new_data);
  }


  public signInRedirect() {
    const url = "https://artzone.auth.ap-northeast-1.amazoncognito.com/login?client_id=78tti8i42ner69052jjpbsdobl&response_type=code&scope=email+openid+phone&redirect_uri=http%3A%2F%2Flocalhost%3A4200";
    window.location.assign(url);
  }

  public signOutRedirect() {
    localStorage.clear();
    const url = "https://artzone.auth.ap-northeast-1.amazoncognito.com/logout?client_id=78tti8i42ner69052jjpbsdobl&response_type=code&logout_uri="+environment.baseLink;
    window.location.assign(url);

  }


}
