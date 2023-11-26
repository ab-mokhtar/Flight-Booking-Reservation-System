import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlightService } from 'src/app/services/Flight/flight.service';

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.css'],
})
export class FlightsComponent implements OnInit {
  flights: any[];
  nextFlights: any[];
  from!: string;
  to!: string;
  d1!: string;
  d2!: string;

  constructor(private activatedRoute:ActivatedRoute,private flightService: FlightService, private router: Router) {
    this.nextFlights = [];
    this.flights = [];
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.from = params['fr']; // '+' is used to convert the string to a number
      this.to = params['to']; // '+' is used to convert the string to a number
      this.d1 = params['d1']; // '+' is used to convert the string to a number
      this.d2 = params['d2']; // '+' is used to convert the string to a number


    });
    this.flightService.getFlightsByDate(this.from,this.to,this.d1,this.d2)
      .subscribe((flightsData) => {
        this.flights = flightsData;
        console.log("houni",this.flights);
      });

    
  }

  displayFlight(flight: any) {
    console.log(flight);
  }

  showDetails(flight: any) {
    console.log('Show Details: ', flight);
    const flightId = flight.id;

    // Set the selected flight in the service
    this.flightService.setSelectedFlight(flight);
  
    // Navigate to the flight details page with the flight ID in the URL
    this.router.navigate(['/flight-details', flightId]);
  }
}
