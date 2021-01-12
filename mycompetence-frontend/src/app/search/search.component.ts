import {Component, OnInit, Output} from '@angular/core';
import {SearchProfile} from "../entity/searchProfile";
import {ProfileService} from "../service/profile.service";
import {EventEmitter} from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  spinnerVisible: boolean = false
  searchResults: SearchProfile[] = []

  @Output()
  searchResultEmitter = new EventEmitter<SearchProfile[]>();
  @Output()
  searchStartEmitter = new EventEmitter<void>()

  constructor(private profileService: ProfileService) {
  }

  ngOnInit(): void {
  }

  async search(query: string) {
    this.spinnerVisible = true
    this.searchStartEmitter.emit(null)
    this.searchResults = await this.profileService.searchForProfiles(query)
    this.searchResultEmitter.emit(this.searchResults)
    this.spinnerVisible = false
  }
}
