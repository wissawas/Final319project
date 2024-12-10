import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://localhost:3000/api/product'; // URL ของ API Backend

  constructor(private http: HttpClient) {}

  // ดึงข้อมูลสินค้าทั้งหมด
  getProducts(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:3000/product');
  }

  // เพิ่มสินค้าใหม่
  addProduct(product: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, product);
  }

  // อัปเดตข้อมูลสินค้า
  updateProduct(id: number, product: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, product);
  }

  // ลบสินค้า
  deleteProduct(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
