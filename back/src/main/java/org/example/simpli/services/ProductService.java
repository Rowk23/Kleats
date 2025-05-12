package org.example.simpli.services;

import lombok.AllArgsConstructor;
import org.example.simpli.entities.Filters;
import org.example.simpli.entities.Product;
import org.example.simpli.repositories.ProductRepository;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class ProductService {
    private final ProductRepository productRepository;

    public List<Product> getAll(List<String> list){
        Specification<Product> filters = Specification.where(CollectionUtils.isEmpty(list) ? null : ProductSpecification.withFilters(list));
    
        return productRepository.findAll(filters).stream().toList();
    }

    public Optional<Product> getProduct(int id){
        return productRepository.findById(id);
    }

    public List<Product> getLike(String name){
        return productRepository.findByNameContains(name);
    }
}
