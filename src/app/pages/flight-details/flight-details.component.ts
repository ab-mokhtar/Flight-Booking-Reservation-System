import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlightService } from 'src/app/services/Flight/flight.service';

@Component({
  selector: 'app-flight-details',
  templateUrl: './flight-details.component.html',
  styleUrls: ['./flight-details.component.css'],
})
export class FlightDetailsComponent implements OnInit {
  
  selectedFlight: any;
  totalSeats = 0;
  remainingSeats = 0;
  isBookingDisabled = false;
  flightId: number= -1;

  constructor(
    private activatedRoute: ActivatedRoute,
    private flightService: FlightService,
    private router: Router,
    private datePipe: DatePipe
  ) {
    this.selectedFlight = [];
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.flightId = +params['id']; // '+' is used to convert the string to a number
      console.log('Flight ID:', this.flightId);

      // Now you can use this.flightId to fetch details from your service
      // For example:
      this.flightService.getFlightsById(this.flightId).subscribe((flightDetails) => {
        console.log(flightDetails)
this.selectedFlight=flightDetails;   
this.totalSeats=flightDetails.economyClassSeats+flightDetails.businessClassSeats+flightDetails.firstClassSeats
this.remainingSeats=this.totalSeats-flightDetails.resrvedeconomyClassSeats-flightDetails.resrvedbusinessClassSeats-flightDetails.resrvedfirstClassSeats
});
    });
    this.flightService.getSelectedFlight().subscribe((flightData) => {
      this.selectedFlight = flightData;
    });

    if (this.selectedFlight.length === 0) {
      this.router.navigate(['/flight-booking']);
      return;
    }

    const currentDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');

    if (currentDate !== null) {
      if (this.selectedFlight[0].departureDate < currentDate) {
        this.isBookingDisabled = true;
      }
    }
  }





  handleBookFlight() {
    this.router.navigate(['/flight-tickets/'+this.selectedFlight.id]);
  }
}
