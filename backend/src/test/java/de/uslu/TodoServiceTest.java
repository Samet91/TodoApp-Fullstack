package de.uslu;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Collection;
import java.util.HashMap;

import static org.junit.jupiter.api.Assertions.*;


class TodoServiceTest {

    @Test
    void shouldAddNewTodo() {

        TodoRepo todoRepo = new TodoRepo();
        TodoService todoService = new TodoService(todoRepo);

        todoService.createTodo(new Todo("waschen", false, "irgendwas"));
        todoService.createTodo(new Todo("bügeln", false, "irgendwas2"));

        Collection<Todo> actual = todoService.list();
        assertTrue(actual.size() == 2);

    }

    @Test
    void shouldSetTodoCompleted() {

        TodoRepo todoRepo = new TodoRepo();
        Todo todo = new Todo("lernen", false, "irgendwas");
        todoRepo.createTodo(todo);
        TodoService todoService = new TodoService(todoRepo);

        todoService.setComplete(todo.getId());

        assertTrue(todoService.getId(todo.getId()).isCompleted());
    }

    @Test
    void shouldDeleteTodoItem() {

        TodoRepo todoRepo = new TodoRepo();
        Todo todo = new Todo("lernen", false, "irgendwas");
        todoRepo.createTodo(todo);

        TodoService todoService = new TodoService(todoRepo);

        todoService.deleteTodoItem(todo.getId());

        Collection<Todo> actual = todoService.list();

        assertTrue(actual.size() == 0);
    }

    @Test
    void shouldReturnAllTodos() {

        TodoRepo todoRepo = new TodoRepo();
        Todo todo = new Todo("lernen", false, "egal");
        Todo todo1 = new Todo("schreiben", false, "egal");
        todoRepo.createTodo(todo);
        todoRepo.createTodo(todo1);

        TodoService todoService = new TodoService(todoRepo);

        Collection<Todo> actual = todoService.list();

        assertEquals(actual, todoService.list());
    }

}