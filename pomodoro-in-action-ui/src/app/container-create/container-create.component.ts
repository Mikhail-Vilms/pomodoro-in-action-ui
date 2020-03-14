import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ContainersService } from 'src/app/services/containers.service';
import { Board } from '../model/board';

@Component({
  selector: 'app-container-create',
  templateUrl: './container-create.component.html',
  styleUrls: ['./container-create.component.css']
})
export class ContainerCreateComponent implements OnInit {
  private currentBoard: Board;
  private newContainerJson;
  newContainerGroup: FormGroup;
  
  constructor(
    private formBuilder: FormBuilder,
    private containersService: ContainersService,
    private router: Router,
    public dialogRef: MatDialogRef<ContainerCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data) { 
      this.currentBoard = data["currentBoard"] as Board;
    }

  ngOnInit(): void {
    this.initCreateContainerForm();
  }

  initCreateContainerForm() {
    this.newContainerGroup = this.formBuilder.group({
      displayName: ['', Validators.required],
      description: ['', []]
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onAddClick() {
    if (!this.newContainerGroup.valid) {
      return;
    }

    this.newContainerJson = {
      "displayName": this.newContainerGroup.value.displayName,
      "descripiton": this.newContainerGroup.value.description,
      "sortOrder": this.currentBoard.containers.length,
      "boardId": this.currentBoard.id
    };

    this.containersService
      .createNewContainer(
        this.newContainerJson
      )
      .subscribe((res: any) => {
        this.router
          .navigate(['/boards/' + this.currentBoard.id])
          .then(() => {
            window.location.reload();
          });
      },
      err => {
      });
  }
}
