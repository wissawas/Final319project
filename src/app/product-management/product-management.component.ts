import { Component,OnInit } from '@angular/core';
import { Product } from './product.model';
import { NgModel, ReactiveFormsModule } from '@angular/forms';
import { FormsModule,Validators,FormGroup,FormBuilder } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductService } from './service/product.service';
import { error } from 'console';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-management', // ต้องตรงกับที่ใช้งานใน HTML
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.css'],
  imports: [CommonModule,ReactiveFormsModule]
})

export class ProductManagementComponent implements OnInit {
  products: any[] = [];
  productForm: FormGroup;

  editMode: boolean = false; // ตัวแปรสำหรับระบุสถานะโหมดแก้ไข
  editingProductId: number | null = null; // เก็บ ID ของ product ที่กำลังแก้ไข

  constructor(private productService: ProductService, private fb: FormBuilder, private router:Router) {
    console.log('Edit Mode:', this.editMode); // ค่าควรเริ่มต้นเป็น false
    console.log('Editing Product ID:', this.editingProductId); // ค่าควรเริ่มต้นเป็น null

    this.productForm = this.fb.group({
      product_id: [null], // ไม่กำหนดค่าเริ่มต้นสำหรับ product_id
      product_name: ['', Validators.required], // ชื่อสินค้า
      category: ['', Validators.required], // คำอธิบายสินค้า
      price: [0, Validators.required], // ราคาสินค้า
      quantity_in_stock: [0, Validators.required], // จำนวนสินค้า
      factory_id: [1, Validators.required],
      
    });
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (data) => (this.products = data),
      error: (err) => console.error('Error fetching products:', err),
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
  // ฟังก์ชันสำหรับเพิ่ม/แก้ไขสินค้า
  onSubmit(): void {
    const productData = this.productForm.value;
    if (this.editMode && this.editingProductId !== null) {
      // หากอยู่ในโหมดแก้ไข ให้ส่งคำขออัปเดต
      this.productService.updateProduct(this.editingProductId, productData).subscribe({
        next: () => {
          console.log('Product updated successfully.');
          this.loadProducts(); // โหลดข้อมูลใหม่
          this.cancelEdit(); // ออกจากโหมดแก้ไข
        },
        error: (err) => {
          console.error('Error updating product:', err);
        },
      });
    } else {
      // หากไม่ได้อยู่ในโหมดแก้ไข ให้เพิ่มสินค้าใหม่
      this.productService.addProduct(productData).subscribe({
        next: () => {
          console.log('Product added successfully.');
          this.loadProducts(); // โหลดข้อมูลใหม่
          this.productForm.reset(); // รีเซ็ตฟอร์ม
        },
        error: (err) => {
          console.error('Error adding product:', err);
        },
      });
    }
  }

  // ฟังก์ชัน editProduct
  editProduct(product: any): void {
    console.log('Editing Product:', product);
    this.editMode = true; // เปิดโหมดแก้ไข
    this.editingProductId = product.product_id; // ตั้งค่ารหัสสินค้าที่ต้องการแก้ไข
    this.productForm.patchValue({
      product_id: product.product_id, 
      product_name: product.product_name, 
      category:product.category,
      price: product.price, 
      quantity_in_stock:product.quantity_in_stock, 
      factory_id: product.factory_id, 
      
    });
  }

  // ฟังก์ชันลบสินค้า
  deleteProduct(id: number): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(id).subscribe({
        next: () => {
          console.log(`Product with ID ${id} deleted successfully.`);
          this.products = this.products.filter(product => product.product_id !== id); // ลบข้อมูลใน UI
        },
        error: (err) => console.error('Error deleting product:', err),
      });
    }
  }

  // ฟังก์ชันยกเลิกการแก้ไข
  cancelEdit(): void {
    this.editMode = false; // ปิดโหมดแก้ไข
    this.editingProductId = null; // ลบ ID ของสินค้า
    this.productForm.reset(); // รีเซ็ตฟอร์ม
  }
}