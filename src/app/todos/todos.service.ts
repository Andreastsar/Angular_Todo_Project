import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Todo } from './todo.model';

@Injectable({ providedIn: 'root' })
export class TodosService {
  todosChanged = new Subject<Todo[]>();

  todos: Todo[] = [
    {
      id: 0,
      title: 'Feed the dog',
      description: 'I have to remember to feed the dog',
      status: 'incomplete',
    },
    {
      id: 1,
      title: 'Take out the garbage',
      description: 'I have to remember to take out the garbage',
      status: 'completed',
    },
    {
      id: 2,
      title: 'Buy groceries',
      description: 'I have to remember to go to the grocery store',
      status: 'incomplete',
    },
  ];

  // Return a copy of the original array of todos
  getTodos(): Todo[] {
    return this.todos.slice();
  }

  // Add a new todo to the list of todos
  addTodo(title: string, description: string, status: string): void {
    this.todos.push({
      id: this.todos.length,
      title: title,
      description: description,
      status: status,
    });
    this.todosChanged.next(this.todos.slice());
  }

  // Get a todo by ID
  getTodoById(id: number): Todo {
    return this.todos[id];
  }

  deleteTodoById(id: number): void {
    this.todos = this.todos.filter((todo) => todo.id !== id);
    this.todosChanged.next(this.todos.slice());
  }

  updateTodoById(
    id: number,
    title: string,
    description: string,
    status: string
  ): void {
    this.todos[id].title = title;
    this.todos[id].description = description;
    this.todos[id].status = status;

    this.todosChanged.next(this.todos.slice());
  }
}
