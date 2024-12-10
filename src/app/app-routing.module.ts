import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from './employees/employee/employee.component';
import { FactoryComponent } from './Factoryy/factoriee/factoriee.component';
import { HomeComponent } from './home/home.component';
import { ProductManagementComponent } from './product-management/product-management.component';

const routes: Routes = [
  { path: '', component: HomeComponent }, 
  { path: 'add-employee', component: EmployeeComponent }, 
  { path: 'add-factoriee', component: FactoryComponent },
  { path: 'add-product-management', component: ProductManagementComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }, 
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}