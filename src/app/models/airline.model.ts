export interface Airline {
  name: string;
  icao: string;
  iata: string | null;
  country: string;
  country_iso: string;
  callsign: string | null;
}
