export interface Aircraft {
  type: string;
  icao_type: string;
  manufacturer: string;
  mode_s: string;
  registration: string;
  registered_owner_country_iso_name: string;
  registered_owner_country_name: string;
  registered_owner_operator_flag_code: string | null;
  registered_owner: string;
  url_photo: string | null;
  url_photo_thumbnail: string | null;
}

export interface AircraftResponse {
  response: { aircraft: Aircraft };
}
