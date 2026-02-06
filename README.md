# TODO_AISlop

Chat con Gemini Fast:

Here is a complete, step-by-step guide to building a modern, functional To-Do application using **Angular (Standalone Components)** and **TypeScript**.

### 1. Prerequisites & Setup

First, ensure you have the Angular CLI installed. Open your terminal and run:

```bash
# 1. Install Angular CLI (if you haven't)
npm install -g @angular/cli

# 2. Create a new project (select CSS for styling and Yes for Server-Side Rendering defaults)
ng new todo-app
cd todo-app

# 3. Serve the application
ng serve

```

---

### 2. Define the Data Model

Create a strict type for your To-Do items so TypeScript can help us prevent errors.

**File:** `src/app/todo.model.ts`

```typescript
export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

```

---

### 3. The Logic (Component)

We will use a **Standalone Component**. This manages the list, adds new items, and handles deletions.

**File:** `src/app/app.component.ts`

```typescript
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

```

---

### 4. The View (HTML)

This template includes the input form and the list display. It uses Angular directives like `*ngFor` to loop through items and class binding `[class.completed]` to strike through finished tasks.

**File:** `src/app/app.component.html`

```html
<div class="container">
  <h1>{{ title }}</h1>

  <div class="add-todo-form">
    <input 
      type="text" 
      placeholder="What needs to be done?" 
      [(ngModel)]="newTodoTitle" 
      (keydown.enter)="addTodo()"
    >
    <button (click)="addTodo()">Add Task</button>
  </div>

  <div class="stats" *ngIf="todos.length > 0">
    <p>{{ remainingCount }} item(s) remaining</p>
  </div>

  <ul class="todo-list">
    <li *ngFor="let todo of todos">
      <div class="todo-item" [class.completed]="todo.completed">
        <input 
          type="checkbox" 
          [(ngModel)]="todo.completed" 
          [id]="'checkbox_' + todo.id"
        >
        <label [for]="'checkbox_' + todo.id">{{ todo.title }}</label>
      </div>
      
      <button class="delete-btn" (click)="deleteTodo(todo.id)">
        Delete
      </button>
    </li>
  </ul>
  
  <p *ngIf="todos.length === 0" class="empty-state">
    No tasks yet! Add one above.
  </p>
</div>

```

---

### 5. The Styles (CSS)

Add some clean styling to make it look professional.

**File:** `src/app/app.component.css`

```css
/* Basic Reset & Container */
:host {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  display: flex;
  justify-content: center;
  padding-top: 50px;
}

.container {
  width: 400px;
  background: #f9f9f9;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
}

h1 {
  text-align: center;
  color: #333;
  margin-bottom: 1.5rem;
}

/* Input Form */
.add-todo-form {
  display: flex;
  gap: 10px;
  margin-bottom: 1rem;
}

input[type="text"] {
  flex-grow: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

button {
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

/* List Styling */
.todo-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  padding: 10px;
  margin-bottom: 5px;
  border-bottom: 1px solid #eee;
  border-radius: 4px;
}

.todo-item {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
}

/* Completed State Logic */
.completed label {
  text-decoration: line-through;
  color: #888;
}

.delete-btn {
  background-color: #ff4d4d;
  font-size: 0.8rem;
  padding: 5px 10px;
}

.delete-btn:hover {
  background-color: #cc0000;
}

.stats {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 10px;
}

.empty-state {
  text-align: center;
  color: #aaa;
  margin-top: 20px;
}

```

---

### How to Run It

1. Save the code into the files created by the CLI.
2. If `ng serve` is running, it will reload automatically.
3. Go to `http://localhost:4200/`.

**Would you like me to show you how to save these tasks to `localStorage` so they don't disappear when you refresh the page?**

1. La UX/UI no esta nada mal, es simple y usa unicamente emojis, es funcional, aunque en terminos de diseño es muy sin-alma (soulless)

2. En terminos de codigo esta bien la verdad, cumple con lo requirido para un to-do generico.
