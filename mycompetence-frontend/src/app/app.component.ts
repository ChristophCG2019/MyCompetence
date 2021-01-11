import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  loggedIn: boolean;
  UserName: string;
  Password: string;

  title = 'mycompetence';

  ngOnInit(): void {
    this.UserName = '';
    this.Password = '';
  }

  logOut(): void {
    console.log(this.UserName);
    this.loggedIn = false;
    this.UserName = '';
    this.Password = '';
  }

  logIn(): void{
    this.loggedIn = true;
    console.log(this.UserName);
  }
}
