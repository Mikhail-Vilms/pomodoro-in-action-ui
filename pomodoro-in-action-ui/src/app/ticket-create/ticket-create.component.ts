import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TicketsService } from '../services/tickets.service';
import { Ticket } from '../model/ticket';

@Component({
  selector: 'app-ticket-create',
  templateUrl: './ticket-create.component.html',
  styleUrls: ['./ticket-create.component.css']
})
export class TicketCreateComponent implements OnInit {
  private currentBoardId: number;
  private currentContainerId: number;
  private currentContainerLength: number;
  formGroup: FormGroup;
  
  constructor(    
    private formBuilder: FormBuilder,
    private containersService: TicketsService,
    public dialogRef: MatDialogRef<TicketCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {
      this.currentBoardId = data["currentBoardId"] as number;
      this.currentContainerId = data["currentContainerId"] as number;
      this.currentContainerLength = data["currentContainerLength"] as number;
    }

  ngOnInit(): void {
    this.initCreateTicketForm();
  }

  initCreateTicketForm() {
    this.formGroup = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', []]
    });
  }

  createNewTicket() {
    if (!this.formGroup.valid) {
      return;
    }

    let newTicketJson = {
      "displayName": this.formGroup.value.name,
      "description": this.formGroup.value.description,
      "sortOrder": this.currentContainerLength,
      "kanbanContainerId": this.currentContainerId,
    };

    console.log("newTicketJson: " + JSON.stringify(newTicketJson));

    this.containersService.createNewTicket(newTicketJson)
      .subscribe(response => {

        console.log("response: " + JSON.stringify(response));

        let createdTicket = 
        {
          id: response["id"],
          displayName: response["displayName"],
          description: response["description"],
          containerId: response["kanbanContainerId"],
        } as Ticket;

        this.dialogRef.close({createdTicket: createdTicket});
      },
      err => {
      });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
