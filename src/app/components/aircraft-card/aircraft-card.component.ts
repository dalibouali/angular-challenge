import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Aircraft } from '../../models/aircraft.model';

@Component({
  selector: 'app-aircraft-card',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './aircraft-card.component.html',
  styleUrl: './aircraft-card.component.scss'
})
export class AircraftCardComponent {


  @Input() aircraft!: Aircraft;
}
