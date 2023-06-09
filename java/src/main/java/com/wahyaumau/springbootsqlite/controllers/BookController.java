package com.wahyaumau.springbootsqlite.controllers;

import com.wahyaumau.springbootsqlite.entities.Book;
import com.wahyaumau.springbootsqlite.services.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/books")
public class BookController {
    @Autowired
    BookService service;

    @GetMapping
    public List<Book> findAll(){
        return service.findAll();
    }

    @GetMapping("/{id}")
    public Book findById(@PathVariable long id){
        return service.findById(id);
    }

    @PostMapping
    public ResponseEntity<?> save(@RequestBody Book book){
        return ResponseEntity.status(HttpStatus.CREATED).body(service.save(book));
    }

    @PutMapping("/{id}")
    public Book update(@PathVariable long id, @RequestBody Book book){
        return service.update(id, book);
    }

    @DeleteMapping("/{id}")
    public Book delete(@PathVariable long id){
        return service.delete(id);
    }
}
