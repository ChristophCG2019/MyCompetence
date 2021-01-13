import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ImpressumComponent} from './impressum/impressum.component';
import {PrivacyPolicyComponent} from './privacy-policy/privacy-policy.component';
import {HomeComponent} from './home/home.component';
import {HomeRegistrationComponent} from './home/home-registration/home-registration.component';
import {ProfilPageComponent} from './profil-page/profil-page.component';

// TODO: Add routes to all pages
const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'home/registration', component: HomeRegistrationComponent},
  {path: 'impressum', component: ImpressumComponent},
  {path: 'privacyPolicy', component: PrivacyPolicyComponent},
  {path: 'profile/:id', component: ProfilPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
