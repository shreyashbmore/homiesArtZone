import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  isSigneIn = false;
  isAdmin = false;
  
  constructor() {
  }

  public getIsSignIn(){
    var data = localStorage.getItem('isSignedIn');
    return data ? JSON.parse(data) : false;
  }
  
  public setIsSignIn(flag : boolean){
    localStorage.setItem('isSignedIn',JSON.stringify(!this.isSigneIn));
  }

  public getUserData(){
    var data = localStorage.getItem('userData');
    return data ? JSON.parse(data) : false;
  }

  public setUserData(userData : any){
    localStorage.setItem('userData',JSON.stringify(userData));
  }

  public getIsAdmin(){
    var data = localStorage.getItem('isAdmin');
    return data ? JSON.parse(data) : false;
  }
  
  public setIsAdmin(flag : boolean){
    localStorage.setItem('isAdmin',JSON.stringify(!this.isAdmin));
  }

  public getIsSignedInByAmplify(): boolean{
    var data = localStorage.getItem('amplify-signin-with-hostedUI');
    return data ? true : false;
  }

  // public getPaintingData(){

  // }

  // public setPaintingData(){

  // }
}
