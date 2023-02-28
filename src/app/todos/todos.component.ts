import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
})
export class TodosComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  onNewToDo() {
    this.router.navigate(['/todos/new']);
  }
}
