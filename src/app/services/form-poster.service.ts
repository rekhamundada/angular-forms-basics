import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch'
import { Employee } from '../models/employee.model';

@Injectable()
export class FormPosterService {

  constructor(
    private http: Http
  ) { }
  extractData(res: Response){
    return res.json().data || { }
  }

  handleError(error: any){
    console.error('error',error)
    return Observable.throw(error.statusText)
  }
  postEmployeeForm(employee: Employee): Observable<any> {
    console.log('posting employee: ', employee)
    let body= JSON.stringify(employee)
    let headers = new Headers({'content type': 'application/json'})
    let options = new RequestOptions({headers: headers})
    return this.http.post('api/postForm.json',employee,options)
        .map(this.extractData)
        .catch(this.handleError)
  }
}
