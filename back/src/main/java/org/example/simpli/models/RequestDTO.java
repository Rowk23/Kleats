package org.example.simpli.models;

import lombok.Getter;
import org.example.simpli.entities.Product;

@Getter
public class RequestDTO {
    private Long amount;
    private Long quantity;
    private String name;
    private String currency;
}
