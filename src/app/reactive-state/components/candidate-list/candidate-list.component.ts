import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {CandidatesService} from "../../services/candidates.service";
import {Observable} from "rxjs";
import {Candidate} from "../../models/candidate.model";
import {MatCard, MatCardTitle, MatCardTitleGroup} from "@angular/material/card";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {AsyncPipe} from "@angular/common";
import {MatListItem, MatListItemAvatar, MatNavList} from "@angular/material/list";
import {RouterLink} from "@angular/router";
import {MatLine} from "@angular/material/core";

@Component({
  selector: 'app-candidate-list',
  standalone: true,
  imports: [
    MatCard,
    MatCardTitle,
    MatCardTitleGroup,
    MatProgressSpinner,
    AsyncPipe,
    MatNavList,
    MatListItem,
    RouterLink,
    MatListItemAvatar,
    MatLine
  ],
  templateUrl: './candidate-list.component.html',
  styleUrl: './candidate-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CandidateListComponent implements OnInit {
  loading$!: Observable<boolean>;
  candidates$!: Observable<Candidate[]>;

  ngOnInit() {
    this.initObservable()
    this.candidatService.getCondidatesFromServer()
  }

  constructor(private candidatService: CandidatesService) {
  }

  private initObservable() {
    this.loading$ = this.candidatService.laoding$;
    this.candidates$ = this.candidatService.candidates$;
  }

}
