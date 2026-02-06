import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Required for *ngFor and *ngIf
import { FormsModule } from '@angular/forms';   // Required for [(ngModel)]
import { Todo } from './todo.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'My Task Manager';
  
  // State to hold the new task input
  newTodoTitle: string = '';

  // The list of todos
  todos: Todo[] = [
    { id: 1, title: 'Learn Angular', completed: false },
    { id: 2, title: 'Build a To-Do App', completed: false },
    { id: 3, title: 'Deploy to production', completed: false }
  ];

  // Method to add a new todo
  addTodo() {
    if (this.newTodoTitle.trim().length === 0) {
      return; // Don't add empty tasks
    }

    const newTodo: Todo = {
      id: Date.now(), // Simple unique ID generation
      title: this.newTodoTitle,
      completed: false
    };

    this.todos.push(newTodo);
    this.newTodoTitle = ''; // Reset input
  }

  // Method to delete a todo
  deleteTodo(id: number) {
    this.todos = this.todos.filter(todo => todo.id !== id);
  }

  // Optional: Calculate remaining tasks
  get remainingCount() {
    return this.todos.filter(t => !t.completed).length;
  }
}