import { Component, OnInit } from '@angular/core';
import {Profile} from '../../../../mycompetence-webapi/src/entity/profile.entity';
import {ProfileService} from '../service/profile.service';

@Component({
  selector: 'app-profil-page',
  templateUrl: './profil-page.component.html',
  styleUrls: ['./profil-page.component.css']
})
export class ProfilPageComponent implements OnInit {

  profile: Profile;


  constructor(private profileService: ProfileService) {
    this.profile = new Profile();
  }

  async ngOnInit(): Promise<void> {
    const tmp = await this.profileService.getProfileById('blabla');
    console.log('Result: ' + tmp);
    this.profile = tmp;
  }
}
