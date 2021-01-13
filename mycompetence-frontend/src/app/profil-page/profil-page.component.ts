import { Component, OnInit } from '@angular/core';
import {ProfileService} from '../service/profile.service';

@Component({
  selector: 'app-profil-page',
  templateUrl: './profil-page.component.html',
  styleUrls: ['./profil-page.component.css']
})
export class ProfilPageComponent implements OnInit {



  constructor(private profileService: ProfileService) {
  }

  async ngOnInit(): Promise<void> {
    const tmp = await this.profileService.getProfileById('blabla');
    console.log('Result: ' + tmp);
  }
}
