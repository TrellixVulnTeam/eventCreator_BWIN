
import { Component, Input, OnChanges } from '@angular/core'
import { ISession } from '../shared/index'

@Component({
  selector: 'session-list',
  templateUrl: 'session-list.component.html'

})

export class SessionListComponent implements OnChanges {
  @Input() sessions: ISession[];
  @Input() filterBy: string;
  @Input() sortBy: string;
  visibleSessions: ISession[] = [];

  ngOnChanges() {
    if (this.sessions) {
      this.filterSessions(this.filterBy);
      //sort is a method from array, sorts the array in place, don't duplicated it
      this.sortBy === 'name' ? this.visibleSessions.sort(sortByNameAsc) : this.visibleSessions.sort(sortByVotesDesc);
    }
  }

  filterSessions(filter) {
    if (filter === 'all') {
      // we want a duplicate list, slice duplicate the array.
      this.visibleSessions = this.sessions.slice(0);
    } else {
      // create subset of the array, create a new array, anything that returns true will be included in the array.
      this.visibleSessions = this.sessions.filter(session => {
        return session.level.toLocaleLowerCase() === filter;
      })
    }
  }
}

function sortByNameAsc(s1: ISession, s2: ISession) {
  if (s1.name > s2.name) {
    return 1
  } else if (s1.name === s2.name) {
    return 0
  } else {
    return -1
  }
}

function sortByVotesDesc(s1: ISession, s2: ISession) {
  return s2.voters.length - s1.voters.length
}
