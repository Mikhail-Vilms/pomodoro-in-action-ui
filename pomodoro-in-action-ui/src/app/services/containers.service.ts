import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Container } from '../model/container';

@Injectable({
  providedIn: 'root'
})
export class ContainersService {
  readonly BaseURI = 'http://localhost:52116';

  constructor(private http: HttpClient) { }
  
  createNewContainer(newContainerJson){
    return this.http.post(this.BaseURI + '/api/containers', newContainerJson, {headers: this.getHeaders()});
  }

  getContainer(containerId){
    return this.http.get(this.BaseURI + '/api/containers/' + containerId, {headers: this.getHeaders()});
  }  
  
  updateContainer(container: Container){
    return this.http.put(this.BaseURI + '/api/containers/' + container.id, container, {headers: this.getHeaders()});
  }

  deleteContainer(containerId){
    return this.http.delete(this.BaseURI + '/api/containers/' + containerId, {headers: this.getHeaders()});
  }
  
  getHeaders(){
    return new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
    });
  }
}