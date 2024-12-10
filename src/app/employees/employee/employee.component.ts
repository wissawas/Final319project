import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
  imports:[CommonModule,ReactiveFormsModule]
})
export class EmployeeComponent implements OnInit {
  employees: any[] = [];
  employeeForm: FormGroup;
  searchTerm: string = ''; 
  first_name: string = '';
  filteredEmployee: any[] = [];
  editMode: boolean = false; // ตัวแปรสำหรับระบุสถานะโหมดแก้ไข
  editingEmployeeId: number | null = null; // เก็บ ID ของพนักงานที่กำลังแก้ไข

  constructor(private employeeService: EmployeeService, private fb: FormBuilder,private router:Router) {
    
    console.log('Edit Mode:', this.editMode); // ค่าควรเริ่มต้นเป็น false
    console.log('Editing Employee ID:', this.editingEmployeeId); // ค่าควรเริ่มต้นเป็น null
  
    this.employeeForm = this.fb.group({
      employee_id: [null],  // ไม่กำหนดค่าเริ่มต้นสำหรับ employee_id
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      position: ['', Validators.required],
      hire_date: ['', Validators.required],
      salary: [0, Validators.required],
      factory_id: [1, Validators.required],
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
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.employeeService.getEmployees().subscribe({
      next: (data) => (this.employees = data),
      error: (err) => console.error('Error fetching employees:', err),
    });
  }

  
 

  // ฟังก์ชันสำหรับเพิ่ม/แก้ไขพนักงาน
  // ฟังก์ชันเมื่อกด Submit
  onSubmit(): void {
    const employeeData = this.employeeForm.value;
    if (this.editMode && this.editingEmployeeId !== null) {
      // หากอยู่ในโหมดแก้ไข ให้ส่งคำขออัปเดต
      this.employeeService.updateEmployee(this.editingEmployeeId, employeeData).subscribe({
        next: () => {
          console.log('Employee updated successfully.');
          this.loadEmployees(); // โหลดข้อมูลใหม่
          this.cancelEdit(); // ออกจากโหมดแก้ไข
        },
        error: (err) => {
          console.error('Error updating employee:', err);
        },
      });
    } else {
      // หากไม่ได้อยู่ในโหมดแก้ไข ให้เพิ่มพนักงานใหม่
      this.employeeService.addEmployee(employeeData).subscribe({
        next: () => {
          console.log('Employee added successfully.');
          this.loadEmployees(); // โหลดข้อมูลใหม่
          this.employeeForm.reset(); // รีเซ็ตฟอร์ม
        },
        error: (err) => {
          console.error('Error adding employee:', err);
        },
      });
    }
  }
  
  
  


// ฟังก์ชัน editEmployee
editEmployee(employee: any): void {
  console.log('Editing Employee:', employee);
  this.editMode = true; // เปิดโหมดแก้ไข
  this.editingEmployeeId = employee.employee_id; // ตั้งค่ารหัสพนักงานที่ต้องการแก้ไข
  this.employeeForm.patchValue({
    employee_id: employee.employee_id, 
    first_name: employee.first_name, 
    last_name: employee.last_name, 
    position: employee.position, 
    hire_date: employee.hire_date, 
    salary: employee.salary, 
    factory_id: employee.factory_id
  });
}

// ฟังก์ชันลบพนักงาน
deleteEmployee(id: number): void {
  if (confirm('Are you sure you want to delete this employee?')) {
    this.employeeService.deleteEmployee(id).subscribe({
      next: () => {
        console.log(`Employee with ID ${id} deleted successfully.`);
        this.employees = this.employees.filter(employee => employee.employee_id !== id); // ลบข้อมูลใน UI
      },
      error: (err) => console.error('Error deleting employee:', err),
    });
  }



}





// ฟังก์ชันยกเลิกการแก้ไข
cancelEdit(): void {
  this.editMode = false; // ปิดโหมดแก้ไข
  this.editingEmployeeId = null; // ลบ ID ของพนักงานที่แก้ไข
  this.employeeForm.reset(); // รีเซ็ตฟอร์ม
}
}