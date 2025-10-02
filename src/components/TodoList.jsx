import TodoItem from "./TodoItem";
import TodoEmpty from "./TodoEmpty";

const TodoList = ({ todos, toggleTodo, deleteTodo, editTodoTitle }) => {
    if (todos.length === 0) return <TodoEmpty />;
    return (
        <ul>
            {todos.map((todo) => (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    toggleTodo={toggleTodo}
                    deleteTodo={deleteTodo}
                    editTodoTitle={editTodoTitle}
                />
            ))}
        </ul>
    );
};

export default TodoList;
