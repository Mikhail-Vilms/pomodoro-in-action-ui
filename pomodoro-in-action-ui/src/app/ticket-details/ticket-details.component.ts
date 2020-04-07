import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Ticket } from '../model/ticket';
import { TicketsService } from '../services/tickets.service';

@Component({
  selector: 'app-ticket-details',
  templateUrl: './ticket-details.component.html',
  styleUrls: ['./ticket-details.component.css']
})
export class TicketDetailsComponent implements OnInit {
  private ticket: Ticket;
  formGroup: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private service: TicketsService,
    private route: ActivatedRoute) 
    {
      this.getTicket();
    }

  getTicket(): void {
    const ticketId = this.route.snapshot.paramMap.get('id');
    this.service.getTicket(ticketId)
      .subscribe(ticket => {
        this.ticket = ticket as Ticket;
        this.formGroup.value.name = this.ticket.displayName;
        this.formGroup.setValue({
          name: this.ticket.displayName,
          description: this.ticket.description
        })
      });
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.formGroup = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', []]
    });
  }

  updateTicket(){
    this.ticket.displayName = this.formGroup.value.name;
    this.ticket.description = this.formGroup.value.description;
    
    this.service.updateTicket(this.ticket)      
      .subscribe((res: any) => {
        this.returnToBoard();
      },
      err => {
        console.log(err);
      });
  }

  deleteTicket(){
    this.service.deleteTicket(this.ticket.id)      
      .subscribe((res: any) => {
        this.returnToBoard();
      },
      err => {
        console.log(err);
      });
  }

  returnToBoard(){
    this.router.navigate(['/boards/' + this.ticket.kanbanContainer.boardId]);
  }
}
