import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Board } from '../model/board';
import { Container } from '../model/container';
import { Ticket } from '../model/ticket';
import { ContainerCreateComponent } from '../container-create/container-create.component';
import { BoardsService } from 'src/app/services/boards.service';
import { ActivatedRoute } from '@angular/router';
import { TicketCreateComponent } from '../ticket-create/ticket-create.component';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  board: Board;
  boardId;

  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private service: BoardsService) { }

  ngOnInit(): void {
    this.boardId = this.route.snapshot.paramMap.get('id');
    this.fetchBoard(this.boardId);
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
    this.service.setSortOrderForContainers(this.board).subscribe(response => console.log("response: " + JSON.stringify(response)));
  }

  dropTicket(event: CdkDragDrop<Ticket[]>, containerId) {
    console.log("containerId: " + containerId);

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
      width: '30%',
      data: {currentBoard: this.board}
    });
  }
  
  // ==================================================================

  openDialogCreateTicket(currentContainer: Container): void {
    const dialogRef = this.dialog.open(TicketCreateComponent, {
      width: '30%',
      data: {
        currentBoardId: this.board.id,
        currentContainerId: currentContainer.id,
        currentContainerLength: currentContainer.tickets.length
      }
    });
  }
}


