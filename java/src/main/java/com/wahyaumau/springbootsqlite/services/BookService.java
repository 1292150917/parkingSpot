package com.wahyaumau.springbootsqlite.services;

import com.wahyaumau.springbootsqlite.entities.Author;
import com.wahyaumau.springbootsqlite.entities.Book;
import com.wahyaumau.springbootsqlite.exceptions.NotFoundException;
import com.wahyaumau.springbootsqlite.repositories.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookService {
    @Autowired
    BookRepository repository;
    
    @Autowired
    AuthorService authorService;

    public List<Book> findAll(){
        return repository.findAll();
    }

    public Book findById(long id){
        return repository.findById(id).orElseThrow(() -> new NotFoundException("Book with id " + id +" not found"));
    }

    public Book save(Book book){
        Author author = authorService.findById(book.getAuthorId());
        book.setAuthor(author);
        return repository.save(book);
    }

    public Book update(long id, Book book){
        Book bookFromDb = findById(id);
        Author author = authorService.findById(book.getAuthorId());
        book.setId(bookFromDb.getId());
        book.setCreatedAt(bookFromDb.getCreatedAt());
        book.setAuthor(author);
        return repository.save(book);
    }

    public Book delete(long id){
        Book book = findById(id);
        repository.delete(book);
        return book;
    }
}
