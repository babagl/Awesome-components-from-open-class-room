import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, delay, Observable, tap} from "rxjs";
import {Candidate} from "../models/candidate.model";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CandidatesService {

  private _loading$ = new BehaviorSubject<boolean>(false);
  private _candidates$ = new BehaviorSubject<Candidate[]>([]);
  private lastCandidatesLoad = 0;

  constructor(private http: HttpClient) {
  }

  get laoding$(): Observable<boolean> {
    return this._loading$.asObservable();
  }

  get candidates$(): Observable<Candidate[]> {
    return this._candidates$.asObservable()
  }

  private setLoadingStatus(loading:boolean){
    this._loading$.next(loading);
  }

  getCondidatesFromServer(){
    if (Date.now() - this.lastCandidatesLoad <= 300000){
      return;
    }
    this.setLoadingStatus(true);
    this.http.get<Candidate[]>(`${environment.apiUrl}/candidates`).pipe(
      delay(1000),
      tap(candidates => {
        this.lastCandidatesLoad = Date.now();
        this._candidates$.next(candidates);
        this.setLoadingStatus(false);
      })
    ).subscribe()
  }




}
