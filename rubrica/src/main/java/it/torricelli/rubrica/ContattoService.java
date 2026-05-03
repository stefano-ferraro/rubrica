package it.torricelli.rubrica;

import java.util.List;
import java.util.Optional;
import org.springframework.stereotype.Service;

@Service
public class ContattoService {

    private final ContattoRepository repository;

    public ContattoService(ContattoRepository repository) {
        this.repository = repository;
    }

    public List<Contatto> findAll() {
        return repository.findAll();
    }

    public Optional<Contatto> findById(Long id) {
        return repository.findById(id);
    }

    public Contatto save(Contatto contatto) {
        return repository.save(contatto);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }

    public List<Contatto> findByNome(String nome) {
        return repository.findByNomeContainingIgnoreCase(nome);
    }
}