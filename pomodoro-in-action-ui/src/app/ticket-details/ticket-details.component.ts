import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Ticket } from '../model/ticket';
import { TicketsService } from '../services/tickets.service';
import { ActivatedRoute } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';

@Component({
  selector: 'app-ticket-details',
  templateUrl: './ticket-details.component.html',
  styleUrls: ['./ticket-details.component.css']
})
export class TicketDetailsComponent implements OnInit {
  private ticket: Ticket;
  private editable: boolean;
  formGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private ticketsService: TicketsService,
    private route: ActivatedRoute) 
    {
      this.editable = false;
      this.getTicket();
    }

  getTicket(): void {
    const ticketId = this.route.snapshot.paramMap.get('id');
    this.ticketsService.getTicket(ticketId)
      .subscribe(ticket => {
        this.ticket = ticket as Ticket;
        
        this.formGroup.value.name = this.ticket.displayName;
        this.formGroup.setValue({
          name: this.ticket.displayName,
          description: this.ticket.description
        })
        console.log("this.formGroup.value.name: " + this.formGroup.value.name);
      });
  }

  ngOnInit(): void {
    this.initForm();
    
  }

  // getTicket(ticketId): void {
  //   this.ticketsService.getTicket(ticketId)
  //     .subscribe(
  //       (ticket) => {
  //         this.ticket = ticket as Ticket;
  //         console.log("1) this.ticket: " + JSON.stringify(this.ticket));
  //       }, 
  //       (err) => console.log(err),
  //       () => {
  //         this.formGroup.value.name = this.ticket.displayName;
  //         this.formGroup.value.description = this.ticket.description;
  //       });
  // }

  initForm() {
    this.formGroup = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', []]
    });
  }

  switchEditable(){

  }
  
}
