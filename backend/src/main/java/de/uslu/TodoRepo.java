package de.uslu;

import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.HashMap;

@Repository
public class TodoRepo {

    private final HashMap<String,Todo> todos = new HashMap<>();


    public Collection<Todo> list() {
        return todos.values();
    }

    public void createTodo(Todo todo) {
        todos.put(todo.getId(),todo);
    }

    public Todo getById(String id) {
        return todos.get(id);
    }

    public void deleteTodo(String id) {
        todos.remove(id);
    }

}
