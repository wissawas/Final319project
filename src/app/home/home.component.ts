import { Component, OnInit , HostListener } from '@angular/core';
import { HomeService } from './home.service';
import { RouterModule,Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  data: any;

  constructor(private homeService: HomeService , private router: Router) {}

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    const navbar = document.querySelector('.navbar') as HTMLElement;
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
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
    this.homeService.getData().subscribe(response => {
      this.data = response;
    });
  }
}
