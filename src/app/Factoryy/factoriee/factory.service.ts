import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FactoryService {
  private apiUrl = 'http://localhost:3000/api/factories';

  constructor(private http: HttpClient) {}

  getFactory(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:3000/factories'); // ใช้ apiUrl ที่กำหนด
  }

  addFactory(factory: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, factory); // ใช้ POST เพื่อเพิ่มพนักงานใหม่
  }
  updateFactory(id: number, factory: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, factory); // ใช้ PUT อัปเดตข้อมูล
  }
  

  // ฟังก์ชันลบพนักงาน
  deleteFactory(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`); // เชื่อมต่อ API DELETE
  }
  
}