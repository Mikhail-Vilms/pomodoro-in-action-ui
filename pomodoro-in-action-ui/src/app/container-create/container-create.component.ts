import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ContainersService } from 'src/app/services/containers.service';
import { Board } from '../model/board';
import { Container } from '../model/container';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-container-create',
  templateUrl: './container-create.component.html',
  styleUrls: ['./container-create.component.css']
})
export class ContainerCreateComponent implements OnInit {
  private currentBoard: Board;
  formGroup: FormGroup;
  
  constructor(
    private formBuilder: FormBuilder,
    private containersService: ContainersService,
    public dialogRef: MatDialogRef<ContainerCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data) { 
      this.currentBoard = data["currentBoard"] as Board;
    }

  ngOnInit(): void {
    this.initCreateContainerForm();
  }

  initCreateContainerForm() {
    this.formGroup = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', []]
    });
  }

  createNewContainer() {
    if (!this.formGroup.valid) {
      return;
    }
    
    let newContainerJson = {
      "displayName": this.formGroup.value.name,
      "descripiton": this.formGroup.value.description,
      "sortOrder": this.currentBoard.containers.length,
      "boardId": this.currentBoard.id
    };
    
    this.containersService.createNewContainer(newContainerJson)
      .subscribe(response => {
        let createdContainer = 
        {
          id: response["id"],
          displayName: response["displayName"],
          description: response["description"],
          boardId: response["boardId"],
        } as Container;

        this.dialogRef.close({createdContainer: createdContainer});
      },
      err => {
      });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
