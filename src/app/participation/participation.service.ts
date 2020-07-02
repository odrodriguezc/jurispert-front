import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Participation } from './Participation';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ParticipationService {
  constructor(private http: HttpClient) {}

  add(participation: Participation) {
    return this.http.post<Participation>(
      environment.apiUrl + '/participations',
      participation
    );
  }

  update(participation: Participation) {
    return this.http.put<Participation>(
      environment.apiUrl + '/participations/' + participation.id,
      participation
    );
  }

  remove(id: number) {
    return this.http.delete<Participation>(
      environment.apiUrl + '/participations/' + id
    );
  }
}
