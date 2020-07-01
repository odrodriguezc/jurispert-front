import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Event } from './event';

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  constructor(private http: HttpClient, private auth: AuthService) {}

  findAll() {
    return this.http
      .get(environment.apiUrl + '/events')
      .pipe(map((data) => data['hydra:member'] as Event[]));
  }

  find(id: number) {
    return this.http.get<Event>(environment.apiUrl + '/events/' + id);
  }

  delete(id: number) {
    return this.http.delete<Event>(environment.apiUrl + '/events/' + id);
  }

  create(event: Event) {
    return this.http.post<Event>(environment.apiUrl + '/events', event);
  }

  update(event: Event) {
    return this.http.put<Event>(
      environment.apiUrl + '/events/' + event.id,
      event
    );
  }
}
