package de.uslu;

import de.uslu.todo.Todo;
import de.uslu.todo.TodoRepo;
import de.uslu.todo.TodoService;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;


import java.util.Collection;
import java.util.List;
import java.util.Optional;



class TodoServiceTest {

    @Test
    void shouldCreateTodo() {
        Todo todo = new Todo();
        todo.setTitle("Putzen");
        todo.setDescription("wc");

        Todo todoSaved = new Todo();
        todoSaved.setTitle("Putzen");
        todoSaved.setDescription("wc");

        TodoRepo mockRepo = Mockito.mock(TodoRepo.class);
        Mockito.when(mockRepo.save(todo)).thenReturn(todoSaved);

        TodoService todoService = new TodoService(mockRepo);
        Todo actual = todoService.createTodo(todo);
        Assertions.assertThat(actual).isSameAs(todoSaved);
    }

    @Test
    void shouldReturnAllTodos() {
        Todo todo1 = new Todo();
        Todo todo2 = new Todo();

        TodoRepo mockRepo = Mockito.mock(TodoRepo.class);
        Mockito.when(mockRepo.findAllByUsername("user1")).thenReturn(List.of(todo1, todo2));

        TodoService todoService = new TodoService(mockRepo);
        Collection<Todo> actual = todoService.list("user1");

        Assertions.assertThat(actual.size()).isEqualTo(2);

    }

    @Test
    void shouldDeleteOneTodo() {
        Todo todo = new Todo();
        todo.setTitle("title");

        TodoRepo mockedRepo = Mockito.mock(TodoRepo.class);
        mockedRepo.deleteById(todo.getId());
        Mockito.verify(mockedRepo).deleteById(todo.getId());

    }

    @Test
    void shouldChangeTodo() {
        Todo todoToChange = new Todo();
        todoToChange.setId("1");
        todoToChange.setCompleted(false);

        Optional<Todo> actual = Optional.of(todoToChange);

        TodoRepo mockRepo = Mockito.mock(TodoRepo.class);
        Mockito.when(mockRepo.findById("1")).thenReturn(actual);
        TodoService todoService = new TodoService(mockRepo);

        todoService.setComplete(actual.get().getId());
        Assertions.assertThat(actual.get().isCompleted()).isTrue();

    }

    @Test
    void shouldDeleteAllCompletedTodos() {
        Todo todo1 = new Todo();
        Todo todo2 = new Todo();
        Todo todo3 = new Todo();

        todo1.setCompleted(true);
        todo2.setCompleted(false);
        todo3.setCompleted(false);

        TodoRepo mockRepo = Mockito.mock(TodoRepo.class);
        Mockito.when(mockRepo.findAllByCompletedAndUsername(true, "user1")).thenReturn(List.of(todo1));

        TodoService todoService = new TodoService(mockRepo);
        List<Todo> actual = todoService.findAllCompleted("user1");

        Assertions.assertThat(actual.size()).isEqualTo(1);
    }


}