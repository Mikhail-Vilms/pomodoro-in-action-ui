import { NgModule } from '@angular/core';
import { 
  MatButtonModule, 
  MatIconModule, 
  MatMenuModule,
  MatToolbarModule,
  MatCardModule,
  MatInputModule,
  MatDividerModule
} from '@angular/material';

@NgModule({
  declarations: [],
  imports: [
    MatButtonModule, 
    MatIconModule, 
    MatMenuModule,
    MatToolbarModule,
    MatCardModule,
    MatInputModule,
    MatDividerModule
  ],
  exports: [
    MatButtonModule, 
    MatIconModule, 
    MatMenuModule,
    MatToolbarModule,
    MatCardModule,
    MatInputModule,
    MatDividerModule
  ]
})

export class MaterialModule { }