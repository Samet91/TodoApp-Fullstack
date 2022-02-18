package de.uslu;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Collection;
import java.util.HashMap;

import static org.junit.jupiter.api.Assertions.*;


class TodoServiceTest {

    @Test
    void shouldAddNewTodo() {

        //given
//        todos.put("1", new Todo());
//        todos.put("2", new Todo());
//        todos.put("3", new Todo());
        TodoRepo todoRepo = new TodoRepo();
        TodoService todoService = new TodoService(todoRepo);

        todoService.createTodo(new Todo("waschen", false));
        todoService.createTodo(new Todo("bügeln", false));

        Collection<Todo> actual = todoService.list();
        assertTrue(actual.size() == 2);


    }

}