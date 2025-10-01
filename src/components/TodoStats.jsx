const TodoStats = ({ count }) => {
    return (
        <span>
            {count} item{count !== 1 ? "s" : ""} left
        </span>
    );
};

export default TodoStats;
