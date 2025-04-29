package org.example.simpli.services;

import lombok.AllArgsConstructor;
import org.example.simpli.entities.Product;
import org.example.simpli.repositories.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class ProductService {
    private final ProductRepository productRepository;

    public List<Product> getAll(){
        return productRepository.findAll();
    }

    public Optional<Product> getProduct(int id){
        return productRepository.findById(id);
    }
}
