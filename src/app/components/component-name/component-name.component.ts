import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { CognitoService } from 'src/app/services/cognito.service';

@Component({
  selector: 'app-component-name',
  templateUrl: './component-name.component.html',
  styleUrls: ['./component-name.component.css']
})
export class ComponentNameComponent {
  constructor(private cognito : CognitoService, private router: Router){

  }



  public signIn() {
    this.cognito.signInRedirect();
  }

  public testGetData(){
    this.router.navigate(['/PaintingDetail'], {queryParams: {'paintingId' : '1015'}})
  }
}
