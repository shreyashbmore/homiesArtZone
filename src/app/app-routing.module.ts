import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AllPaintingsComponent } from './components/all-paintings/all-paintings.component';
import { CartComponent } from './components/cart/cart.component';
import { ClientComponent } from './components/client/client.component';
import { ComponentNameComponent } from './components/component-name/component-name.component';
import { PaintingDetailComponent } from './components/painting-detail/painting-detail.component';
import { TopPaintingsComponent } from './components/top-paintings/top-paintings.component';
import { HeaderComponent } from './components/header/header.component';
import { AdminComponent } from './components/admin/admin.component';
import { ProfileComponent } from './components/profile/profile.component';
const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'all',component:AllPaintingsComponent},
  {path: 'top',component:TopPaintingsComponent},
  {path: 'client',component:ClientComponent},
  {path: 'signIn',component: ComponentNameComponent},
  {path: 'PaintingDetail',component:PaintingDetailComponent},
  {path: 'cart',component:CartComponent},
  {path: '',component:HomeComponent},
  {path: 'admin',component:AdminComponent},
  {path: 'profile',component:ProfileComponent}

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
