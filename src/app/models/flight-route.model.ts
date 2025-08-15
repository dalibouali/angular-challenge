import { Airline } from './airline.model';
import { Airport } from './airport.model';

export interface FlightRoute {
  callsign: string;
  callsign_icao: string | null;
  callsign_iata: string | null;
  airline: Airline | null;
  origin: Airport;
  midpoint: Airport | null;
  destination: Airport;
}

export interface CallSignResponse {
  response: { flightroute: FlightRoute };
}

