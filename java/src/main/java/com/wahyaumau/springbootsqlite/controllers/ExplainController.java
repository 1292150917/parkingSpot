package com.wahyaumau.springbootsqlite.controllers;
import com.wahyaumau.springbootsqlite.entities.Author;
import com.wahyaumau.springbootsqlite.entities.Explain;
import com.wahyaumau.springbootsqlite.models.BaseResponse;
import com.wahyaumau.springbootsqlite.services.ExplainService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/explain")
public class ExplainController {
    @Autowired
    private ExplainService explainService;

    @PostMapping
    public BaseResponse save(@RequestBody Explain explain){
        return explainService.save(explain);
    }

    @PutMapping("/{id}")
    public BaseResponse update(@PathVariable Long id, @RequestBody Explain explain) {
        return explainService.update(id, explain);
    }

    @DeleteMapping("/{id}")
    public BaseResponse delete(@PathVariable Long id) {
        return explainService.delete(id);
    }

    @GetMapping
    public List<Explain> findAll() {
        return explainService.findAll();
    }
}