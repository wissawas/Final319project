import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  private apiUrl = 'http://localhost:3000/api/companies';
  
  constructor(private http: HttpClient) {}

  
  addCompany(company: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, company); // ใช้ POST เพื่อเพิ่มพนักงานใหม่
  }
  updateCompany(id: number, company: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, company); // ใช้ PUT อัปเดตข้อมูล
  }
  

  // ฟังก์ชันลบพนักงาน
  deleteCompany(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`); // เชื่อมต่อ API DELETE
  }
  

 
  getCompanies(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:3000/companies');
  }
}
