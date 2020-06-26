import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Project } from './Project';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  constructor(private http: HttpClient, private auth: AuthService) {}

  findAll() {
    return this.http
      .get(environment.apiUrl + '/projects')
      .pipe(map((data) => data['hydra:member'] as Project[]));
  }

  find(id: number) {
    return this.http.get<Project>(environment.apiUrl + '/projects/' + id);
  }
}
