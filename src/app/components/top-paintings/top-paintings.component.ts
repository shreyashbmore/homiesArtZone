import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { APIsService } from 'src/app/apis.service';
@Component({
  selector: 'app-top-paintings',
  templateUrl: './top-paintings.component.html',
  styleUrls: ['./top-paintings.component.css']
}) 
export class TopPaintingsComponent {
  paintingInfo: any;
  constructor(private service1: APIsService, private router: Router) {
    this.callingTopPaintings();
  }
  callingTopPaintings() {
    this.service1.top_paintings().subscribe((data: any) => {
      this.paintingInfo = data.body;

    })
  }

  public paintingDetails(paintingId : string){
    this.router.navigate(['/PaintingDetail'], {queryParams: {'paintingId' : paintingId}})
  }
}
