import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlightService } from 'src/app/services/Flight/flight.service';

@Component({
  selector: 'app-my-booking',
  templateUrl: './my-booking.component.html',
  styleUrls: ['./my-booking.component.css']
})
export class MyBookingComponent implements OnInit {
  bookingHistory: any=[];

  constructor(private router: Router,
    private flightService: FlightService) { }

  ngOnInit(): void {
    console.log("fel histoiry")
    this.bookingHistory =[]
    let id=localStorage.getItem('id') 
    this.flightService.getBookingByUserId(id).subscribe(
      data=>{this.bookingHistory=data;
        console.log("history",this.bookingHistory)},
        error=>{}
    );
    
  }
  deleteBooking(id:any){
    this.flightService.deleteBooking(id).subscribe();
    location.reload()
  }

}
