import { Injectable, signal, Signal } from "@angular/core";
import { map, Observable, tap } from "rxjs";
import { ITask, ITaskApi, ITaskApiList, Task } from "../../shared/models/task.model";
import { TaskApi } from "../api/task.api";


@Injectable({
    providedIn: 'root'
})
export class TaskService {
    constructor(private taskApi: TaskApi) {}

    private _tasks = signal<Task[]>([]);

    tasks(): Signal<Task[]> {
        return this._tasks.asReadonly();
    }

    fetchTasks(): Observable<ITask[]> {
        return this.taskApi.getTasks().pipe(
            map((response: ITaskApiList) => response.data.map(task => new Task(task))),
            tap(tasks => this._tasks.set(tasks))
        );
    }

    addTask(title: string): Observable<ITask> {
        return this.taskApi.addTask(title).pipe(
            map((response: ITaskApi) => new Task(response.data)),
            tap(newTask => this._tasks.update(tasks => [...tasks, newTask]))
        );
    }

    removeTask(id: string): Observable<void> {
        return this.taskApi.removeTask(id).pipe(
            tap(() => this._tasks.update(tasks => tasks.filter(task => task.id !== id)))
        );
    }
}
