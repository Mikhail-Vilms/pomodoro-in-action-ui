import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  readonly BaseURI = 'http://localhost:52116';

  constructor(private http: HttpClient) { }
  
  registerPost(userName : string, email : string, password : string) {
    var body = {
      UserName: userName,
      Email: email,
      Password: password
    };

    return this.http.post(this.BaseURI + '/api/AppUsers/Register', body);
  }

  loginPost(email: string, password: string) {
    var body = {
      Email: email,
      Password: password
    };
    
    return this.http.post(this.BaseURI + '/api/AppUsers/Login', body);
  }
}