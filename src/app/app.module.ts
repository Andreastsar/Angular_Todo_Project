import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { TodosListComponent } from './todos/todos-list/todos-list.component';
import { TodoItemComponent } from './todos/todos-list/todo-item/todo-item.component';
import { TodoEditComponent } from './todos/todo-edit/todo-edit.component';
import { TodosComponent } from './todos/todos.component';
import { StartComponent } from './start/start.component';
import { TodoDetailsComponent } from './todos/todo-details/todo-details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Angular Material
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    TodosListComponent,
    TodoItemComponent,
    TodoEditComponent,
    TodosComponent,
    StartComponent,
    TodoDetailsComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
