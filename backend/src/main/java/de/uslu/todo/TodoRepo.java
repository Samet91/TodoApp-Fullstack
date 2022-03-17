package de.uslu.todo;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TodoRepo extends MongoRepository<Todo, String> {

    List<Todo> findAllByCompletedAndUsername(boolean completed, String username);
    List<Todo> findAllByUsername(String username);
    void deleteByIdAndUsername(String id, String username);

}