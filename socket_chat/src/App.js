import "./App.css";
import Join from "./component/Join/Join.js";
import Chat from "./component/Chat/Chat.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Join />,
  },
  {
    path: "/chat",
    element: <Chat />,
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
