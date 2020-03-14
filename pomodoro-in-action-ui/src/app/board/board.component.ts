import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Board } from '../model/board';
import { Container } from '../model/container';
import { Ticket } from '../model/ticket';
import { ContainerCreateComponent } from '../container-create/container-create.component';
import { BoardsService } from 'src/app/services/boards.service';
import { ActivatedRoute } from '@angular/router';

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
    console.log("*** 2) boardId: " + this.boardId);

    this.service
      .getBoard(boardId)
      .subscribe(response => {         
        this.board = response as Board;
      });
  }

  // fetchBoard(){
  //   return {
  //     "displayName": "Display Name 3",
  //     "description": "Description 3",
  //     "sortOrder": 3,
  //     "isArchived": false,
  //     "isPublic": false,
  //     "id": 2,
  //     "containers": [
  //       {
  //         "id": 1,
  //         "displayName": "Display Name 1",
  //         "description": "Description 1",
  //         "sortOrder": 1,
  //         "tickets": [
  //           {
  //             "id": 1,
  //             "displayName": "Ticket 1",
  //             "description": "Description Ticket 1",
  //             "sortOrder": 1,
  //           },
  //           {
  //             "id": 2,
  //             "displayName": "Ticket 2",
  //             "description": "Description Ticket 2",
  //             "sortOrder": 2,
  //           },
  //           {
  //             "id": 3,
  //             "displayName": "Ticket 3",
  //             "description": "Description Ticket 3",
  //             "sortOrder": 3,
  //           }
  //         ]
  //       },
  //       {
  //         "id": 2,
  //         "displayName": "Display Name 2",
  //         "description": "Description 2",
  //         "sortOrder": 2,
  //         "tickets": [
  //           {
  //             "id": 4,
  //             "displayName": "Ticket 21",
  //             "description": "Description Ticket 21",
  //             "sortOrder": 1,
  //           },
  //           {
  //             "id": 5,
  //             "displayName": "Ticket 22",
  //             "description": "Description Ticket 22",
  //             "sortOrder": 2,
  //           },
  //           {
  //             "id": 6,
  //             "displayName": "Ticket 23",
  //             "description": "Description Ticket 23",
  //             "sortOrder": 3,
  //           }
  //         ]
  //       },
  //       {
  //         "id": 3,
  //         "displayName": "Display Name 3",
  //         "description": "Description 3",
  //         "sortOrder": 3,
  //         "tickets": [
  //           {
  //             "id": 7,
  //             "displayName": "Ticket 31",
  //             "description": "Description Ticket 31",
  //             "sortOrder": 1,
  //           },
  //           {
  //             "id": 8,
  //             "displayName": "Ticket 32",
  //             "description": "Description Ticket 32",
  //             "sortOrder": 2,
  //           },
  //           {
  //             "id": 9,
  //             "displayName": "Ticket 33",
  //             "description": "Description Ticket 33",
  //             "sortOrder": 3,
  //           }
  //         ]
  //       },
  //       {
  //         "id": 4,
  //         "displayName": "Display Name 3",
  //         "description": "Description 3",
  //         "sortOrder": 4,
  //         "tickets": [
  //           {
  //             "id": 17,
  //             "displayName": "Ticket 31",
  //             "description": "Description Ticket 31",
  //             "sortOrder": 1,
  //           },
  //         ]
  //       },
  //       {
  //         "id": 5,
  //         "displayName": "Display Name 3",
  //         "description": "Description 3",
  //         "sortOrder": 5,
  //         "tickets": [
  //           {
  //             "id": 18,
  //             "displayName": "Ticket 31",
  //             "description": "Description Ticket 31",
  //             "sortOrder": 1,
  //           },
  //         ]
  //       },
  //     ]
  //   } as Board;
  // }

  // ==================================================================

  dropContainer(event: CdkDragDrop<Container[]>) {

    console.log("Container id: " + this.board.containers[event.previousIndex]["id"]);
    console.log("Previous position: " + (event.previousIndex + 1));
    console.log("New position: " + (event.currentIndex + 1));

    moveItemInArray(this.board.containers, event.previousIndex, event.currentIndex);
  }

  dropTicket(event: CdkDragDrop<Ticket[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  getConnectedList(): any[] {
    return this.board.containers.map(x => `${x.id}`);
  }

  // ==================================================================

  openDialog(): void {
    const dialogRef = this.dialog.open(ContainerCreateComponent, {
      width: '30%',
      data: {currentBoard: this.board}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}


