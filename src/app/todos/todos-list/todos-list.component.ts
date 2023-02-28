import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Todo } from '../todo.model';
import { TodosService } from '../todos.service';

@Component({
  selector: 'app-todos-list',
  templateUrl: './todos-list.component.html',
  styleUrls: ['./todos-list.component.css'],
})
export class TodosListComponent implements OnInit, OnDestroy {
  todos: Todo[] = [];
  todosSubscription: Subscription;

  constructor(private todosService: TodosService) {}

  ngOnInit(): void {
    this.todosSubscription = this.todosService.todosChanged.subscribe(
      (todos) => {
        this.todos = todos;
      }
    );
    this.todos = this.todosService.getTodos();
  }

  ngOnDestroy(): void {
    this.todosSubscription.unsubscribe();
  }
}
