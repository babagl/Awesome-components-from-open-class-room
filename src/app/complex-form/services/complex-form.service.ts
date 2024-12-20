import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, delay, mapTo, Observable, of} from "rxjs";
import {ComplexFormValue} from "../models/complex-form-value.model";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ComplexFormService {

  constructor(private http: HttpClient) {
  }

  saveUserInfo(formValue: ComplexFormValue):Observable<Boolean>{
    return this.http.post(`${environment.apiUrl}/users`,formValue).pipe(
      mapTo(true),
      delay(1000),
      catchError(()=>of(false)
        .pipe(delay(1000)))
    )
  }
}
