package org.example.simpli.services;

import java.util.List;

import jakarta.persistence.criteria.*;
import org.example.simpli.entities.Filters;
import org.example.simpli.entities.Product;
import org.springframework.data.jpa.domain.Specification;

public class ProductSpecification {

    private ProductSpecification(){};

    public static Specification<Product> withFilters(List<String> filterNames){
    return (root, query, builder) -> {

        query.groupBy(root.get("id"));
        query.distinct(true);
        Join<Product, Filters> filtersJoin = root.join("filters", JoinType.INNER);


        Predicate hasFilter =  filtersJoin.get("name").in(filterNames);
        Expression<Long> filterCount = builder.countDistinct(filtersJoin.get("name"));
        Predicate having = builder.equal(filterCount, filterNames.size());

        query.having(having);

        return hasFilter;
    };
    }
}
