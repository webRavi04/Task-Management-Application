import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from 'src/app/models/task.model';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})

export class TaskFormComponent implements OnInit {
  task: Task = { title: '', description: '', dueDate: '', priority: 'low', status: 'pending' };
  isNew = true;

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    const taskId = this.route.snapshot.paramMap.get('id');
    if (taskId) {
      this.isNew = false;
      this.loadTask(taskId);
    }
  }

  loadTask(id: string) {
    this.taskService.getTask(id).subscribe(
      (task) => {
        this.task = task;
      },
      (error) => {
        console.error('Failed to load task', error);
      }
    );
  }

  saveTask() {
    if (this.isNew) {
      this.taskService.createTask(this.task).subscribe(
        () => {
          this.router.navigate(['/tasks']);
        },
        (error) => {
          console.error('Failed to create task', error);
        }
      );
    } else {
      this.taskService.updateTask(this.task._id!, this.task).subscribe(
        () => {
          this.router.navigate(['/tasks']);
        },
        (error) => {
          console.error('Failed to update task', error);
        }
      );
    }
  }
}
