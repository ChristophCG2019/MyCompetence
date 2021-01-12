import {Component, OnInit} from '@angular/core';
import {SearchProfile} from "../entity/searchProfile";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  searchProfileResults: SearchProfile[] = []
  initialState : boolean = true
  isSearchRunning : boolean = false

  constructor() {
  }

  ngOnInit(): void {
  }

  /**
   * Gets called when a search starts.
   */
  onSearchStart() {
    this.initialState = false
    // Dirty hack to hide the footer.
    document.getElementById("pagefooter").hidden = true
    this.isSearchRunning = true
  }

  /**
   * Receives the search results from the search bar.
   * @param profiles
   */
  onSearchResults(profiles: SearchProfile[]) {
    this.searchProfileResults = profiles
    this.isSearchRunning = false
    console.log("Got profiles" + JSON.stringify(profiles))
  }

  /**
   * Returns a formatted competences text.
   * @param profile
   */
  getJoinedCompetencesText(profile: SearchProfile): string {
    let text = ""

    profile.competences.forEach(e => {
      if (text.length != 0) {
        text += ", "
      }
      text += e.name
    })

    if (text.length == 0) {
      text = "This user does not list any public competences."
    } else {
      text = "Competences: " + text
    }

    return text
  }
}
