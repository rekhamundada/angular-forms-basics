import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import 'rxjs/add/operator/catch'

import { Employee } from '../models/employee.model';

@Injectable()
export class FormPosterService {

  constructor(
    private http: Http
  ) { }
  extractData(res: Response){
    let body = res.json()
    return body.fields || { }
  }

  handleError(error: any){
    console.error('error',error)
    return Observable.throw(error.statusText)
  }

  extractLanguages(res: Response){
    let body = res.json()
    return body.data || { }
  }

  getLanguages(): Observable<any> {
    return this.http.get('http://localhost:3100/getlanguages')
      .delay(3000)
      .map(this.extractLanguages)
      .catch(this.handleError);
  }
  postEmployeeForm(employee: Employee): Observable<any> {
    console.log('posting employee: ', employee)

    let body= JSON.stringify(employee)
    let headers = new Headers({'Content-Type': 'application/json'})
    let options = new RequestOptions({headers: headers})

    return this.http.post('http://localhost:3100/postemployee',body,options)
        .map(this.extractData)
        .catch(this.handleError)
  }
}
