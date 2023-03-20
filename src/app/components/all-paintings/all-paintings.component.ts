import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { APIsService } from 'src/app/apis.service';
@Component({
  selector: 'app-all-paintings',
  templateUrl: './all-paintings.component.html',
  styleUrls: ['./all-paintings.component.css']
})

export class AllPaintingsComponent {
  paintingInfo: any;
  constructor(private service1: APIsService, private router:Router) { 
  }

  ngOnInit(){
    this.callingAllPaintings();
  }

  callingAllPaintings() {
    this.service1.getAllPaintings().subscribe((data: any) => {
      this.paintingInfo = data;

    })
  }

  public paintingDetails(paintingId : string){
    this.router.navigate(['/PaintingDetail'], {queryParams: {'paintingId' : paintingId}})
  }

}
