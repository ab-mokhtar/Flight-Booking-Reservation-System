import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FlightService } from 'src/app/services/Flight/flight.service';

@Component({
  selector: 'app-flight-history',
  templateUrl: './flight-history.component.html',
  styleUrls: ['./flight-history.component.css'],
})
export class FlightHistoryComponent implements OnInit {
  flightHistory: any=[];

  constructor(
    private router: Router,
    private flightService: FlightService,
    private toastr: ToastrService
  ) {
  }

  ngOnInit(): void {
    this.flightHistory =[]
    this.flightService.getFlights().subscribe(
      data=>{this.flightHistory=data;
        console.log(this.flightHistory)},
        error=>{}
    );
  }

 
  showDetails(flight: any) {
    console.log('Show Details: ', flight);
    const flightId = flight.id;

    // Set the selected flight in the service
    this.flightService.setSelectedFlight(flight);
  
    // Navigate to the flight details page with the flight ID in the URL
    this.router.navigate(['/flight-details', flightId]);
  }
  deleteFlight(id:any){
    this.flightService.deleteFlght(id).subscribe();
    location.reload()
  }
  goToEdit(id:any){
    this.router.navigate(['/edit-flight',id])
  }
}
