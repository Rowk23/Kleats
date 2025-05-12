package org.example.simpli.repositories;

import org.example.simpli.entities.Filters;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface FiltersRepository extends JpaRepository<Filters, Integer>, JpaSpecificationExecutor<Filters> {
}
