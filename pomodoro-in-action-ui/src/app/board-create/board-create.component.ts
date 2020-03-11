import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BoardsService } from '../services/boards.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-board-create',
  templateUrl: './board-create.component.html',
  styleUrls: ['./board-create.component.css']
})
export class BoardCreateComponent implements OnInit {
  formGroup: FormGroup;

  constructor(    
    private router: Router,
    private fb: FormBuilder,
    private boardsService: BoardsService) { }

  ngOnInit(): void {
    this.createForm();
  }
  
  createForm() {
    this.formGroup = this.fb.group({
      name: ['', [Validators.required]],
      description: [''],
    });
  }

  createNewBoard(): void{
    this.boardsService.createNewBoard({
      "displayName": this.formGroup.value.name,
      "description": this.formGroup.value.description,
      "sortOrder": 1
    }).subscribe(response => {            
      this.router.navigate(['/dashboard']);
    })
  }
}
