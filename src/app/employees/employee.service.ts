import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = 'http://localhost:3000/api/employees';

  constructor(private http: HttpClient) {}

  getEmployees(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:3000/employees'); // URL สำหรับการดึงข้อมูล
  }

  addEmployee(employee: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, employee); // ใช้ POST เพื่อเพิ่มพนักงานใหม่
  }
  updateEmployee(id: number, employee: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, employee); // ใช้ PUT อัปเดตข้อมูล
  }
  

  // ฟังก์ชันลบพนักงาน
  deleteEmployee(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`); // เชื่อมต่อ API DELETE
  }
  
}