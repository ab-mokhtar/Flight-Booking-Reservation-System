import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ADMIN_ROLE } from 'src/app/constants/IMPData';
import { FlightService } from 'src/app/services/Flight/flight.service';
import { UserService } from 'src/app/services/User/user.service';

@Component({
  selector: 'app-add-flight',
  templateUrl: './add-flight.component.html',
  styleUrls: ['./add-flight.component.css'],
})
export class AddFlightComponent implements OnInit {
  user: any[];

  flightName = '';
  origin = '';
  destination = '';
  duration = '';

  departureDate = '';
  departureTime = '';
  returnDate = '';
  returnTime = '';

  isEconomyClass = false;
  economyClassSeats = '';
  economyClassTicketPrice = '';

  isBusinessClass = false;
  businessClassSeats = '';
  businessClassTicketPrice = '';

  isFirstClass = false;
  firstClassSeats = '';
  firstClassTicketPrice = '';

  displayModal = false;

  constructor(
    private userService: UserService,
    private flightService: FlightService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.user = [];
  }

  ngOnInit(): void {
   

   
  }

  handleFormSubmit(event: Event) {
    event.preventDefault();

    if (this.origin === this.destination) {
      this.toastr.error('Error', 'Origin and destination cannot be same');
      return console.log('Origin and destination cannot be same');
    }
    var newFlightObject: any = {
      flightName: this.flightName,
      origin: this.origin,
      destination: this.destination,
      duration: this.duration,
      departureDate: this.departureDate,
      departureTime: this.departureTime,
      returnDate: this.returnDate,
      returnTime: this.returnTime,
      isEconomyClass: this.isEconomyClass,
      isBusinessClass: this.isBusinessClass,
      isFirstClass: this.isFirstClass,
     
    };
    
    if (this.isEconomyClass) {
      if (
        this.economyClassSeats === '' ||
        this.economyClassTicketPrice === ''
      ) {
        this.toastr.warning('Error', 'Please enter economy class details');
        return console.log('Please enter economy class details');
      }
      newFlightObject['economyClassSeats'] = parseInt(
        this.economyClassSeats
      );
     
      newFlightObject['economyClassTicketPrice'] = parseInt(
        this.economyClassTicketPrice
      );
    }

    if (this.isBusinessClass) {
      if (
        this.businessClassSeats === '' ||
        this.businessClassTicketPrice === ''
      ) {
        this.toastr.warning('Error', 'Please enter business class details');
        return console.log('Please enter business class details');
      }

      newFlightObject['businessClassSeats'] = parseInt(
        this.businessClassSeats
      );
    
      newFlightObject['businessClassTicketPrice'] = parseInt(
        this.businessClassTicketPrice
      );
    }

    if (this.isFirstClass) {
      if (this.firstClassSeats === '' || this.firstClassTicketPrice === '') {
        this.toastr.warning('Error', 'Please enter first class details');
        return console.log('Please enter first class details');
      }
      newFlightObject['firstClassSeats'] = parseInt(this.firstClassSeats);
      
      newFlightObject['firstClassTicketPrice'] = parseInt(
        this.firstClassTicketPrice
      );
    }

    console.log('New Flight Data: ', newFlightObject);

    this.displayModal = true;

    this.flightService.addNewFligt(newFlightObject).subscribe(
      (result) => {
        console.log(result);
        this.toastr.success('success');

      },
      (error) => {
        console.log('Error Occured: ', error.error.msg);
        this.toastr.error('Error', error.error.msg);
        this.displayModal = false;
      }
    );
  }
}
