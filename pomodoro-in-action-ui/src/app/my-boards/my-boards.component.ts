import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    private router: Router,
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

 gotoCreateNewBoard(){
   this.router.navigate(['/create-board']);
 }
}
