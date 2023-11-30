import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FlightService } from 'src/app/services/Flight/flight.service';

@Component({
  selector: 'app-edit-flight',
  templateUrl: './edit-flight.component.html',
  styleUrls: ['./edit-flight.component.css']
})
export class EditFlightComponent implements OnInit {
  fly: any = {};
  adForm!:FormGroup;
  id: any
 
  constructor( private activatedRoute:ActivatedRoute,
    private flightservice:FlightService,
    private router:Router){ }
  ngOnInit(){
    this.id=this.activatedRoute.snapshot.paramMap.get("id");
    this.flightservice.getFlightsById(this.id).subscribe((data)=>{this.fly= data;});

  }

  editfly(){
    if(this.id){
      console.log(this.fly)
      this.flightservice.updateFlight(this.id,this.fly).subscribe((data) => { console.log('Here annonce : ',data); },
      (err) => { console.log('edit annonce error : ',err); });
    }
    }



}