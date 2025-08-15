import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Aircraft, AircraftResponse } from '../models/aircraft.model';
import { CallSignResponse, FlightRoute } from '../models/flight-route.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private base = 'https://api.adsbdb.com/v0';

  constructor(private http: HttpClient) { }

 getAircraft(identifier: string): Observable<Aircraft> {
    const url = `${this.base}/aircraft/${encodeURIComponent(identifier)}`;
    return this.http.get<AircraftResponse>(url).pipe(
      map(res => res.response.aircraft),
      catchError(err => this.handleHttpError(err, 'Aircraft'))
    );
  }

  getCallsign(callsign: string): Observable<FlightRoute> {
    const url =`${this.base}/callsign/${encodeURIComponent(callsign)}`;
    return this.http.get<CallSignResponse>(url).pipe(
      map(r => r.response.flightroute),
      catchError(err =>this.handleHttpError(err,'Callsign')));
  }

  private handleHttpError(err: unknown, context: string) {
    if (err instanceof HttpErrorResponse) {
      if (err.status === 404) return throwError(() => new Error(`${context}: Not found`));
      if (err.status === 429) return throwError(() => new Error(`${context}: Rate limited`));
      return throwError(() => new Error(`${context}: HTTP ${err.status}`));
    }
    return throwError(() => new Error(`${context}: Unknown error`));
  }
}
