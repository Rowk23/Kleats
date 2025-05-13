import {Component, HostListener, inject, OnInit} from '@angular/core';
import {RouterLink} from '@angular/router';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {ProductService} from '../../services/product.service';
import {Product} from '../../models/Product';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-navbar',
  imports: [
    RouterLink,
    NgOptimizedImage,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
  products:any;
  searchValue: string = '';
  productService = inject(ProductService);
  formBuilder = inject(FormBuilder);
  searchForm = this.formBuilder.nonNullable.group({
    searchValue: '',
  });

  fetch(){
    this.productService.getSearch(this.searchValue).subscribe((data) => {
      this.products = data;
    })
  }

  onSearchSubmit(){
    this.searchValue = this.searchForm.value.searchValue ?? '';
    this.fetch();
  }

  ngOnInit(): void {
  }
  @HostListener("document:click")
  resetProducts(){
    this.products = [];
  }

}
