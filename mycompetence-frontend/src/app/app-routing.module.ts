import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProfilPageComponent} from "./profil-page/profil-page.component";

// TODO: Add routes to all pages
const routes: Routes = [
  {path: '', component: ProfilPageComponent},
  {path: 'profile/:id', component: ProfilPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
