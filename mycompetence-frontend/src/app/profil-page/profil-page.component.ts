import { Component, OnInit } from '@angular/core';
import {ProfileService} from '../service/profile.service';
import {Profile} from '../entity/profile.entity';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profil-page',
  templateUrl: './profil-page.component.html',
  styleUrls: ['./profil-page.component.css']
})
export class ProfilPageComponent implements OnInit {

  profile: Profile = new Profile()

  constructor(private profileService: ProfileService, private route: ActivatedRoute) {
  }

  async ngOnInit(): Promise<void> {
    const Id = this.route.snapshot.params['id'].toString();
    this.profile = await this.profileService.getProfileById(Id);
    console.log("Ok")
    console.log(JSON.stringify(this.profile))
  }
}
