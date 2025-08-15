import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { ApiService } from '../../services/api.service';
import { Aircraft } from '../../models/aircraft.model';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { AircraftCardComponent } from '../aircraft-card/aircraft-card.component';
import { CallsignCardComponent } from '../callsign-card/callsign-card.component';
import { FlightRoute } from '../../models/flight-route.model';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatSlideToggleModule,
    MatChipsModule,
    MatIconModule,
    AircraftCardComponent,
    CallsignCardComponent,
    MatSnackBarModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomeComponent {
  isLoading: boolean = false;
  aircrafts: Aircraft[] = [];
  routes: FlightRoute[] = [];
  inputControl = new FormControl('', { nonNullable: true });
  errorMessage: string | null = null;
  searchType = new FormControl<'aircraft' | 'callsign'>('aircraft');

  identifiers: string[] = [];

  @ViewChild('carousel') carousel?: ElementRef<HTMLDivElement>;

  constructor(private api: ApiService, private snackBar: MatSnackBar) {}

  searchAll() {
    if (!this.identifiers.length) return;

    this.isLoading = true;
    this.errorMessage = null;
    this.aircrafts = [];
    this.routes = [];

    let pending = this.identifiers.length;

    const handleError = (err: any) => {
      this.isLoading = false;

      if (err.message?.includes('Not found')) {
        this.showError(
          'Error: Invalid identifier or wrong search type selected. Please check and try again.'
        );
      } else if (err.message?.includes('Rate limited')) {
        this.showError('Error: Too many requests, please slow down.');
      } else {
        this.showError(`Error: ${err.message || 'Unexpected error'}`);
      }
    };

    if (this.searchType.value === 'aircraft') {
      this.identifiers.forEach((identifier) => {
        this.api.getAircraft(identifier).subscribe({
          next: (data) => {
            this.aircrafts.push(data);
            pending -= 1;
            if (pending === 0) this.isLoading = false;
          },
          error: handleError,
        });
      });
    } else {
      this.identifiers.forEach((identifier) => {
        this.api.getCallsign(identifier).subscribe({
          next: (data) => {
            this.routes.push(data);
            console.log(data);
            pending -= 1;
            if (pending === 0) this.isLoading = false;
          },
          error: handleError,
        });
      });
    }
  }
  addFromInput() {
    const identifier = this.inputControl.value.trim();
    if (!identifier) return;
    if (!this.identifiers.includes(identifier)) {
      this.identifiers.push(identifier);
    }
    this.inputControl.setValue('');
  }

  clearAll() {
    this.identifiers = [];
    this.aircrafts = [];
    this.routes = [];
    this.errorMessage = null;
    this.inputControl.setValue('');
  }

  remove(identifier: string) {
    this.identifiers = this.identifiers.filter((x) => x !== identifier);
  }

  next() {
    const el = this.carousel?.nativeElement;
    if (!el) return;
    const step = this.slideStep(el);
    el.scrollBy({ left: step, behavior: 'smooth' });
  }

  prev() {
    const el = this.carousel?.nativeElement;
    if (!el) return;
    const step = this.slideStep(el);
    el.scrollBy({ left: -step, behavior: 'smooth' });
  }

  private slideStep(el: HTMLDivElement) {
    const first = el.querySelector<HTMLElement>('.slide');
    return first
      ? first.getBoundingClientRect().width + 12
      : el.clientWidth * 0.8;
  }

  private showError(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['error-snackbar'],
    });
  }
}
