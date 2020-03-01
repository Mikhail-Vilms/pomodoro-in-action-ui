import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  title = 'Pomodoro In Action';
  constructor(
    private router: Router) { }

  ngOnInit() {
    if (localStorage.getItem('token') != null){
      this.router.navigate(['/dashboard']);
    }
  }

}
