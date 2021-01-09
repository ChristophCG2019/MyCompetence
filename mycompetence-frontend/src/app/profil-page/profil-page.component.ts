import { Component, OnInit } from '@angular/core';
import {Person} from "../../../../mycompetence-webapi/src/entity/person.entity";
import {PersonService} from "../service/person.service";

@Component({
  selector: 'app-profil-page',
  templateUrl: './profil-page.component.html',
  styleUrls: ['./profil-page.component.css']
})
export class ProfilPageComponent implements OnInit {

  person : Person


  constructor(private personService : PersonService) {
    this.person = new Person()
    this.person.firstName = "Init"
  }

  async ngOnInit(): Promise<void> {
    let tmp = await this.personService.getPersonById("blabla")
    console.log("Result: " + tmp)
    this.person = tmp
  }
}
