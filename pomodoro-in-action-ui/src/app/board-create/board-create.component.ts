import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { Board } from '../model/board';
import { BoardsService } from '../services/boards.service';

@Component({
  selector: 'app-board-create',
  templateUrl: './board-create.component.html',
  styleUrls: ['./board-create.component.css']
})
export class BoardCreateComponent implements OnInit {
  formGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    private boardsService: BoardsService,
    public dialogRef: MatDialogRef<BoardCreateComponent>,) { }

  ngOnInit(): void {
    this.createForm();
  }
  
  createForm() {
    this.formGroup = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', []],
    });
  }

  createNewBoard(): void{
    if (!this.formGroup.valid) {
      return;
    }

    let newBoardJson = {
      "displayName": this.formGroup.value.name,
      "description": this.formGroup.value.description
    };

    this.boardsService.createNewBoard(newBoardJson)
      .subscribe(response => {   
        let createdBoard = 
        {
          id: response["id"],
          displayName: response["displayName"],
          description: response["description"],
        } as Board;

        this.dialogRef.close({createdBoard: createdBoard});
      })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
