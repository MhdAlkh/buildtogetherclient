import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../core/service/auth.service";
import {TokenStorageService} from "../../../core/service/token-storage.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signin-page',
  templateUrl: './signin-page.component.html',
  styleUrls: ['./signin-page.component.scss']
})
export class SigninPageComponent implements OnInit {

  signInUpForm: FormGroup;
  signInOrUp: boolean = true;  // True for SignIn - False for SignUp
  errorMessage: string = "";

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router) {
    this.signInUpForm = formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]],
    });
  }

  ngOnInit(): void {}




  public enterInApp(): void {
    console.log(this.signInUpForm.value)

    if (this.signInUpForm.invalid) {
      this.errorMessage = "Please, enter a correct mail and password"
    } else {

      if (this.signInOrUp) {
        // Signin
        this.authService.signIn(this.signInUpForm.value.email, this.signInUpForm.value.password).subscribe(
          value => {
            console.log(value)
          },
          error => {
            this.errorMessage = error
          })


      } else {
        // Signup
        this.authService.signUp(this.signInUpForm.value.email, this.signInUpForm.value.password).subscribe(
          value => {
            console.log(value)
          },
          error => {
            this.errorMessage = error
          })
        this.authService.signIn(this.signInUpForm.value.email, this.signInUpForm.value.password).subscribe(
          value => {
            console.log(value)
          },
          error => {
            this.errorMessage = error
          })
      }
    }
  }

  public login(): void {


  }


  public switchSignInUp(): void {
    this.signInOrUp = !this.signInOrUp;
  }

}
