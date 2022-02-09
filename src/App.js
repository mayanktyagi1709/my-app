import "./App.css";
import File from "./components/File";

const App = () => {
  // const client_id = process.env.REACT_APP_ID;
  return (
    <div>
      <File per_page={20} />
    </div>
  );
};

export default App;
