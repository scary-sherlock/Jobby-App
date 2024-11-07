import { Route, Switch, Redirect } from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import Jobs from './components/Jobs'
import JobItemDetails from './components/JobItemDetails'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import './App.css'

// These are the lists used in the application. You can move them to any component needed.
const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const App = () => (
  <Switch>
    <Route exact path="/Jobby-App/login" component={Login} />
    <ProtectedRoute exact path="/Jobby-App/" component={Home} />
    <ProtectedRoute exact path="/Jobby-App/jobs"
      component={() => <Jobs salaryRangesList={salaryRangesList} employmentTypesList={employmentTypesList} />} />
    <ProtectedRoute exact path="/Jobby-App/jobs/:id" component={JobItemDetails} />
    <Route path="/Jobby-App/not-found" component={NotFound} />
    <Redirect to="/Jobby-App/not-found" />
  </Switch>
)

export default App
