import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlightService } from 'src/app/services/Flight/flight.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-flight-booking',
  templateUrl: './flight-booking.component.html',
  styleUrls: ['./flight-booking.component.css'],
})
export class FlightBookingComponent implements OnInit {
  tripType: string;

  origin: string;
  destination: string;

  departureDate!: Date;
  returnDate!: Date;

  adultCount: number;
  childrenCount: number;

  flightClass: string;

  displayModal = false;

  constructor(
    private router: Router,
    private flightService: FlightService,
    private toastr: ToastrService
  ) {
    this.tripType = '';
    this.origin = '';
    this.destination = '';
  
    this.adultCount = 0;
    this.childrenCount = 0;
    this.flightClass = '';
  }

  ngOnInit(): void {}

  handleFormSubmit(event: Event) {
    event.preventDefault();

    if (this.origin === this.destination) {
      this.toastr.error('Error', 'Origin and source cannot be the same');
      return console.log('Origin and source cannot be the same');
    }

    if (this.departureDate > this.returnDate) {
      this.toastr.error('Error', 'Return date must be after departure date');
      return console.log('Return date must be after departure date');
    }

  

    

    

    this.router.navigate(['/flights/'+this.origin+'/'+this.destination+'/'+this.departureDate+'/'+this.returnDate]);

   


   
  }
}
