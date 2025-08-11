import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ITask, ITaskApi, ITaskApiList } from "../../shared/models/task.model";

@Injectable({
  providedIn: 'root'
})

export class TaskApi {
  private apiUrl = 'http://localhost:8000/api/tasks';

  constructor(private http: HttpClient) {}

  getTasks(): Observable<ITaskApiList> {
    return this.http.get<ITaskApiList>(this.apiUrl);
  }

  addTask(title: string): Observable<ITaskApi> {
    return this.http.post<ITaskApi>(this.apiUrl, {title});
  }

  removeTask(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
