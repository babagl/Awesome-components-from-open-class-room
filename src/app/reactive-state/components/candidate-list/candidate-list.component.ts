import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {CandidatesService} from "../../services/candidates.service";
import {combineLatest, map, Observable, startWith} from "rxjs";
import {Candidate} from "../../models/candidate.model";
import {MatCard, MatCardTitle, MatCardTitleGroup} from "@angular/material/card";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {AsyncPipe} from "@angular/common";
import {MatListItem, MatListItemAvatar, MatNavList} from "@angular/material/list";
import {RouterLink} from "@angular/router";
import {MatLine, MatOption} from "@angular/material/core";
import {MatFormField, MatSuffix} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FormBuilder, FormControl, ReactiveFormsModule} from "@angular/forms";
import {CandidateSearchType} from "../../enums/candidate-search-type.enum";
import {MatIcon} from "@angular/material/icon";
import {MatSelect} from "@angular/material/select";

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
    MatLine,
    MatFormField,
    MatInput,
    ReactiveFormsModule,
    MatIcon,
    MatSuffix,
    MatSelect,
    MatOption
  ],
  templateUrl: './candidate-list.component.html',
  styleUrl: './candidate-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CandidateListComponent implements OnInit {
  loading$!: Observable<boolean>;
  candidates$!: Observable<Candidate[]>;
  searchCtrl!: FormControl;
  searchTypeCtrl!: FormControl;
  searchTypeOptions!: {
    value: CandidateSearchType,
    label: string
  }[];

  ngOnInit() {
    this.initForm()
    this.initObservable()
    this.candidatService.getCondidatesFromServer();
  }

  constructor(private candidatService: CandidatesService,private formBuilder: FormBuilder) {
  }

  private initObservable() {
    this.loading$ = this.candidatService.laoding$;
    const search$: Observable<string> = this.searchCtrl.valueChanges.pipe(
      startWith(this.searchCtrl.value),
      map(value => value.toLowerCase())
    );
    const searchType$: Observable<CandidateSearchType> = this.searchTypeCtrl.valueChanges.pipe(
      startWith(this.searchTypeCtrl.value)
    )

    this.candidates$ = combineLatest([
        search$,
        searchType$,
        this.candidatService.candidates$
      ]
    ).pipe(
      map(([search, searchType, candidates]) => candidates.filter(candidate => candidate[searchType]
        .toLowerCase()
        .includes(search as string))
      )
    );
  }

  private initForm(){
    this.searchCtrl = this.formBuilder.control('');
    this.searchTypeCtrl! = this.formBuilder.control(CandidateSearchType.LASTNAME);
    this.searchTypeOptions = [
      {
        value: CandidateSearchType.LASTNAME,
        label: "nom"
      },
      {
        value: CandidateSearchType.FIRSTNAME,
        label: "prenom"
      },
      {
        value: CandidateSearchType.COMPANY,
        label: "Entreprise"
      }
    ]
  }
}
