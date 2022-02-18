package de.uslu;

import org.springframework.stereotype.Service;

import java.util.Collection;

@Service
public class TodoService {

    private final TodoRepo todoRepo;

    public TodoService(TodoRepo todoRepo) {
        this.todoRepo = todoRepo;
    }

    public Collection<Todo> list() {
        return todoRepo.list();
    }

    public void createTodo(Todo todo) {
        todoRepo.createTodo(todo);
    }


}
