import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Task } from './Task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private http: HttpClient, private auth: AuthService) {}

  findAll() {
    return this.http
      .get(environment.apiUrl + '/tasks')
      .pipe(map((data) => data['hydra:member'] as Task[]));
  }

  find(id: number) {
    return this.http.get<Task>(environment.apiUrl + '/tasks/' + id);
  }

  delete(id: number) {
    return this.http.delete<Task>(environment.apiUrl + '/tasks/' + id);
  }

  create(task: Task) {
    return this.http.post<Task>(environment.apiUrl + '/tasks', task);
  }

  update(task: Task) {
    return this.http.put<Task>(environment.apiUrl + '/tasks/' + task.id, task);
  }
}
