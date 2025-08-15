import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { FlightRoute } from '../../models/flight-route.model';
import { MatChip, MatChipSet } from '@angular/material/chips';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-callsign-card',
  standalone: true,
  imports: [CommonModule, MatCardModule,MatChipSet,MatChip,MatIcon],
  templateUrl: './callsign-card.component.html',
  styleUrl: './callsign-card.component.scss'
})
export class CallsignCardComponent {

  @Input() route!: FlightRoute;

}
