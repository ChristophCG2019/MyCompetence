import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Profile} from '../../../mycompetence-webapi/src/entity/profile.entity';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  loggedIn: boolean;
  profile: Profile;
  password: string;

  title = 'mycompetence';
  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
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
    this.password = this.form.get('password').value;
    this.loggedIn = true;

    console.log('User: ' + this.profile.userName + ' is logged in with password ' + this.password);
  }
}
