import { NgModule } from '@angular/core';
import { 
  MatButtonModule, 
  MatIconModule, 
  MatMenuModule,
  MatToolbarModule,
  MatCardModule,
  MatInputModule,
  MatDividerModule,
  MatGridListModule, 
  MatExpansionModule
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
    MatDividerModule,
    MatGridListModule,
    MatExpansionModule
  ],
  exports: [
    MatButtonModule, 
    MatIconModule, 
    MatMenuModule,
    MatToolbarModule,
    MatCardModule,
    MatInputModule,
    MatDividerModule,
    MatGridListModule,
    MatExpansionModule
  ]
})

export class MaterialModule { }