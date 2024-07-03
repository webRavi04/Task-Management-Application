import { Component } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent {
  tasks: any[] = [];

  constructor(private taskService: TaskService, private router: Router) { }

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe(
      (tasks) => {
        this.tasks = tasks;
      },
      (error) => {
        console.error('Failed to load tasks', error);
      }
    );
  }

  deleteTask(id: string) {
    this.taskService.deleteTask(id).subscribe(
      () => {
        this.loadTasks();
      },
      (error) => {
        console.error('Failed to delete task', error);
      }
    );
  }

  editTask(id: string) {
    this.router.navigate(['/tasks', id, 'edit']);
  }
}
