import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FlightService } from 'src/app/services/Flight/flight.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-flight-tickets',
  templateUrl: './flight-tickets.component.html',
  styleUrls: ['./flight-tickets.component.css'],
})
export class FlightTicketsComponent implements OnInit {
  selectedFlight: any;
  displayEconomyClass:boolean = false;
  displayBusinessClass:boolean = false;
  displayFirstClass:boolean = false;
  displayFinalCosting = false;

  finalBookingObject: any = {};

  isEconomyClass = false;
  isBusinessClass = false;
  isFirstClass = false;

  economyClassTickets = '';
  economyClassTicketPrice = '';

  businessClassTickets = '';
  businessClassTicketPrice = '';

  firstClassTickets = '';
  firstClassTicketPrice = '';

  finalTotalPrice = 0;
  finalTotalTickets = 0;

  displayModal = false;
  flightId: number=-1;
  constructor(
    private activatedRoute: ActivatedRoute,
    private flightService: FlightService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.selectedFlight = [];
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.flightId = +params['id']; // '+' is used to convert the string to a number
    });
    this.flightService.getFlightsById(this.flightId).subscribe((selectedFlightsData) => {
      this.selectedFlight = selectedFlightsData;
      this.displayEconomyClass= selectedFlightsData.economyClass && (selectedFlightsData.economyClassSeats > selectedFlightsData.resrvedeconomyClassSeats)
      this.displayBusinessClass= selectedFlightsData.businessClass && (selectedFlightsData.businessClassSeats > selectedFlightsData.resrvedbusinessClassSeats)
      this.displayFirstClass= selectedFlightsData.firstClass && (selectedFlightsData.firstClassSeats > selectedFlightsData.resrvedfirstClassSeats)
      console.log(this.displayBusinessClass," ",this.displayEconomyClass,' ',this.displayFirstClass);
      
    });

  
  }

  handleSetFormSubmit(event: Event) {
    event.preventDefault();

    if (!this.isEconomyClass && !this.isBusinessClass && !this.isFirstClass) {
      this.toastr.warning(
        'You have to select atleast one class before booking flight'
      );
      return console.log(
        'You have to select atleast one class before booking flight'
      );
    }
    this.finalTotalTickets = 0;
    this.finalTotalPrice = 0;
    this.finalBookingObject = {};

    if (this.isEconomyClass) {
      if ( this.economyClassTickets===' ' || parseInt(this.economyClassTickets) <=0 ) {
        this.toastr.warning('Please enter economy class details');
        return console.log('Please enter economy class details');
      }
      if ( parseInt(this.economyClassTickets)>(this.selectedFlight.economyClassSeats - this.selectedFlight.resrvedeconomyClassSeats)) {
        this.toastr.warning('nombre insdiponible');
        return console.log('Please enter economy class details');
      }
      this.finalBookingObject['isEconomyClass'] = true;
      this.finalBookingObject['economyClassTickets'] = parseInt(
        this.economyClassTickets
      );
      this.finalBookingObject['economyClassTicketCost'] =
        parseInt(this.economyClassTickets) *
        parseInt(this.selectedFlight.economyClassTicketPrice);

      this.finalTotalTickets += parseInt(this.economyClassTickets);
      this.finalTotalPrice +=
        parseInt(this.economyClassTickets) *
        parseInt(this.selectedFlight.economyClassTicketPrice);
    } else {
      this.finalBookingObject['isEconomyClass'] = false;
    }

    if (this.isBusinessClass) {
      if (this.businessClassTickets === '' || parseInt(this.businessClassTickets) <=0 ) {
        this.toastr.warning('Please enter business class details');
        return console.log('Please enter business class details');
      }
      if ( parseInt(this.businessClassTickets) >this.selectedFlight.businessClassSeats - this.selectedFlight.resrvedbusinessClassSeats) {
        this.toastr.warning('nombre insdiponible');
        return console.log('Please enter business class details');
      }
      this.finalBookingObject['isBusinessClass'] = true;
      this.finalBookingObject['businessClassTickets'] = parseInt(
        this.businessClassTickets
      );
      this.finalBookingObject['businessClassTicketCost'] =
        parseInt(this.businessClassTickets) *
        parseInt(this.selectedFlight.businessClassTicketPrice);

      this.finalTotalTickets += parseInt(this.businessClassTickets);
      this.finalTotalPrice +=
        parseInt(this.selectedFlight.businessClassTicketPrice) *
        parseInt(this.businessClassTickets);
    } else {
      this.finalBookingObject['isBusinessClass'] = false;
    }

    if (this.isFirstClass) {
      if (this.firstClassTickets === ''||parseInt(this.firstClassTickets)<=0) {
        this.toastr.warning('Please enter first class details');
        return console.log('Please enter first class details');
      }
      if ( parseInt(this.firstClassTickets) >(this.selectedFlight.firstClassSeats - this.selectedFlight.resrvedfirstClassSeats)) {
        this.toastr.warning('nombre insdiponible');
        return console.log('Please enter business class details');
      }

      this.finalBookingObject['isFirstClass'] = true;
      this.finalBookingObject['firstClassTickets'] = parseInt(
        this.firstClassTickets
      );
      this.finalBookingObject['firstClassTicketCost'] =
        parseInt(this.firstClassTickets) * parseInt(this.selectedFlight.firstClassTicketPrice);

      this.finalTotalTickets += parseInt(this.firstClassTickets);
      this.finalTotalPrice +=
        parseInt(this.selectedFlight.firstClassTicketPrice) * parseInt(this.firstClassTickets);
    } else {
      this.finalBookingObject['isFirstClass'] = false;
    }

    this.displayFinalCosting = true;
  }

  bookFlight() {
    this.finalBookingObject['flightDetails'] = {id:this.selectedFlight.id};
    this.finalBookingObject['totalCost'] = this.finalTotalPrice;
    this.finalBookingObject['user'] = {username:localStorage.getItem('id')};
    console.log('Final Book Flight: ', this.finalBookingObject);
    this.flightService.addNewBooking(this.finalBookingObject).subscribe((res)=>{
      this.toastr.success("booking done ");
      this.router.navigate(['/flight-history']);

    },error=>      this.toastr.error("error  ")
    )

  }
}
