import {Component, Inject, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Candidate} from "../../models/candidate.model";
import {CandidatesService} from "../../services/candidates.service";
import {MatCard, MatCardActions} from "@angular/material/card";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {AsyncPipe, NgIf} from "@angular/common";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-single-candidate',
  standalone: true,
  imports: [
    MatCard,
    MatCardActions,
    MatProgressSpinner,
    NgIf,
    MatButton,
    AsyncPipe
  ],
  templateUrl: './single-candidate.component.html',
  styleUrl: './single-candidate.component.scss'
})
export class SingleCandidateComponent implements OnInit {
  loading$!: Observable<boolean>;
  candidate$!: Observable<Candidate>;

  ngOnInit() {
    this.initObservable();
  }

  constructor(private candidateService: CandidatesService) {
  }

  private initObservable() {
    this.loading$ = this.candidateService.laoding$;
    // this.candidate$ = this.candidateService.;
  }


  onHire() {

  }

  onRefuse() {

  }

  onGoBack() {

  }
}
