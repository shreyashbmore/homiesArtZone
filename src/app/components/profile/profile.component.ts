import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CognitoService } from 'src/app/services/cognito.service';
import { SharedDataService } from 'src/app/services/shared-data.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  forgotPass = false;
  newPassword : string = '';
  newPasswordConfirm : string = '';

  code : string = '';

  username : string = '';
  name : string = '';
  address : any;
  gender : string = '';
  contact : string = '';

  readonly : boolean = true;

  constructor(private sharedData:SharedDataService, private cognito: CognitoService, private router : Router){
    
    var data = this.sharedData.getUserData();
    this.username = data.email;
    this.name = data.name;
    this.address = data.address.formatted;
    this.gender = data.gender;
    this.contact = data.phoneNumber;
  }

  ngOnInit() : void{
    
  }

  public editButton(){
    this.readonly = !this.readonly;
  }

  public saveChange(){
      this.cognito.updateUser({
        name : this.name,
        address : this.address,
        gender :  this.gender
      }).then( () => {
          this.cognito.getUserData();
          this.router.navigate(['/profile']);
        });
  }

  public resetPass(){
    this.forgotPass = true;
    this.cognito.forgotPassword(this.username);
  }

  public resetPassSubmit(){
    var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if(re.test(this.newPassword)){
    if(this.newPassword == this.newPasswordConfirm){
      this.cognito.forgotPasswordSubmit(this.username,this.code,this.newPassword);
      alert("Password Changed!! Please Relogin");
      this.cognito.signOutRedirect();
    }
    else{
      alert("Confirm msg and new msg do not match");
      this.newPasswordConfirm='';
    }
  }
  else{
    alert("Password should be at least 8 character. It should contain at least one special chararter, one upper case letter and number");
  }
  }
}
