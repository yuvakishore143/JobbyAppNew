import {Switch, Route, Redirect} from 'react-router-dom'
import ProtectedRoutes from './components/ProtectedRoutes'
import Home from './components/Home'
import Login from './components/Login'
import Jobs from './components/Jobs'
import JobDetails from './components/JobDetails'

import './App.css'
import NotFound from './components/NotFound'

const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <ProtectedRoutes exact path="/" component={Home} />
    <ProtectedRoutes exact path="/login" component={Login} />
    <ProtectedRoutes exact path="/jobs" component={Jobs} />
    <ProtectedRoutes exact path="/jobs/:id" component={JobDetails} />
    <Route exact path="/not-found" component={NotFound} />
    <Redirect to="/not-found" />
  </Switch>
)

export default App
