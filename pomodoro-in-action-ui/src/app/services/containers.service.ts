import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ContainersService {
  readonly BaseURI = 'http://localhost:52116';

  constructor(private http: HttpClient) { }
  
  createNewContainer(newContainerJson){
    console.log(" === new Container: " + JSON.stringify(newContainerJson));
    
    var headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
    });

    return this.http.post(this.BaseURI + '/api/Containers', newContainerJson, {headers: headers});
  }
}