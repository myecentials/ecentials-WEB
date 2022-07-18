import Config from "./config/config";
import "bootstrap/dist/css/bootstrap.css";
import "./assets/styles/global.css";
import "./assets/styles/index.css";
import Footer from "./components/Footer";
function App() {
  return (
    <div>
      <Config />
      <Footer />
    </div>
  );
}

export default App;
