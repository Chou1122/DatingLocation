import "./App.css";
import { Route, Router } from "wouter";
import MapComponent from "./screens/MapComponent";
import { Login } from "./screens/Login/Login";
import { Helmet } from "react-helmet";

function App() {
  return (
    <div className="test">
      <Helmet>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap"
          rel="stylesheet"
        />
      </Helmet>
      <Router>
        <Route path="/" component={Login} />
        <Route path="/Map" component={MapComponent} />
      </Router>
    </div>
  );
}

export default App;
