package com.wahyaumau.springbootsqlite.controllers;

import com.wahyaumau.springbootsqlite.entities.Author;
import com.wahyaumau.springbootsqlite.services.AuthorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/authors")
public class AuthorController {
    @Autowired
    AuthorService service;

    @GetMapping
    public List<Author> findAll(){
        return service.findAll();
    }

    @GetMapping("/{id}")
    public Author findById(@PathVariable long id){
        return service.findById(id);
    }

    @PostMapping
    public ResponseEntity<?> save(@RequestBody Author author){
        return ResponseEntity.status(HttpStatus.CREATED).body(service.save(author));
    }

    @PutMapping("/{id}")
    public Author update(@PathVariable long id, @RequestBody Author author){
        return service.update(id, author);
    }

    @DeleteMapping("/{id}")
    public Author delete(@PathVariable long id){
        return service.delete(id);
    }
}
