import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  loggedIn: boolean;

  title = 'mycompetence';

  ngOnInit(): void {
    this.loggedIn = false;
  }
}
