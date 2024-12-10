import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { EmployeeComponent } from './employees/employee/employee.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule,ReactiveFormsModule } from '@angular/forms'; // นำเข้า ReactiveFormsModule
import { FactoryComponent } from './Factoryy/factoriee/factoriee.component';
import { ProductManagementComponent } from './product-management/product-management.component';
import { AddCompanyComponent } from './add-company/add-company.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent,
    FactoryComponent,
    ProductManagementComponent,
    AddCompanyComponent
     // เพิ่ม EmployeeComponent ใน declarations
  ],
  imports: [
    BrowserModule,HttpClientModule,
    RouterModule.forRoot([]), 
    AppRoutingModule,
    ReactiveFormsModule,FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent] // ชี้ไปที่ AppComponent
})
export class AppModule {}