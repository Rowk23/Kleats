package org.example.simpli.services;

import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.example.simpli.entities.Product;
import org.example.simpli.repositories.ProductRepository;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProductService {
    private final ProductRepository productRepository;
    Pageable searchmax = PageRequest.of(0,3);

    public List<Product> getAll(List<String> list){
        Specification<Product> filters = Specification.where(CollectionUtils.isEmpty(list) ? null : ProductSpecification.withFilters(list));
    
        return productRepository.findAll(filters, Sort.by(Sort.Direction.ASC,"name")).stream().toList();
    }

    public Optional<Product> getProduct(int id){
        return productRepository.findById(id);
    }

    public List<Product> getLike(String name){
        return productRepository.findByNameContains(name,searchmax);
    }
}
