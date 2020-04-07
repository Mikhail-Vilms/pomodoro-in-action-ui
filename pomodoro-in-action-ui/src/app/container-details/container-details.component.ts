import { Component, OnInit } from '@angular/core';
import { Container } from '../model/container';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ContainersService } from '../services/containers.service';

@Component({
  selector: 'app-container-details',
  templateUrl: './container-details.component.html',
  styleUrls: ['./container-details.component.css']
})
export class ContainerDetailsComponent implements OnInit {
  private container: Container;
  formGroup: FormGroup;

  constructor(    
    private router: Router,
    private formBuilder: FormBuilder,
    private service: ContainersService,
    private route: ActivatedRoute) {
      this.getContainer();
    }

  ngOnInit(): void {
    this.initForm();
  }

  getContainer(): void {
    const containerId = this.route.snapshot.paramMap.get('id');
    this.service.getContainer(containerId)
      .subscribe(container => {
        this.container = container as Container;
        this.formGroup.value.name = this.container.displayName;
        this.formGroup.setValue({
          name: this.container.displayName,
          description: this.container.description
        })
      });
  }

  initForm() {
    this.formGroup = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', []]
    });
  }

  updateContainer(){
    this.container.displayName = this.formGroup.value.name;
    this.container.description = this.formGroup.value.description;
    
    this.service.updateContainer(this.container)      
      .subscribe((res: any) => {
        this.returnToBoard();
      },
      err => {
        console.log(err);
      });
  }

  deleteContainer(){
    this.service.deleteContainer(this.container.id)      
      .subscribe((res: any) => {
        this.returnToBoard();
      },
      err => {
        console.log(err);
      });
  }

  returnToBoard(){
    this.router.navigate(['/boards/' + this.container.boardId]);
  }
}
