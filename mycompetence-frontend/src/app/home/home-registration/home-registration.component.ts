import { Component, OnInit } from '@angular/core';
import {Profile} from '../../entity/profile.entity';

@Component({
  selector: 'app-home-registration',
  templateUrl: './home-registration.component.html',
  styleUrls: ['./home-registration.component.css']
})
export class HomeRegistrationComponent implements OnInit {

  profile: Profile;
  newRegistered: boolean;

  constructor() { }

  ngOnInit(): void {
    this.newRegistered = false;
  }

  register(): void {
    let username = (document.getElementById('usernameInput') as HTMLInputElement).value;
    let password = (document.getElementById('passwordInput') as HTMLInputElement).value;
    let e_mail = (document.getElementById('e-mailInput') as HTMLInputElement).value;
    let organisation = (document.getElementById('organisationInput') as HTMLInputElement).value;

    if (username !== null && password != null && e_mail != null && organisation != null){
      // Register
      this.newRegistered = true;
    }
  }
}
