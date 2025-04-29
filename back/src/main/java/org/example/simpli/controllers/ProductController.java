package org.example.simpli.controllers;

import lombok.AllArgsConstructor;
import org.example.simpli.entities.Product;
import org.example.simpli.services.ProductService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin("http://localhost:4200")
@AllArgsConstructor
@RestController
@RequestMapping("/api")
public class ProductController {
    private final ProductService productService;

    @GetMapping
    public String test(){
        return "Test!";
    }
    @GetMapping("/products")
    public List<Product> get() {
        return productService.getAll();
    }
    @GetMapping("/products/{id}")
    public Optional<Product> getOne(@PathVariable int id){
        return productService.getProduct(id);
    }
}
