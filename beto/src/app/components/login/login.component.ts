import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { FirestoreService } from 'src/app/services/firestore.service';

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
    private fs: FirestoreService,
    private snackbar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit() {
  }

  public onSubmit(){
    // const credentials: {"email":string, "password":string} = this.loginForm.value;
    const {email, password}:{"email":string, "password":string} = this.loginForm.value;

    this.isLoading = true;
    // this.authService.login(credentials)
    //   .subscribe(
    //     (u) => {
    //       this.notification('Login successfuly!');
    //       this.router.navigateByUrl('/app');
    //       this.isLoading = false;
    //     },
    //     (e) => {
    //       this.notification(e.error.msg);
    //       this.isLoading = false;
    //     }
    //   )
    
    this.fs.loginFire(password, email)
      .subscribe(
        (u) => {
          this.notification('login realizado com sucesso.');
          this.router.navigateByUrl('/');
          this.isLoading = false;
        },
        (e) => {
          this.notification(e);
          this.isLoading = false;
        }
      )
  }
  private notification(msg){
    this.snackbar.open(msg, 'ok', {duration:3000});
  }
}
