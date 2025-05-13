package org.example.simpli.models;

import lombok.Getter;
import org.example.simpli.entities.Product;

@Getter
public class RequestDTO {
    private ProductDTO[] products;
    private String currency;
}
