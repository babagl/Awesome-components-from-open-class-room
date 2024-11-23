import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatCard, MatCardActions, MatCardSubtitle, MatCardTitle} from "@angular/material/card";
import {MatButton} from "@angular/material/button";
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInput} from "@angular/material/input";
import {MatRadioModule} from '@angular/material/radio';
import {map, Observable, startWith} from "rxjs";
import {AsyncPipe} from "@angular/common";

@Component({
  selector: 'app-complex-form',
  standalone: true,
  imports: [
    MatCard,
    ReactiveFormsModule,
    MatCardTitle,
    MatCardSubtitle,
    MatCardActions,
    MatButton,
    MatFormFieldModule,
    MatInput,
    MatRadioModule,
    AsyncPipe,
  ],
  templateUrl: './complex-form.component.html',
  styleUrl: './complex-form.component.scss'
})
export class ComplexFormComponent implements OnInit {

  mainForm!: FormGroup;
  personalInfoForm!: FormGroup;
  emailCtrl!: FormControl;
  confirmEmailCtrl!: FormControl;
  emailForm!: FormGroup;
  contactPreferenceCtrl!: FormControl;
  phoneCtrl!: FormControl;
  passwordCtrl!: FormControl;
  confirmPasswordCtrl!: FormControl;
  loginInfoForm!: FormGroup;

  showEmailCtrl$!: Observable<boolean>;
  showPhoneCtrl$!: Observable<boolean>;


  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.initFormControls();
    this.initMainForm();
    this.initFormObservable();
  }


  private initMainForm(): void {
    this.mainForm = this.formBuilder.group({
      personalInfo: this.personalInfoForm,
      contactPreference: this.contactPreferenceCtrl,
      email: this.emailForm,
      phone: this.phoneCtrl,
      loginInfo: this.loginInfoForm
    });
  }

  onSubmitForm() {
    console.log(this.mainForm.value);
  }

  private initFormControls() {
    this.personalInfoForm = this.formBuilder.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
    })
    this.contactPreferenceCtrl = this.formBuilder.control('email');
    this.phoneCtrl = this.formBuilder.control('');
    this.emailCtrl = this.formBuilder.control('');
    this.confirmEmailCtrl = this.formBuilder.control('');
    this.emailForm = this.formBuilder.group({
      email: this.emailCtrl,
      confirm: this.confirmEmailCtrl,
    })
    this.passwordCtrl = this.formBuilder.control('',Validators.required);
    this.confirmPasswordCtrl = this.formBuilder.control('', Validators.required);
    this.loginInfoForm = this.formBuilder.group({
      username: ["", Validators.required],
      password: this.passwordCtrl,
      confirmPassword: this.confirmPasswordCtrl,
    })
  }

  private initFormObservable() {
    this.showEmailCtrl$ = this.contactPreferenceCtrl.valueChanges.pipe(
      startWith(this.contactPreferenceCtrl.value),
      map(preference => preference === "email")
    )
    console.log(this.showEmailCtrl$)
    this.showPhoneCtrl$ = this.contactPreferenceCtrl.valueChanges.pipe(
      startWith(this.contactPreferenceCtrl.value),
      map(preference => preference === "phone")
    )
    console.log(this.showPhoneCtrl$)
  }
}
