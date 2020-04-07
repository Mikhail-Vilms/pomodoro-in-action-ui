import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Board } from '../model/board';
import { Container } from '../model/container';
import { Ticket } from '../model/ticket';

@Injectable({
  providedIn: 'root'
})
export class BoardsService {
  readonly BaseURI = 'http://localhost:52116';

  constructor(private http: HttpClient) { }
  
  createNewBoard(newBoardJson){
    var headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
    });

    console.log("newBoardJson: " + JSON.stringify(newBoardJson));
    
    return this.http.post(this.BaseURI + '/api/boards', newBoardJson, {headers: headers});
  }

  getPersonalBoards(){
    var headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
    });

    return this.http.get(this.BaseURI + '/api/boards', {headers: headers});
  }

  getBoard(boardId){
    var headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
    });

    return this.http.get(this.BaseURI + '/api/boards/' + boardId, {headers: headers});
  }

  setSortOrderForContainers(board: Board){
    return this.http.post(
      this.BaseURI + '/api/boards/' + board.id + '/set_sort_order', 
      board.containers.map(container => container.id),
      this.getHeaders()
    );
  }

  setSortOrderForTickets(containerId: number, tickets: Ticket[]){
    return this.http.post(
      this.BaseURI + '/api/containers/' + containerId + '/set_sort_order',
      tickets.map(ticket => ticket.id),
      this.getHeaders());
  }
  
  getHeaders(){
    return {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      })
    };
  }
}