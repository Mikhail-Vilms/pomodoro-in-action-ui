import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

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

    return this.http.post(this.BaseURI + '/api/Boards', boardJson, {headers: headers});
  }

  getPersonalBoards(){
    var headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
    });

    return this.http.get(this.BaseURI + '/api/Boards', {headers: headers});
  }

  getBoard(boardId){
    console.log("*** 2) boardId: " + boardId);

    var headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
    });

    return this.http.get(this.BaseURI + '/api/Boards/' + boardId, {headers: headers});
  }
}