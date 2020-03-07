import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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
    private fb: FormBuilder
  ) { }

  ngOnInit() {
 
  }

  public onSubmit(){
    console.log(this.formRegister.value);
  }
  private matchPasswords(group: FormGroup){
    if(group){
      const password1 = group.controls['password1'].value;
      const password2 = group.controls['password2'].value;
      if(password1 == password2) return null;
    }
    return {matching: false};
  }
}
