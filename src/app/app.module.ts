import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './components/admin/admin.component';
import { HttpClientModule } from '@angular/common/http';
import { AllPaintingsComponent } from './components/all-paintings/all-paintings.component';
import { ComponentNameComponent } from './components/component-name/component-name.component';
import { TopPaintingsComponent } from './components/top-paintings/top-paintings.component';
import { HomeComponent } from './home/home.component';
import { ClientComponent } from './components/client/client.component';
import { HeaderComponent } from './components/header/header.component';
import { PaintingDetailComponent } from './components/painting-detail/painting-detail.component';
import { CartComponent } from './components/cart/cart.component';
import { ProfileComponent } from './components/profile/profile.component';
import { MatDialogModule } from '@angular/material/dialog';
import { PopupComponent } from './components/popup/popup.component';
import { PopComponent } from './components/pop/pop.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@NgModule({
  declarations: [
    AppComponent,
    AllPaintingsComponent,
    ComponentNameComponent,
    TopPaintingsComponent,
    HomeComponent,
    ClientComponent,
    HeaderComponent,
    PaintingDetailComponent,
    CartComponent,
    ProfileComponent,
    PopupComponent,
    AdminComponent,
    PopComponent,
    
  ],
  imports: [
    FormsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,  
    RouterModule,
    HttpClientModule,
    MatDialogModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
