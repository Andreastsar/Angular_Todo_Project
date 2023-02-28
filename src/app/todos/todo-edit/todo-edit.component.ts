import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Todo } from '../todo.model';
import { TodosService } from '../todos.service';

@Component({
  selector: 'app-todo-edit',
  templateUrl: './todo-edit.component.html',
  styleUrls: ['./todo-edit.component.css'],
})
export class TodoEditComponent implements OnInit {
  todoForm: FormGroup;
  isEditing: boolean = false;
  todoId: number;

  constructor(
    private route: ActivatedRoute,
    private todosService: TodosService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.todoId = +params['id'];
      this.isEditing = params['id'] != null;
    });

    this.initializeForm();
  }

  private initializeForm() {
    let title = null;
    let description = null;
    let status = 'incomplete';

    // If we are editing, the form will be filled with the current todo fields
    if (this.isEditing) {
      const todo = this.todosService.getTodoById(this.todoId);

      title = todo.title;
      description = todo.description;
      status = todo.status;
    }

    // If not in edit mode, initialize a new form
    this.todoForm = new FormGroup({
      title: new FormControl(title, Validators.required),
      description: new FormControl(description, Validators.required),
      status: new FormControl(status, Validators.required),
    });
  }

  onSubmitForm(): void {
    if (!this.todoForm.valid) return;

    // If not editing, add a new todo
    if (!this.isEditing) {
      this.todosService.addTodo(
        this.todoForm.value['title'],
        this.todoForm.value['description'],
        this.todoForm.value['status']
      );
    }

    // If editing, update the current todo with new values
    if (this.isEditing) {
      this.todosService.updateTodoById(
        this.todoId,
        this.todoForm.value['title'],
        this.todoForm.value['description'],
        this.todoForm.value['status']
      );
    }

    // Navigate to /todos
    this.router.navigate(['/todos']);

    // Reset form fields
    this.todoForm.reset();
  }
}
