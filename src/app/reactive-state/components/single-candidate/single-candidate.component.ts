import {Component, Inject, OnInit} from '@angular/core';
import {Observable, switchMap, take, tap} from "rxjs";
import {Candidate} from "../../models/candidate.model";
import {CandidatesService} from "../../services/candidates.service";
import {MatCard, MatCardActions} from "@angular/material/card";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {AsyncPipe, NgIf} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormControl} from "@angular/forms";
import {CandidateSearchType} from "../../enums/candidate-search-type.enum";

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

  constructor(private candidateService: CandidatesService,
              private route: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder) {
  }



  private initObservable() {
    this.loading$ = this.candidateService.laoding$;
    this.candidate$ = this.route.params.pipe(
      switchMap((params)=> this.candidateService.getCandidateById(+params['id']))
    )

    console.log(this.candidate$)
  }


  onHire() {
    this.candidate$.pipe(
      take(1),
      tap(candidate => {
        this.candidateService.hireCandidate(candidate.id);
        this.onGoBack()
      }),
    ).subscribe()
  }

  onRefuse() {
    this.candidate$.pipe(
      take(1),
      tap(candidate => {
        this.candidateService.refuseCandidate(candidate.id);
        this.onGoBack()
      }),
    ).subscribe()
  }

  onGoBack() {
    this.router.navigate(['/reactive-state/candidate']);
  }
}
