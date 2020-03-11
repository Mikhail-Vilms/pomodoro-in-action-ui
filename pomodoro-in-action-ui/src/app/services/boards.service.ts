import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Board } from '../models/board';

@Injectable({
  providedIn: 'root'
})
export class BoardsService {

  readonly BaseURI = 'http://localhost:52116';

  constructor(private http: HttpClient) { }
  
  createNewBoard(boardJson){
    var headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
    });

    // headers.append('Authorization', 'Bearer ' + localStorage.getItem("token"));
    // headers.append('Content-Type', 'application/json');
    console.log("boardJson: " + JSON.stringify(boardJson));

    return this.http.post(this.BaseURI + '/api/Boards', boardJson, {headers: headers});
  }

  getPersonalBoards(){
    var headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
    });

    return this.http.get(this.BaseURI + '/api/Boards', {headers: headers});
  }
}