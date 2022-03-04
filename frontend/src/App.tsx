import { Link, Outlet } from "react-router-dom";


function App() {
  return (
    <div>
      <div>
        <Link to="/TodoList">TodoList</Link>
      </div>
      <div>
        <Outlet />
      </div>
      <div>Footer</div>
    </div>
  );
}

export default App;
