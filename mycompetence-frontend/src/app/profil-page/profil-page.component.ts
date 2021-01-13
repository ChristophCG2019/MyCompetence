import { Component, OnInit } from '@angular/core';
import {ProfileService} from '../service/profile.service';
import {Profile} from '../entity/profile.entity';
import { ActivatedRoute } from '@angular/router';
import {Competence} from "../entity/competence.entity";

@Component({
  selector: 'app-profil-page',
  templateUrl: './profil-page.component.html',
  styleUrls: ['./profil-page.component.css']
})
export class ProfilPageComponent implements OnInit {
  hasAlreadyApproved = false
  profile: Profile = new Profile()

  constructor(private profileService: ProfileService, private route: ActivatedRoute) {
  }

  async ngOnInit(): Promise<void> {
    const Id = this.route.snapshot.params['id'].toString();
    this.profile = await this.profileService.getProfileById(Id);
    console.log("Ok")
    console.log(JSON.stringify(this.profile))
  }

  async onApproveIncrease(competence : Competence) : Promise<void> {
    this.hasAlreadyApproved = true
    competence.countApproved += 1
    this.profile = await this.profileService.saveProfile(this.profile)
    console.log("Refresh")
  }

  async onApproveDecrease(competence: Competence): Promise<void> {
    this.hasAlreadyApproved = true
    competence.countApproved -= 1
    this.profile = await this.profileService.saveProfile(this.profile)
    console.log("Refresh")
  }
}
