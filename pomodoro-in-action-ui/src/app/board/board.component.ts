import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Board } from '../model/board';
import { Container } from '../model/container';
import { Ticket } from '../model/ticket';
import { ContainerCreateComponent } from '../container-create/container-create.component';
import { BoardsService } from 'src/app/services/boards.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TicketCreateComponent } from '../ticket-create/ticket-create.component';
import { TicketDetailsComponent } from '../ticket-details/ticket-details.component';
import { TicketsService } from '../services/tickets.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  board: Board;
  boardId;

  constructor(
    private router: Router, 
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private service: BoardsService,
    private ticketsService: TicketsService) {
      this.boardId = this.route.snapshot.paramMap.get('id');
      this.fetchBoard(this.boardId);
    }

  ngOnInit(): void {
  }

  fetchBoard(boardId){
    this.service
      .getBoard(boardId)
      .subscribe(response => {         
        this.board = response as Board;
      });
  }

  // ==================================================================

  dropContainer(event: CdkDragDrop<Container[]>) {
    moveItemInArray(this.board.containers, event.previousIndex, event.currentIndex);
    this.service
      .setSortOrderForContainers(this.board)
      //.subscribe(response => console.log("response: " + JSON.stringify(response)));

      .subscribe(response => {
        console.log(" *** Containers was reordered successfully");
      },
      err => {
        console.log(err);
      });
  }

  dropTicket(event: CdkDragDrop<Ticket[]>, containerId) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }

    this.service
      .setSortOrderForTickets(containerId, event.container.data)
      .subscribe(response => console.log("response: " + JSON.stringify(response)));
  }

  getConnectedList(): any[] {
    return this.board.containers.map(x => `${x.id}`);
  }

  // ==================================================================

  openDialogCreateContainer(): void {
    const dialogRef = this.dialog.open(ContainerCreateComponent, {
      width: '450px',
      data: {currentBoard: this.board}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result){
        this.board.containers.push(result["createdContainer"] as Container);
      }
    });
  }
  
  // ==================================================================

  openDialogCreateTicket(currentContainer: Container): void {
    const dialogRef = this.dialog.open(TicketCreateComponent, {
      width: '450px',
      data: {
        currentBoardId: this.board.id,
        currentContainerId: currentContainer.id,
        currentContainerLength: currentContainer.tickets.length
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result){
        let ticket = result["createdTicket"] as Ticket;
        this.board
          .containers.find(container => container.id == ticket.containerId)
          .tickets.push(ticket);
      }
    });
  }

  openDialogTicketDetails(ticket: Ticket){
    this.router.navigateByUrl('tickets/' + ticket.id);
  }
}


