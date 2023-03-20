import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';
import { APIsService } from 'src/app/apis.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PopComponent } from '../pop/pop.component';

@Component({
  selector: 'modal',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent {
  add_painting: boolean = false;
  remove_painting: boolean = false;
  edit_painting: boolean = false;
  paintingID: any;
  paintingName: any;
  artistName: any;
  size: any;
  price: any;
  description: any;
  available: any;
  reply: any;
  list: any;
  edit1: boolean = false; edit2: boolean = false; edit3: boolean = false; edit4: boolean = false;
  open: boolean = false;
  newValue: any;
  imageData: any;
  reply1: any;
  painting:any;
  
  paintingInfo: any;
  paintingIDN: number=0;
  constructor(@Inject(MAT_DIALOG_DATA) public data:any,private service: APIsService,private router:Router,private location: Location,private dialogRef:MatDialog) { 

    this.painting=data.paintingName;
  }
  
  ngOnInit()
 {
  this.editPainting(this.painting) 
 }

  refreshPage() {
    this.location.go(this.location.path());
    window.location.reload();
  }
  
  editPainting(nameOfPainting1:any) {
    this.service.edit_painting(nameOfPainting1).subscribe((data: any) => {
      this.reply = data,
        this.list = Object.entries(this.reply).map(([key, value]) => ({ key, value }));
      this.open = true;
    })
  }


  sendnewdata(attribute: any) {
    let body =
    {
      PaintingID: this.reply.paintingID,
      attributeName: attribute,
      attributeValue: this.newValue
    }
    this.service.update_painting(body).subscribe((data: any) => {
      this.reply1 = data;
        if(this.reply1 === "Updated Successfully" )
         
        Swal.fire(
        {  
        text: `${this.reply1}!`,
        icon: 'success',
        confirmButtonText: 'OK'
        }).then((result) => {
        if (result.isConfirmed) {    
          this.refreshPage();
        }
        });
          
    })
    
  }

  restoredit()
  { this.edit1=false;
    this.edit2=false;
    this.edit3=false;
    this.edit4=false;
    this.open=false;
    this.newValue="";
  }
  
  restore_variable()
  {
    this.paintingName=null;
    this.newValue=null;
    this.paintingName=null;
    this.artistName=null;
    this.size=null;
    this.price=null;
    this.description=null;
    this.available=null;

  }

  
 restoreNewValue()
 {
  this.newValue=null;
 }

closepopup()
{
  this.dialogRef.closeAll();
}

openpopup()
{
  this.dialogRef.open(PopComponent)
}

}
