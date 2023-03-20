import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { APIsService } from 'src/app/apis.service';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { Location } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { PopupComponent } from '../popup/popup.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PopComponent } from '../pop/pop.component';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
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
  open: boolean = false;
  newValue: any;
  imageData: any;
  reply1: any;
  form: FormGroup;
  paintingInfo: any;
  paintingIDN: number = 0;
  analysis: any;
  validator: boolean = false;
  constructor(private service: APIsService, private router: Router, private sharedData: SharedDataService, private location: Location, private dialogRef: MatDialog, private fb: FormBuilder) {
    this.form = this.fb.group({
      image: new FormControl(null, [Validators.required]),
      paintingName: this.fb.control('', Validators.required),
      artistName: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      // size: ['', Validators.required],
      size: ['', [Validators.required,(control:any) => {
        const validFormat = /^\d+\s*x\s*\d+$/i.test(control.value);
        return validFormat ? null : { invalidSizeFormat: true };
       }]],
      description: ['', Validators.required],
      available: [0, [Validators.required, Validators.min(0)]]
    },{updateOn:'change'})
   
  }

  artist()
  {
     return this.form.get('artistName')?.value;
  }


  onSubmit() {
   
    
    this.paintingName = this.form.get('paintingName')?.value;
    this.artistName = this.form.get('artistName')?.value;
    this.price = this.form.get('price')?.value;
    this.size = this.form.get('size')?.value;
    this.description = this.form.get('description')?.value;
    this.available = this.form.get('available')?.value;
    
    if (this.form.valid) {
     
      this.openPop()
      // Add code to submit the form data to a backend API or service
    } else {
   
      alert('Form is incomplete');

    }
    this.addPainting()

  }

  callingAllPaintings() {
    this.service.getAllPaintings().subscribe((data: any) => {
      this.paintingInfo = data;
    

    })

  }

  ngOnInit(): void {
    if (!this.sharedData.getIsAdmin()) {
      this.router.navigate(['']);
    }
    this.callingAnalysis();
  }

  callingAnalysis() {
    this.service.analysis().subscribe((data: any) => {
      this.analysis = data;

    })


  }


  onImageSelection(event: any) {

    const fileInput = document.getElementById("imageInput") as HTMLInputElement;
    if (fileInput && fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];

      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.imageData = reader.result?.toString().split(',')[1];
        // send imageData to lambda function
      };
    }
  }

  addPainting() {
    const min = 100000; // Minimum 6-digit number
    const max = 999999; // Maximum 6-digit number
    this.paintingIDN = Math.floor(Math.random() * (max - min + 1)) + min;
    this.paintingID = this.paintingIDN.toString()
    this.service.add_painting(this.paintingID, this.imageData, this.paintingName, this.artistName, this.size, this.price, this.description, this.available).subscribe((data: any) => {
      this.reply = data;
      if (this.reply === "Painting added Successfully!") {

        Swal.fire(
          {
            text: `${this.reply}!`,
            icon: 'success',
            confirmButtonText: 'OK'
          }).then((result) => {
            if (result.isConfirmed) {
              this.refreshPage();
            }
          });
      }


    })

  }

  removePainting(nameOfPainting: any) {
    this.service.remove_painting(nameOfPainting).subscribe((data: any) => {
      this.reply = data;
      if (this.reply === "Painting deleted Successfully!") {

        Swal.fire(
          {
            text: `${this.reply}!`,
            icon: 'success',
            confirmButtonText: 'OK'
          }).then((result) => {
            if (result.isConfirmed) {
              this.refreshPage();
            }
          });
      }
    })

  }

  refreshPage() {
    this.location.go(this.location.path());
    window.location.reload();
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
      if (this.reply1 === "Updated Successfully") {

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
      }
    })

  }




  restoreNewValue() {
    this.newValue = null;
  }


  openDialog(name: any) {
    this.dialogRef.open(PopupComponent, {
      data:
      {
        paintingName: name
      }

    });
  }

  openPop() {
    this.dialogRef.open(PopComponent)

  } 


}
