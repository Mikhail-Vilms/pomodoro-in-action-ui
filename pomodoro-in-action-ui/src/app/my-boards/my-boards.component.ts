import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BoardCreateComponent } from '../board-create/board-create.component';
import { Board } from '../model/board';
import { BoardsService } from '../services/boards.service';

@Component({
  selector: 'app-my-boards',
  templateUrl: './my-boards.component.html',
  styleUrls: ['./my-boards.component.css']
})
export class MyBoardsComponent implements OnInit {
  boards: Board[];

  constructor(
    public dialog: MatDialog,
    private boardService: BoardsService) { }

  ngOnInit() {
    this.fetchPersonalBoards();
  }

  fetchPersonalBoards(){
    this.boardService
      .getPersonalBoards()
      .subscribe(response => {            
        this.boards = response as Board[];
      })
  }

  openDialogCreateBoard(): void{
    const dialogRef = this.dialog.open(BoardCreateComponent, {
      width: '450px'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.boards.push(result["createdBoard"] as Board);
    });
  }
}
