import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User, UserFirestore } from '../../models/user';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { FirestoreService } from '../../services/firestore.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  // segundo parâmetro do formBuilder é para custom validators, objeto com metodo,
  // somente a referência do método (não a chamada)
  public formRegister = this.fb.group({
    "firstname": ['', [Validators.required]],
    "lastname": ['', [Validators.required]],
    "address": ['', [Validators.required]],
    "city": ['', [Validators.required]],
    "state": ['', [Validators.required]],
    "phone": ['', [Validators.required]],
    "mobilephone": ['', [Validators.required]],
    "email": ['', [Validators.required, Validators.email]],
    "password1": ['', [Validators.required, Validators.minLength(6)]],
    "password2": ['', [Validators.required, Validators.minLength(6)]],
  }, {validator: this.matchPasswords})
  public states: string[] = [
    'Acre (AC)',
    'Alagoas (AL)',
    'Amapá (AP)',
    'Amazonas (AM)',
    'Bahia (BA)',
    'Ceará (CE)',
    'Distrito Federal (DF)',
    'Espírito Santo (ES)',
    'Goiás (GO)',
    'Maranhão (MA)',
    'Mato Grosso (MT)',
    'Mato Grosso do Sul (MS)',
    'Minas Gerais (MG)',
    'Pará (PA)',
    'Paraíba (PB)',
    'Paraná (PR)',
    'Pernambuco (PE)',
    'Piauí (PI)',
    'Rio de Janeiro (RJ)',
    'Rio Grande do Norte (RN)',
    'Rio Grande do Sul (RS)',
    'Rondônia (RO)',
    'Roraima (RR)',
    'Santa Catarina (SC)',
    'São Paulo (SP)',
    'Sergipe (SE)',
    'Tocantins (TO)'
  ]
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackbar: MatSnackBar,
    private router: Router,
    private fs: FirestoreService
  ) { }

  ngOnInit() {
 
  }

  public onSubmit(){
    // MongoDB:
    // const user: User = {...this.formRegister.value, "password": this.formRegister.value.password1};
    // this.authService.register(user)
    //   .subscribe(
    //     (u) => {
    //       this.notification('User register successfuly!');
    //       this.router.navigateByUrl('/auth/login');
    //     },
    //     (e) => this.notification(e.error.msg)
    //   );

    // Firestore
    const user: UserFirestore = {...this.formRegister.value, "password":this.formRegister.value.password1};
    this.fs.registerFire(user)
      .subscribe(
        (u) => {
          this.notification('Usuário registrado com sucesso');
          this.router.navigateByUrl('/auth/login');
        },
        (e) => {this.notification(e)}
      )
  }
  private matchPasswords(group: FormGroup){
    if(group){
      const password1 = group.controls['password1'].value;
      const password2 = group.controls['password2'].value;
      if(password1 == password2) return null;
    }
    return {matching: false};
  }
  private notification(msg){
    this.snackbar.open(msg, 'ok', {duration: 3000});
  }
}
