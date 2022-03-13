package de.uslu;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TodoService {

    private final TodoRepo todoRepo;

    public Collection<Todo> list() {
        return todoRepo.findAll();
    }

    public Todo createTodo(Todo todo) {
         return todoRepo.save(todo);
    }

    public Optional<Todo> setComplete(String id) {
        var foundTodo = todoRepo.findById(id);
        if (foundTodo.isPresent()) {
            foundTodo.get().setCompleted(true);
        }
        return null;
    }

    public void setCompleted(String id, Todo changedTodo) {
        var foundTodo = todoRepo.findById(id);
            if (foundTodo.isPresent()) {
               Todo newTodo = foundTodo.get();
                newTodo.setTitle(changedTodo.getTitle());
                newTodo.setDescription(changedTodo.getDescription());
                todoRepo.save(newTodo);
        }
    }


    public void deleteTodoItem(String id) {
        todoRepo.deleteById(id);
    }

    public void deleteCompletedTodos() {
        var list = todoRepo.findAll().stream().filter(e -> e.isCompleted())
                .toList();
        for (Todo todo: list) {
            todoRepo.findAll().remove(todo);
        }
    }

    public Todo getTodo(String id) {
        var foundTodo =  todoRepo.findById(id);
        if (foundTodo.isPresent()) {
           return foundTodo.get();
        }
        return new Todo();
    }

    public List<Todo> findAllCompleted() {
        return todoRepo.findAllByCompleted(true);
    }
}
