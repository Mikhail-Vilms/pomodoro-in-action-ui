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
  MatExpansionModule,
  MatDialogModule,
  // MatDialogRef
} from '@angular/material';

import { DragDropModule } from '@angular/cdk/drag-drop';

// import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

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
    MatExpansionModule,
    DragDropModule,
    MatDialogModule,
    // MatDialogRef
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
    MatExpansionModule,
    DragDropModule,
    MatDialogModule,
    // MatDialogRef
  ]
})

export class MaterialModule { }