import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProfilPageComponent } from './profil-page/profil-page.component';
import {HttpClientModule} from "@angular/common/http";
import { ImpressumComponent } from './impressum/impressum.component';
import { PrivacyPoliceComponent } from './privacy-police/privacy-police.component';
import { HomeComponent } from './home/home.component';
import {FormsModule} from '@angular/forms';
import { HomeRegistrationComponent } from './home/home-registration/home-registration.component';

@NgModule({
  declarations: [
    AppComponent,
    ProfilPageComponent,
    ImpressumComponent,
    PrivacyPoliceComponent,
    HomeComponent,
    HomeRegistrationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
