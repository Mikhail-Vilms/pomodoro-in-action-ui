import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Ticket } from '../model/ticket';

@Injectable({
  providedIn: 'root'
})
export class TicketsService {
  readonly BaseURI = 'http://localhost:52116';

  constructor(private http: HttpClient) { }
  
  createNewTicket(newTicketJson){
    return this.http.post(this.BaseURI + '/api/tickets', newTicketJson, {headers: this.getHeaders()});
  }

  getTicket(ticketId){
    return this.http.get(this.BaseURI + '/api/tickets/' + ticketId, {headers: this.getHeaders()});
  }

  updateTicket(ticket: Ticket){
    return this.http.put(this.BaseURI + '/api/tickets/' + ticket.id, ticket, {headers: this.getHeaders()});
  }

  deleteTicket(ticketId){
    return this.http.delete(this.BaseURI + '/api/tickets/' + ticketId, {headers: this.getHeaders()});
  }

  getHeaders(){
    return new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
    });
  }
}