import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth-guard.service';
import { AuthComponent } from './auth/auth/auth.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { StartComponent } from './shared/start/start.component';
import { TodoDetailsComponent } from './todos/todo-details/todo-details.component';
import { TodoEditComponent } from './todos/todo-edit/todo-edit.component';
import { TodosComponent } from './todos/todos.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },

  // Main Routes

  // Home
  { path: 'home', component: HomeComponent },

  // Todos
  {
    path: 'todos',
    component: TodosComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: StartComponent },
      { path: 'new', component: TodoEditComponent },
      { path: ':id', component: TodoDetailsComponent },
      { path: ':id/edit', component: TodoEditComponent },
    ],
  },

  // Login / Auth
  { path: 'login', component: AuthComponent },

  // Not found page
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
