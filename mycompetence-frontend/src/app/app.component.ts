import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  loggedIn: boolean;
  username: string;
  password: string;

  title = 'mycompetence';
  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.username = '';
    this.password = '';
    this.form = this.formBuilder.group({
      username: "",
      password: ""
    });
  }

  logOut(): void {
    console.log(this.username);
    this.loggedIn = false;
    this.username = '';
    this.password = '';
    this.form = this.formBuilder.group({
      username: "",
      password: ""
    });
  }

  logIn(): void{
    this.username = this.form.get("username").value
    this.password = this.form.get("password").value
    this.loggedIn = true;

    console.log("User: " + this.username + " is logged in with password " + this.password);
  }
}
