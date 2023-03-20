import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CognitoService } from 'src/app/services/cognito.service';
import { SharedDataService } from 'src/app/services/shared-data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  userName : string = '';

  constructor(private sharedData:SharedDataService, private cognito:CognitoService, private router : Router){};

  public isSignIn() : boolean{
    var flag = this.sharedData.getIsSignIn();
    if (flag){
      var data = this.sharedData.getUserData();
      this.userName = data.name;
    }
    return flag;
  }

  public isAdmin() : boolean{
    return this.sharedData.getIsAdmin();
  }

  public signIn() {
    this.cognito.signInRedirect();
  }

  public signOut() {
    this.cognito.signOutRedirect();
  }

  public toProfile(){
    this.router.navigate(['/profile']);
  }

  public isUserIn(){
    if(this.sharedData.getUserData().user_id){
      return true;
    }
    else{
      return false;
    }
  }

}
