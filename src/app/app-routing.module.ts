import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { StartComponent } from './start/start.component';
import { TodoDetailsComponent } from './todos/todo-details/todo-details.component';
import { TodoEditComponent } from './todos/todo-edit/todo-edit.component';
import { TodosComponent } from './todos/todos.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },

  // Main Routes
  { path: 'home', component: HomeComponent },
  {
    path: 'todos',
    component: TodosComponent,
    children: [
      { path: '', component: StartComponent },
      { path: 'new', component: TodoEditComponent },
      { path: ':id', component: TodoDetailsComponent },
      { path: ':id/edit', component: TodoEditComponent },
    ],
  },

  // Not found page
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
