import React from 'react';
import SearchBar from './searchBar';
import Home from './home';
import Music from './music';
import Video from './video';
import Movies from './movies';
import Audiobooks from './audiobooks';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';


function App() {
  return (
    <div className="App">
      <Router>
        <SearchBar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="music" exact component={Music} />
          <Route path="video" exact component={Video} />
          <Route path="/movies" exact component={Movies} />
          <Route path="/audiobooks" exact component={Audiobooks} />
        </Switch>
      </Router>
    </div>
  )
}

export default App;

