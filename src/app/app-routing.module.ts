import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { ReportComponent } from './pages/report/report.component';
import { SignupComponent } from './pages/signup/signup.component';
import { FlightHistoryComponent } from './pages/flight-history/flight-history.component';
import { AccountSettingsComponent } from './pages/account-settings/account-settings.component';
import { FlightBookingComponent } from './pages/flight-booking/flight-booking.component';
import { InvoiceComponent } from './pages/invoice/invoice.component';
import { FlightsComponent } from './pages/flights/flights.component';
import { FlightDetailsComponent } from './pages/flight-details/flight-details.component';
import { AddFlightComponent } from './pages/add-flight/add-flight.component';
import { FlightTicketsComponent } from './pages/flight-tickets/flight-tickets.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { DisplayIssuesComponent } from './pages/display-issues/display-issues.component';
import { AuthGuard } from './guards/auth.guard';
import { EditFlightComponent } from './pages/edit-flight/edit-flight.component';
import { MyBookingComponent } from './pages/my-booking/my-booking.component';
import { MyIssuesComponent } from './pages/my-issues/my-issues.component';


const routes: Routes = [
  { path: '', component: HomeComponent,  },
  { path: 'login-page', component: LoginPageComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'aboutus', component: AboutUsComponent },
  { path: 'contactus', component: ContactUsComponent },
  {
    path: 'report-issue',
    component: ReportComponent,
    canActivate:[AuthGuard], data:{roles:['Admin','User']}  },
    {
      path: 'my-booking',
      component: MyBookingComponent,
      canActivate:[AuthGuard], data:{roles:['Admin','User']}  },
      
    {
      path: 'edit-flight/:id',
      component: EditFlightComponent,
      canActivate:[AuthGuard], data:{roles:['Admin','User']}  },
  {
    path: 'issues',
    component: DisplayIssuesComponent,
    canActivate:[AuthGuard], data:{roles:['Admin','User']}  },
    {
      path: 'my-issues',
      component: MyIssuesComponent,
      canActivate:[AuthGuard], data:{roles:['Admin','User']}  },
  {
    path: 'flights/:fr/:to/:d1/:d2',
    component: FlightsComponent,
    canActivate:[AuthGuard], data:{roles:['Admin','User']}
    
  },
  {
    path: 'flight-details/:id',
    component: FlightDetailsComponent,
    canActivate:[AuthGuard], data:{roles:['Admin','User']}
  },
  {
    path: 'flight-booking',
    component: FlightBookingComponent,canActivate:[AuthGuard], data:{roles:['Admin','User']}
  },
  {
    path: 'flight-tickets/:id',
    component: FlightTicketsComponent,
    canActivate:[AuthGuard], data:{roles:['Admin','User']}
  },
  {
    path: 'flight-history',
    component: FlightHistoryComponent,
    canActivate:[AuthGuard], data:{roles:['Admin','User']}  },
  {
    path: 'flight-receipt',
    component: InvoiceComponent,
    canActivate:[AuthGuard], data:{roles:['Admin','User']}  },
  {
    path: 'add-flight',
    component: AddFlightComponent,
    canActivate:[AuthGuard], data:{roles:['Admin','User']}
  },
  {
    path: 'account-settings',
    component: AccountSettingsComponent,
    canActivate:[AuthGuard], data:{roles:['Admin','User']}
  },
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
