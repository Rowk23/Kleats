package org.example.simpli.entities;

import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Data
@Entity
@Table(name = "filters")
public class Filters {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;
    String name;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
        name = "filter_products",
        joinColumns = @JoinColumn(name = "filter_id"),
        inverseJoinColumns = @JoinColumn(name = "product_id")
    )
    @JsonManagedReference
    Set<Product> products;
}
