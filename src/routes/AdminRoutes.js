import React from 'react'
import { Route, Switch } from 'react-router-dom'

import AppLayout from '../components/layouts/AppLayout'
import AdminHome from '../screens/Admin/Home'
import AdminProfile from '../screens/Admin/Profile'
import AdminDashboard from '../screens/Admin/Dashboard'

const AdminRoutes = () => (
  <AppLayout>
    <Switch>
      <Route exact path="/admin" component={AdminHome} />
      <Route exact path="/admin/account/:menu" component={AdminProfile} />
      <Route exact path="/admin/dashboard/:menu" component={AdminDashboard} />
    </Switch>
  </AppLayout>
)

export default AdminRoutes
