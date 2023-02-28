import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Todo } from '../todo.model';
import { TodosService } from '../todos.service';

@Component({
  selector: 'app-todo-details',
  templateUrl: './todo-details.component.html',
  styleUrls: ['./todo-details.component.css'],
})
export class TodoDetailsComponent implements OnInit {
  currentId: number;
  currentTodo: Todo;
  constructor(
    private route: ActivatedRoute,
    private todosService: TodosService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.currentId = params['id'];
      this.currentTodo = this.todosService.getTodoById(this.currentId);
    });
  }

  onDeleteTodo(id: number) {
    this.todosService.deleteTodoById(id);
  }
}
