import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { WelcomeToolbarComponent } from './welcome-toolbar/welcome-toolbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { SignupComponent } from './signup/signup.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LayoutModule } from '@angular/cdk/layout';
import { SignupSuccessComponent } from './signup-success/signup-success.component';
import { HttpClientModule } from '@angular/common/http';
import { SigninComponent } from './signin/signin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BoardGridElementComponent } from './board-grid-element/board-grid-element.component';
import { MyBoardsComponent } from './my-boards/my-boards.component';
import { BoardCreateComponent } from './board-create/board-create.component';
import { MainToolbarComponent } from './main-toolbar/main-toolbar.component';
import { BoardComponent } from './board/board.component';
import { ContainerCreateComponent } from './container-create/container-create.component';

@NgModule({
  declarations: [
    AppComponent,

    WelcomeComponent,
    WelcomeToolbarComponent,
    SignupComponent,
    SignupSuccessComponent,
    SigninComponent,
    DashboardComponent,
    BoardGridElementComponent,
    MyBoardsComponent,
    BoardCreateComponent,
    MainToolbarComponent,
    BoardComponent,
    ContainerCreateComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    LayoutModule,
    HttpClientModule,

    // Angular material components
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports:[
    BoardGridElementComponent
  ]
})
export class AppModule { }
