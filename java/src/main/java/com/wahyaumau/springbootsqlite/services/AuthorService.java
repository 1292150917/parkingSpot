package com.wahyaumau.springbootsqlite.services;

import com.wahyaumau.springbootsqlite.exceptions.NotFoundException;
import com.wahyaumau.springbootsqlite.entities.Author;
import com.wahyaumau.springbootsqlite.repositories.AuthorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AuthorService {
    @Autowired
    AuthorRepository repository;

    public List<Author> findAll(){
        return repository.findAll();
    }

    public Author findById(long id){
        return repository.findById(id).orElseThrow(() -> new NotFoundException("Author with id " + id +" not found"));
    }

    public Author save(Author author){
        return repository.save(author);
    }

    public Author update(long id, Author author){
        Author authorFromDb = findById(id);
        author.setId(authorFromDb.getId());
        author.setCreatedAt(authorFromDb.getCreatedAt());
        return repository.save(author);
    }

    public Author delete(long id){
        Author author = findById(id);
        repository.delete(author);
        return author;
    }
}
