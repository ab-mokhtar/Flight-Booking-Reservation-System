import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { API_PATH, TOKEN_PREFIX } from 'src/app/constants/IMPData';

@Injectable({
  providedIn: 'root',
})
export class FlightService {
  flights: any[];
  nextFlights: any[];
  selectedFlight: any[];
  bookedFlight: any[];
  flightHistory: any[];

  constructor(private http: HttpClient) {
    this.flights = [];
    this.nextFlights = [];
    this.selectedFlight = [];
    this.bookedFlight = [];
    this.flightHistory = [];
  }

  getFetchedFlights() {
    return of(this.flights);
  }

  getAfterDepartureDateFlights() {
    return of(this.nextFlights);
  }

  getFlights():Observable<any[]> {

    return this.http.get<any[]>(
      `${API_PATH}/flights/all`
  
    );
  }
  getFlightsByDate(from:any,to:any,d1:any,d2:any):Observable<any[]> {

    return this.http.get<any[]>(
      `${API_PATH}/flights/by/`+from+'/'+to+'/'+d1+'/'+d2
  
    );
  }
  getFlightsById(id:any):Observable<any> {

    return this.http.get<any>(
      `${API_PATH}/flights/`+id
  
    );
  }
  addNewFligt(flightData: any) {
    const jwt_token = localStorage.getItem('token');

    return this.http.post(
      `${API_PATH}/flights/add`,
       flightData 
      
    );
  }
  addNewBooking(data: any) {
    const jwt_token = localStorage.getItem('token');

    return this.http.post(
      `${API_PATH}/bookings`,
       data 
      
    );
  }

  // Selected Flights
  setSelectedFlight(flightData: any) {
    this.selectedFlight.splice(0, 1);
    return this.selectedFlight.push(flightData);
  }

  getSelectedFlight() {
    return of(this.selectedFlight);
  }

  // Book Flight
  bookNewFlight(flightData: any) {
    const jwt_token = localStorage.getItem('token');

    return this.http.post(
      `${API_PATH}/flight/booking/newbooking`,
      {
        data: flightData,
      },
      {
        headers: {
          authorization: `${TOKEN_PREFIX} ${jwt_token}`,
        },
      }
    );
  }

  getBookedFlightData() {
    return of(this.bookedFlight);
  }

  deleteFlght(id:any){
    return this.http.delete(`${API_PATH}/flights/delete/`+id);
  }
  updateFlight( flightId:any, newFly:any){
    return this.http.put(`${API_PATH}/flights/${flightId}`, newFly)
  }

  // Flight Booking
  getFlightBookingHistory() {
    const jwt_token = localStorage.getItem('token');

    return this.http.post(
      `${API_PATH}/flight/booking/getbookings`,
      {},
      {
        headers: {
          authorization: `${TOKEN_PREFIX} ${jwt_token}`,
        },
      }
    );
  }
}
