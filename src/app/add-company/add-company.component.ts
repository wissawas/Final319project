import { Component, HostListener } from '@angular/core';
import { CompanyService } from './company.service';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';  

@Component({
  selector: 'app-add-company',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.css'],
})
export class AddCompanyComponent {
  companyForm: FormGroup;
  editMode: boolean = false; // สถานะแก้ไข
  editingCompanyId: number | null = null;
  company_id:number=0;
  company_name: string = '';
  address: string = '';
  contact_number: string = '';
  email: string = '';
  website: string = '';

  companies: any[] = [];
  filteredCompanies: any[] = [];
  searchTerm: string = ''; 
  pageSize: string = '5';  
  formVisible: boolean = false;
  currentPage: number = 1; 
  totalPages: number = 0; 
  lastScrollTop = 0; 

  constructor(private companyService: CompanyService, private router: Router,private fb: FormBuilder) {  // Inject Router
    this.companyForm = this.fb.group({
      company_id: [1, Validators.required],
      company_name: ['', Validators.required],
      address: ['', Validators.required],
      contact_number: [0, Validators.required],
      email: ['', Validators.required],
      website: ['', Validators.required]
    });
  
    this.getCompanies();
    
    this.totalPages = 0; 
    this.updateCompanyDisplay(); 
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



  toggleForm() {
    this.formVisible = !this.formVisible;
  }

  
  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event): void {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    
    if (currentScroll > this.lastScrollTop) {
     
      document.querySelector('.hide-add-btn')?.classList.add('hidden');
    } else {
      
      document.querySelector('.hide-add-btn')?.classList.remove('hidden');
    }

    
    this.lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
  }

  isFormValid(): boolean {
    return !!this.company_name && !!this.address && !!this.contact_number && !!this.email && !!this.website;
  }

  getPaginatedData() {
    const numericPageSize = isNaN(+this.pageSize) ? 5 : +this.pageSize;
    const numericCurrentPage = isNaN(+this.currentPage) ? 1 : +this.currentPage; 
    
    const start = (numericCurrentPage - 1) * numericPageSize;
    const end = start + numericPageSize;
    
    return this.companies.slice(start, end); 
}

goToPage(page: number) {
  if (page >= 1 && page <= this.totalPages) {
    this.currentPage = page;
    this.updateCompanyDisplay(); 
  }
}



  getPagesArray() {
    const pages = [];
    for (let i = 1; i <= this.totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }

  ngOnInit() {
    this.getCompanies(); 
  }

  updateTotalPages() {
    
    if (this.pageSize === 'all') {
      this.totalPages = 1; 
    } else {
    
      const numericPageSize = +this.pageSize; 
      this.totalPages = Math.ceil(this.companies.length / numericPageSize);
    }
  }
  
  fetchCompanies(): void {
    this.companyService.getCompanies().subscribe(data => {
      this.companies = data;
      this.updateCompanyDisplay();
    }, error => {
      console.error('Error fetching companies', error);
    });
  }

  addCompany() {
    const companyData = {
      company_id: this.company_id,
      company_name: this.company_name,
      address: this.address,
      contact_number: this.contact_number,
      email: this.email,
      website: this.website,
    };

    this.companyService.addCompany(companyData).subscribe(
      (response) => {
        console.log('Company added successfully:', response);
        alert('Company added successfully!');
        this.getCompanies(); 
        this.clearForm(); 
      },
      (error) => {
        console.error('Error adding company:', error);
        alert('Failed to add company');
      }
    );
  }

  getCompanies() {
    this.companyService.getCompanies().subscribe(
      (companies) => {
        this.companies = companies;
        this.updateCompanyDisplay();
      },
      (error) => {
        console.error('Error fetching companies:', error);
      }
    );
  }

  updateCompanyDisplay() {
    this.updateTotalPages(); 
    if (this.pageSize === 'all') {
      this.filteredCompanies = this.companies; 
    } else {
      this.filteredCompanies = this.getPaginatedData();
    }
  }

  editCompany(companies: any): void {
    console.log('Editing factory:', companies);
    this.editMode = true; // เปิดโหมดแก้ไข
    this.editingCompanyId = companies.factory_id; // ตั้งค่ารหัสพนักงานที่ต้องการแก้ไข
    this.companyForm.patchValue({
      company_id:companies.company_id,
      company_name: companies.company_name, 
      address: companies.address, 
      contact_number: companies.contact_number, 
      email: companies.email,  
      website: companies.website,
    });
  }
  deleteCompany(id: number): void {
    if (confirm('Are you sure you want to delete this factory?')) {
      this.companyService.deleteCompany(id).subscribe({
        next: () => {
          console.log(`Factory with ID ${id} deleted successfully.`);
          this.companies = this.companies.filter(companies => companies.company_id !== id);
        },
        error: (err) => console.error('Error deleting factory:', err),
      });
    }
  }
  clearForm(): void {
    this.company_name = '';
    this.address = '';
    this.contact_number = '';
    this.email = '';
    this.website = '';
  }

  onSearch(): void {
    const searchTermLower = this.searchTerm.toLowerCase();
    this.filteredCompanies = this.companies.filter(company =>
      company.company_name.toLowerCase().includes(searchTermLower)
    );
  }

  getCompanyCount(): number {
    return this.filteredCompanies.length;
  }
}
