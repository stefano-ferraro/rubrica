package it.torricelli.rubrica;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ContattoRepository extends JpaRepository<Contatto, Long> {
    List<Contatto> findByNomeContainingIgnoreCase(String nome);
}