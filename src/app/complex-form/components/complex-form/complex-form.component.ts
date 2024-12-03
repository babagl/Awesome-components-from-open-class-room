import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatCard, MatCardActions, MatCardSubtitle, MatCardTitle} from "@angular/material/card";
import {MatButton} from "@angular/material/button";
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInput} from "@angular/material/input";
import {MatRadioModule} from '@angular/material/radio';
import {map, Observable, startWith, tap} from "rxjs";
import {AsyncPipe} from "@angular/common";
import {ComplexFormService} from "../../services/complex-form.service";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {validValidator} from "../../validators/valid.validator";
import {confirmEqualsValidator} from "../../validators/confirm-equals.validator";

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
    MatProgressSpinner,
  ],
  templateUrl: './complex-form.component.html',
  styleUrl: './complex-form.component.scss'
})
export class ComplexFormComponent implements OnInit {

  loading = false;
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
  showEmailError$!: Observable<boolean>;
  showPasswordError$!: Observable<boolean>;


  constructor(private formBuilder: FormBuilder, private complexformService:ComplexFormService) {
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
    this.loading = true;
    this.complexformService.saveUserInfo(this.personalInfoForm.value).pipe(
      tap(saved=>{
        this.loading = false;
        if (saved){
          this.resetForm()
        }else {
          console.log("echec de l'enregistrement");
        }
      })
    ).subscribe();
    console.log(this.mainForm.value);
  }

  private resetForm(): void {
    this.mainForm.reset();
    this.contactPreferenceCtrl.patchValue('email');
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
    },{
      validators: [confirmEqualsValidator('email', 'confirm')],
      updateOn: 'blur'
    })
    this.passwordCtrl = this.formBuilder.control('',Validators.required);
    this.confirmPasswordCtrl = this.formBuilder.control('', Validators.required);
    this.loginInfoForm = this.formBuilder.group({
      username: ["", Validators.required],
      password: this.passwordCtrl,
      confirmPassword: this.confirmPasswordCtrl,
    },{
      validators: [confirmEqualsValidator('password', 'confirmPassword')],
      updateOn: 'blur'
    })
  }

  private initFormObservable() {
    this.showEmailCtrl$ = this.contactPreferenceCtrl.valueChanges.pipe(
      startWith(this.contactPreferenceCtrl.value),
      map(preference => preference === "email"),
      tap((showEmailCtrl)=> this.setEmailValidator(showEmailCtrl))
    )
    console.log(this.showEmailCtrl$)
    this.showPhoneCtrl$ = this.contactPreferenceCtrl.valueChanges.pipe(
      startWith(this.contactPreferenceCtrl.value),
      map(preference => preference === "phone"),
      tap((showPhoneCtrl)=> this.setPhoneValidator(showPhoneCtrl))
    )
    console.log(this.showPhoneCtrl$)
    this.showEmailError$ = this.emailForm.statusChanges.pipe(
      map(status => status === "INVALID"  && this.emailCtrl.value && this.confirmEmailCtrl.value),
    )

    this.showPasswordError$ = this.loginInfoForm.statusChanges.pipe(
      map(status=> status === "INVALID" && this.passwordCtrl.value && this.confirmPasswordCtrl.value
        && this.loginInfoForm.hasError('confirmEquals') )
    )
  }


  private setEmailValidator(showEmailCtrl:boolean) {
    if (showEmailCtrl){
      this.emailCtrl.addValidators([Validators.required, Validators.email]);
      this.confirmEmailCtrl.addValidators([Validators.required, Validators.email]);
    }else {
      this.emailCtrl.clearValidators();
      this.confirmEmailCtrl.clearValidators();
    }
    this.emailCtrl.updateValueAndValidity();
    this.confirmEmailCtrl.updateValueAndValidity();
  }

  private setPhoneValidator(showPhoneCtrl:boolean) {
    if (showPhoneCtrl) {
      //ajouter validators
      this.phoneCtrl.addValidators([Validators.required , Validators.minLength(9), Validators.maxLength(9)]);
    }else{
      //retirer validators
      this.phoneCtrl.clearValidators();
    }

    //reverifier dans les champs pour voir les validators requis
    this.phoneCtrl.updateValueAndValidity();
  }

  getFormControlErrorText(crtl: AbstractControl){
    if (crtl.hasError('required')) {
      return 'ce champ est requis';
    }else if (crtl.hasError('email')){
      return 'Email d\'entrer une adresse mail valide';
    } else if(crtl.hasError('minlength')){
      return 'Ce numero de telephone ne contient pas assez de chiffres'
    }else if (crtl.hasError('maxlength')){
      return 'Ce numero de telephone ne contient trop de chiffres'
    }else {
      return 'Ce champs contient une erreur';
    }
  }
}
