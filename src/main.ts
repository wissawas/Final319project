import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter, Route } from '@angular/router';
import { HomeComponent } from './app/home/home.component';
import { EmployeeComponent } from './app/employees/employee/employee.component';
import { FactoryComponent } from './app/Factoryy/factoriee/factoriee.component';
import { ProductManagementComponent } from './app/product-management/product-management.component';
import { AddCompanyComponent } from './app/add-company/add-company.component';

const routes: Route[] = [
  { path: '', component: HomeComponent }, 
  { path: 'add-employee', component: EmployeeComponent }, 
  { path: 'add-factoriee', component: FactoryComponent }, 
  { path: 'add-product-management', component: ProductManagementComponent },
  { path: 'add-company', component: AddCompanyComponent }, 
];

bootstrapApplication(AppComponent,{
  providers:[
    provideHttpClient(),
    provideRouter(routes)
  ]
} )
  .catch((err) => console.error(err));
