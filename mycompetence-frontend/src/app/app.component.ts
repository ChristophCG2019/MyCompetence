import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Profile} from './entity/profile.entity';
import {ProfileService} from "./service/profile.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  loggedIn: boolean;
  profile: Profile;
  password: string;
  username: string;

  title = 'mycompetence';
  form: FormGroup;

  constructor(private formBuilder: FormBuilder, private profileService : ProfileService) {
  }

  ngOnInit(): void {
    console.log("Init")
    this.profile = new Profile();
    this.profile.userName = '';
    this.password = '';

    this.form = this.formBuilder.group({
      username: '',
      password: ''
    });
  }

  logOut(): void {
    this.loggedIn = false;
    this.profile.userName = '';
    this.password = '';
    this.form = this.formBuilder.group({
      username: '',
      password: ''
    });
  }

  logIn(): void{
    this.profile.userName = this.form.get('username').value;
    this.username = this.form.get('username').value
    this.password = this.form.get('password').value;
    this.loggedIn = true;
    this.profileService.username = this.username

    console.log('User: ' + this.profile.userName + ' is logged in with password ' + this.password);
  }
}
