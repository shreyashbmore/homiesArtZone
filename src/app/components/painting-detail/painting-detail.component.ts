import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { APIsService } from 'src/app/apis.service';
import { CognitoService } from 'src/app/services/cognito.service';
import { SharedDataService } from 'src/app/services/shared-data.service';

@Component({
  selector: 'app-painting-detail',
  templateUrl: './painting-detail.component.html',
  styleUrls: ['./painting-detail.component.css']
})
export class PaintingDetailComponent {
  paintingData : any = {
    'paintingID' : undefined,
    'imageUrl' : undefined,
    'paintingName' : undefined,
    'artist' : undefined,
    'description' : undefined,
    'price' : undefined,
    'size' : undefined
  };

  id_p : string = '';

  constructor(private apiService : APIsService, private route: ActivatedRoute,private router:Router, private sharedData:SharedDataService, private cognito: CognitoService){
    
  }

  ngOnInit() : void{
    this.route.queryParamMap.subscribe(params => {
      const id = params.get('paintingId');
      
      if(id != null){
        this.id_p = id;
        this.apiService.getPaintingData(id).subscribe((data : any) => {
            this.paintingData = data;
          });
      }
      else{
        alert("Please Select Painting from listing");
        this.router.navigate(['/signIn']);
      }
    });
  }

  public addToCart(){
    if(this.sharedData.getUserData().user_id){
      var data = this.sharedData.getUserData().user_id;
      this.apiService.addToCart(data, this.id_p).subscribe((data : any) => {
      });
      setTimeout(() => {
        this.router.navigate(['/cart']);
      }, 2000);
      
    }
    else{
      this.cognito.signInRedirect();
    }
    

  }
}
