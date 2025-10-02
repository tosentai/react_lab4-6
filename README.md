# React To-Do List Application

## Tech Stack

-   [React](https://react.dev/)
-   [Axios](https://axios-http.com/docs/intro) (for HTTP requests to the API)
-   [TailwindCSS](https://tailwindcss.com/) (for styling)

## Design Patterns Used

### Core Patterns

-   **Custom Hook Pattern**: The central pattern of the project. The `useTodos` hook encapsulates all state logic and data interaction — fetching tasks, managing loading and errors, and providing functions to add, update, and delete tasks. The `HomePage` component uses `useTodos()` while managing its own UI-specific states (filter, search text, pagination).
-   **Service Layer Pattern**: The API logic is isolated in asynchronous functions (`fetchTodosAPI`, `updateTodoAPI`, `deleteTodoAPI`) inside `useTodos.js`. This decouples business logic from the HTTP client (Axios), improving modularity.
-   **Container/Presentational Pattern**: Clear separation between "smart" container `HomePage` managing state and "dumb" presentational components (`TodoItem`, `TodoHeader`, `TodoFilters`, `AddTodoForm`, `SearchAndLimit`, `PaginationControls`) receiving data and callbacks as props.
-   **Unidirectional Data Flow**: State flows top-down via props; updates flow bottom-up via callbacks.

### Feature-Specific Patterns

-   **Optimistic UI Updates**: Immediate local state updates in `toggleTodo` and `deleteTodo` within `useTodos` for responsive UI, with rollback on server error.
-   **Conditional Rendering**: `TodoList` renders `TodoEmpty` if tasks array is empty. `HomePage` conditionally shows loading and error messages.
-   **State Colocation**: Global server state (`todos`, `isLoading`, `error`) managed by `useTodos` and passed to `HomePage`. UI-specific states like `filter`, `searchText`, `pagination`, and input control are local to components.

## Component Tree \& Data Flow

### Diagram

```mermaid
graph TD;
    HomePage["HomePage<br/><i>useTodos() hook</i><br/><b>Local State:</b> filter, searchText, currentPage, limit<br/><b>From useTodos:</b> todos, isLoading, error"]

    TodoHeader["TodoHeader<br/><i>Displays title</i>"]
    AddTodoForm["AddTodoForm<br/><b>State:</b> inputText<br/><b>Props:</b> addTodo"]
    TodoFilters["TodoFilters<br/><b>Props:</b> activeFilter, setFilter"]
    SearchAndLimit["SearchAndLimit<br/><b>Props:</b> searchText, setSearchText, limit, setLimit"]
    PaginationControls["PaginationControls<br/><b>Props:</b> currentPage, setCurrentPage, totalPages"]
    TodoList["TodoList<br/><b>Props:</b> todos[], toggleTodo, deleteTodo"]
    TodoStats["TodoStats<br/><b>Props:</b> count"]

    TodoItem["TodoItem<br/><b>Props:</b> todo, toggleTodo, deleteTodo"]
    TodoEmpty["TodoEmpty<br/><i>Shown when list is empty</i>"]

    subgraph "Todo Feature"
        HomePage --> TodoHeader
        HomePage --> AddTodoForm
        HomePage --> TodoFilters
        HomePage --> SearchAndLimit
        HomePage --> PaginationControls
        HomePage --> TodoList
        HomePage --> TodoStats
    end

    subgraph "List Rendering"
        TodoList --> TodoItem
        TodoList -- "todos.length === 0" --> TodoEmpty
    end

    style HomePage stroke:#b3d9ff,stroke-width:2px

    AddTodoForm -.->|"addTodo(text)"| HomePage
    TodoFilters -.->|"setFilter(filterType)"| HomePage
    SearchAndLimit -.->|"setSearchText(text), setLimit(number)"| HomePage
    PaginationControls -.->|"setCurrentPage(number)"| HomePage
    TodoItem -.->|"toggleTodo(id)"| TodoList
    TodoItem -.->|"deleteTodo(id)"| TodoList
    TodoList -.->|"toggleTodo(id)<br/>deleteTodo(id)"| HomePage
```

### State Management Overview

**useTodos Hook (Data Layer)**

-   `todos` — array of task objects
-   `isLoading` — loading status
-   `error` — error messages
-   Functions: `addTodo`, `toggleTodo`, `deleteTodo`

**HomePage Component (UI Layer)**

-   `filter` — task filter ('all', 'active', 'done')
-   `searchText` — search input state to filter task text
-   `currentPage`, `limit` — pagination state controlling current page and tasks per page

This architecture isolates data management in the hook while UI-specific states remain local for performance.

### Diagram Explanation

-   **App**: Root component rendering layout and `HomePage`.
-   **HomePage**: Smart container component using `useTodos()`; manages local UI states for filtering, searching, and pagination; passes data and callback props to child components.
-   **AddTodoForm**: Controlled component receiving `addTodo` callback to add new tasks.
-   **TodoFilters**: Receives and updates filter state.
-   **SearchAndLimit**: Controls search text and visible item limit.
-   **PaginationControls**: Controls pagination page.
-   **TodoList**: Conditionally renders empty state or task list.
-   **TodoItem**: Individual task item with toggle and delete handlers.
