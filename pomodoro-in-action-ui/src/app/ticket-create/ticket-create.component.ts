import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { TicketsService } from '../services/tickets.service';

@Component({
  selector: 'app-ticket-create',
  templateUrl: './ticket-create.component.html',
  styleUrls: ['./ticket-create.component.css']
})
export class TicketCreateComponent implements OnInit {
  private currentBoardId: number;
  private currentContainerId: number;
  private currentContainerLength: number;
  newTicketGroup: FormGroup;
  private newTicketJson;
  
  constructor(    
    private formBuilder: FormBuilder,
    private containersService: TicketsService,
    private router: Router,
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
    this.newTicketGroup = this.formBuilder.group({
      displayName: ['', Validators.required],
      description: ['', []]
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onAddClick() {
    console.log("*** onAddClick : ");

    if (!this.newTicketGroup.valid) {
      return;
    }

    this.newTicketJson = {
      "displayName": this.newTicketGroup.value.displayName,
      "description": this.newTicketGroup.value.description,
      "sortOrder": this.currentContainerLength,
      "kanbanContainerId": this.currentContainerId,
    };

    this.containersService
      .createNewTicket(
        this.newTicketJson
      )
      .subscribe((res: any) => {
        this.router
          .navigate(['/boards/' + this.currentBoardId])
          .then(() => {
            window.location.reload();
          });
      },
      err => {
      });
  }
}
