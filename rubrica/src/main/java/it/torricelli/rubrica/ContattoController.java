package it.torricelli.rubrica;

import java.util.List;

import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/contatti")
@CrossOrigin(origins = "*")
public class ContattoController {

    private final ContattoService service;

    public ContattoController(ContattoService service) {
        this.service = service;
    }

    @GetMapping
    public List<Contatto> getAll() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Contatto> getById(@PathVariable Long id) {
        return service.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/cerca")
    public List<Contatto> cerca(@RequestParam String nome) {
        return service.findByNome(nome);
    }

    @PostMapping
    public Contatto create(@Valid @RequestBody Contatto contatto) {
        return service.save(contatto);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Contatto> update(@PathVariable Long id, @Valid @RequestBody Contatto contatto) {
        return service.findById(id)
                .map(existing -> {
                    existing.setNome(contatto.getNome());
                    existing.setCognome(contatto.getCognome());
                    existing.setTelefono(contatto.getTelefono());
                    existing.setEmail(contatto.getEmail());
                    return ResponseEntity.ok(service.save(existing));
                })
                .orElse(ResponseEntity.notFound().build());
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }


}