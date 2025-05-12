package org.example.simpli.controllers;

import com.stripe.Stripe;
import com.stripe.model.Customer;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.example.simpli.entities.Product;
import org.example.simpli.models.RequestDTO;
import org.example.simpli.services.ProductService;
import org.example.simpli.services.StripeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@CrossOrigin("http://localhost:4200")
@RequiredArgsConstructor
@RestController
@RequestMapping("/api")
public class ProductController {
    private final ProductService productService;
    private final StripeService stripeService;

    @GetMapping
    public String test() {
        return "Test!";
    }

    @GetMapping("/products")
    public List<Product> get(@RequestParam(required = false) List<String> list) {
        return productService.getAll(list);
    }

    @GetMapping("/products/{id}")
    public Optional<Product> getOne(@PathVariable int id) {
        return productService.getProduct(id);
    }

    @GetMapping("/products/search/{name}")
    public List<Product> getOne(@PathVariable String name) {
        return productService.getLike(name);
    }

    @PostMapping("/checkout/hosted")
    void hostedCheckout(@RequestBody RequestDTO request) {
        return ;
    }
}
