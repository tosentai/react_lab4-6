import TodoItem from "./TodoItem";
import TodoEmpty from "./TodoEmpty";

const TodoList = ({ todos, onToggle, onDelete, onEdit }) => {
    if (!todos || todos.length === 0) {
        return <TodoEmpty />;
    }

    return (
        <div className="space-y-4">
            {todos.map((todo) => (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggle={onToggle}
                    onDelete={onDelete}
                    onEdit={onEdit}
                />
            ))}
        </div>
    );
};

export default TodoList;
