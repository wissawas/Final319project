import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { CommonModule } from '@angular/common';
import { FactoryService } from './factory.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-factoriee',
  templateUrl: './factoriee.component.html',
  styleUrls: ['./factoriee.component.css'],
  imports: [CommonModule,ReactiveFormsModule]
})
export class FactoryComponent implements OnInit {
  factories: any[] = [];
  factoryForm: FormGroup;

  editMode: boolean = false; // สถานะแก้ไข
  editingFactoryId: number | null = null; // เก็บ ID โรงงานที่กำลังแก้ไข

  constructor(private factoryService: FactoryService, private fb: FormBuilder, private router: Router,) {
    this.factoryForm = this.fb.group({
      factory_id: [1, Validators.required],
      factory_name: ['', Validators.required],
      location: ['', Validators.required],
      established_year: [null, Validators.required],
      contact_number: [0, Validators.required],
      email: ['', Validators.required],
    });
  }
  navigateHome() {
    this.router.navigate(['/']); 
  }

  navigateFactory() {
    this.router.navigate(['/add-factoriee']); 
  }

  navigateProducts() {
    this.router.navigate(['/add-product-management']); 
  }

   navigateEmployee() {
    this.router.navigate(['/add-employee']); 
  }

  navigateAddCompany() {
    this.router.navigate(['/add-company']); 
  }

  
  ngOnInit(): void {
    this.loadFactory();
  }

  loadFactory(): void {
    this.factoryService.getFactory().subscribe({
      next: (data) => (this.factories = data),
      error: (err) => {
        console.error('Error fetching factory:', err);
        alert('Error fetching factory data.');
      },
    });
  }

  onSubmit(): void {
    const factoryData = this.factoryForm.value;
    if (this.editMode && this.editingFactoryId !== null) {
      this.factoryService.updateFactory(this.editingFactoryId, factoryData).subscribe({
        next: () => {
          console.log('Factory updated successfully.');
          this.loadFactory();
          this.cancelEdit();
        },
        error: (err) => console.error('Error updating factory:', err),
      });
    } else {
      this.factoryService.addFactory(factoryData).subscribe({
        next: () => {
          console.log('Factory added successfully.');
          this.loadFactory();
          this.factoryForm.reset();
        },
        error: (err) => console.error('Error adding factory:', err),
      });
    }
  }

  editFactory(factory: any): void {
    console.log('Editing factory:', factory);
    this.editMode = true; // เปิดโหมดแก้ไข
    this.editingFactoryId = factory.factory_id; // ตั้งค่ารหัสพนักงานที่ต้องการแก้ไข
    this.factoryForm.patchValue({
      no:factory.no,
      factory_id: factory.factory_id, 
      factory_name: factory.factory_name, 
      location: factory.location, 
      established_year: factory.established_year, 
      contact_number: factory.contact_number, 
      email: factory.email,
    });
  }
  deleteFactory(id: number): void {
    if (confirm('Are you sure you want to delete this factory?')) {
      this.factoryService.deleteFactory(id).subscribe({
        next: () => {
          console.log(`Factory with ID ${id} deleted successfully.`);
          this.factories = this.factories.filter(factory => factory.factory_id !== id);
        },
        error: (err) => console.error('Error deleting factory:', err),
      });
    }
  }

  cancelEdit(): void {
    this.editMode = false;
    this.editingFactoryId = null;
    this.factoryForm.reset();
  }
}
