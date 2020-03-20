import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TicketsService {
  readonly BaseURI = 'http://localhost:52116';

  constructor(private http: HttpClient) { }
  
  createNewTicket(newTicketJson){
    var headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
    });

    return this.http.post(this.BaseURI + '/api/tickets', newTicketJson, {headers: headers});
  }
}