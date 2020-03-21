import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm = this.fb.group({
    "email": ['', [Validators.required, Validators.email]],
    "password": ['', [Validators.required, Validators.minLength(6)]]
  });
  public isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackbar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit() {
  }

  public onSubmit(){
    const credentials: {"email":string, "password":string} = this.loginForm.value;
    this.isLoading = true;
    this.authService.login(credentials)
      .subscribe(
        (u) => {
          this.notification('Login successfuly!');
          this.router.navigateByUrl('/app/firebase');
          this.isLoading = false;
        },
        (e) => {
          this.notification(e.error.msg);
          this.isLoading = false;
        }
      )
  }
  private notification(msg){
    this.snackbar.open(msg, 'ok', {duration:3000});
  }
}
