import { Component, OnInit } from '@angular/core';
import {Profile} from '../../../../../mycompetence-webapi/src/entity/profile.entity';

@Component({
  selector: 'app-home-registration',
  templateUrl: './home-registration.component.html',
  styleUrls: ['./home-registration.component.css']
})
export class HomeRegistrationComponent implements OnInit {

  profile: Profile;

  constructor() { }

  ngOnInit(): void {

  }

  register(): void {

  }
}
