import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ImpressumComponent} from './impressum/impressum.component';
import {PrivacyPoliceComponent} from './privacy-police/privacy-police.component';
import {HomeComponent} from './home/home.component';
import {ProfilPageComponent} from './profil-page/profil-page.component';

// TODO: Add routes to all pages
const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'impressum', component: ImpressumComponent},
  {path: 'privacyPolice', component: PrivacyPoliceComponent},
  {path: 'profile/:id', component: ProfilPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
