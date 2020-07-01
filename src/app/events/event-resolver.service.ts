import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { EventsService } from './events.service';
import { Event } from './event';

@Injectable({
  providedIn: 'root',
})
export class EventResolverService implements Resolve<Event[] | Event> {
  constructor(private eventService: EventsService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Event[] | Event> {
    if (route.paramMap.has('id')) {
      return this.eventService.find(+route.paramMap.get('id'));
    }

    return this.eventService.findAll();
  }
}
