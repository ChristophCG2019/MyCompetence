import { Component, OnInit } from '@angular/core';
import {Profile} from '../../entity/profile.entity';
import {ProfileService} from "../../service/profile.service";

@Component({
  selector: 'app-home-registration',
  templateUrl: './home-registration.component.html',
  styleUrls: ['./home-registration.component.css']
})
export class HomeRegistrationComponent implements OnInit {

  profile: Profile;
  newRegistered: boolean;

  constructor(private profileService : ProfileService) { }

  ngOnInit(): void {
    this.newRegistered = false;
  }

  async register(): Promise<void> {
    let username = (document.getElementById('usernameInput') as HTMLInputElement).value;
    let password = (document.getElementById('passwordInput') as HTMLInputElement).value;
    let e_mail = (document.getElementById('e-mailInput') as HTMLInputElement).value;
    let organisation = (document.getElementById('organisationInput') as HTMLInputElement).value;

    if (username !== null && password != null && e_mail != null && organisation != null && username.length != 0){
      // Register
      let profile = new Profile()
      profile.userName = username
      profile.description = "Member of " + organisation
      await this.profileService.registerNewProfile(profile)
      this.newRegistered = true;
      console.log(username);
      console.log(password);
      console.log(e_mail);
      console.log(organisation);
    }
  }
}
