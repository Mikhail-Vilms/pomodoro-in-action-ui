import { Component, OnInit, Input } from '@angular/core';
import { Board } from '../models/board';

@Component({
  selector: 'app-board-grid-element',
  templateUrl: './board-grid-element.component.html',
  styleUrls: ['./board-grid-element.component.css']
})
export class BoardGridElementComponent implements OnInit {
  @Input() board: Board;
  
  constructor() { }

  ngOnInit() {
    // console.log("***: " + this.board.DisplayName);
  }

}
