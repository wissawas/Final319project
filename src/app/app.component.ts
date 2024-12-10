import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { CommonModule } from '@angular/common';  
import { RouterModule, Routes } from '@angular/router';  


import { HomeComponent } from './home/home.component'; 
import { EmployeeComponent } from './employees/employee/employee.component';
import { FactoryComponent } from './Factoryy/factoriee/factoriee.component';
import { ProductManagementComponent } from './product-management/product-management.component';
import { AddCompanyComponent } from './add-company/add-company.component';


const routes: Routes = [
  { path: '', component: HomeComponent }, 
  { path: 'add-employee', component: EmployeeComponent }, 
  { path: 'add-factoriee', component: FactoryComponent }, 
  { path: 'add-product-management', component: ProductManagementComponent }, 
  { path: 'add-company', component: AddCompanyComponent }, 
];

@Component({
  selector: 'app-root',
  standalone: true, 
  imports: [CommonModule, RouterModule], 
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showNav: boolean = true; 

  constructor(private router: Router) {
    
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)  
    ).subscribe((event) => {
      if (event.url === '/add-employee') {
        this.showNav = false;  
      } else {
        this.showNav = true; 
      }
    });
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)  
    ).subscribe((event) => {
      if (event.url === '/add-factoriee') {
        this.showNav = false;  
      } else {
        this.showNav = true; 
      }
    });
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)  
    ).subscribe((event) => {
      if (event.url === '/add-product-management') {
        this.showNav = false;  
      } else {
        this.showNav = true; 
      }
    });
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)  
    ).subscribe((event) => {
      if (event.url === '/add-company') {
        this.showNav = false;  
      } else {
        this.showNav = true; 
      }
    });
    this.router.resetConfig(routes);
  }
}
