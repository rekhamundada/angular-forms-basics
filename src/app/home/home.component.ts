import {Component} from '@angular/core';
import { NgForm } from '@angular/forms';

import { Employee } from '../models/employee.model';
import { FormPosterService } from '../services/form-poster.service';



@Component({
  selector: 'home',
  styleUrls: ['./home.component.css'],
  templateUrl: './home.component.html'
})
export class HomeComponent {
  languages = ['English' , 'Hindi', 'Spanish' , 'Others'];
  employee = new Employee('', '',true,'', 'default');
  hasPrimaryLanguageError= false;

  constructor(private formPosterService: FormPosterService){ }

  firstNameToUpperCase(value: string) {
    if(value.length > 0)
    this.employee.firstName = value.charAt(0).toLocaleUpperCase() + value.slice(1)
    else
    this.employee.firstName = value;
  }
  validatePrimaryLanguage(value) {
    console.log('lang',this.employee.primaryLanguage)
    if(value === 'default')
      this.hasPrimaryLanguageError = true;
    else
      this.hasPrimaryLanguageError = false;
  }

  submitForm(form: NgForm){
    console.log(form.value)
  this.validatePrimaryLanguage(this.employee.primaryLanguage)
  if(this.hasPrimaryLanguageError) return
   this.formPosterService.postEmployeeForm(this.employee)
    // .subscribe(
    //   data => console.log('success' , data),
    //   err => console.log('Error' , err)
    // )
  }
}
