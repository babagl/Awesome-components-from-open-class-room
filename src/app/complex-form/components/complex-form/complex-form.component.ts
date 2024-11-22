import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatCard, MatCardActions, MatCardSubtitle, MatCardTitle} from "@angular/material/card";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-complex-form',
  standalone: true,
  imports: [
    MatCard,
    ReactiveFormsModule,
    MatCardTitle,
    MatCardSubtitle,
    MatCardActions,
    MatButton
  ],
  templateUrl: './complex-form.component.html',
  styleUrl: './complex-form.component.scss'
})
export class ComplexFormComponent implements OnInit {

  mainForm!: FormGroup;
  personnalInfoForm!: FormGroup;
  emailCtrl!: FormControl;
  confirmEmailCtrl!: FormControl;
  emailForm!: FormGroup;
  contactPreferenceCrtl!: FormControl;
  phoneCtrl!: FormControl;
  passwordCtrl!: FormControl;
  confirmPasswordCtrl!: FormControl;
  loginInfoForm!: FormGroup;


  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.initMainForm();
    this.initFormControls();
  }


  private initMainForm() {
    this.mainForm = this.formBuilder.group({

    })
  }

  onSubmitForm() {

  }

  private initFormControls() {
    this.personnalInfoForm = this.formBuilder.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
    })
    this.contactPreferenceCrtl = this.formBuilder.control('email');
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
}
