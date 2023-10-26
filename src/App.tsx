import './App.css'
import { Provider } from "react-redux";
import { store } from "./stores/store";
import Home from "./Home";
import Navigate from './component/navbar';
export default function App() {
  return (
    <Provider store={store}>
      <div>
        <Navigate/>
        <Home/>
      </div>
    </Provider>
  );
}
