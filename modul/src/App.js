import React from "react"
import Navbar from './components/Navbar'
import {Switch, Route} from "react-router-dom"

// import semua halaman yang ditampilkan
import Home from "./pages/Home"
import About from './pages/About'
// import Contact from "./pages/Contact"
import Gallery from "./pages/Gallery"

class App extends React.Component{
  render(){
    return(
      <div>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          {/* <Route path="/contact" component={Contact} /> */}
          <Route path="/gallery" component={Gallery} />
        </Switch>

      </div>
    )
  }
}

export default App;