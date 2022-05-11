// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Set, Router, Route } from '@redwoodjs/router'
import UsersLayout from 'src/layouts/UsersLayout'
import SearchLayout from 'src/layouts/SearchLayout'
import OfferLayout from 'src/layouts/OfferLayout'
import SubscribeLayout from 'src/layouts/SubscribeLayout'
import ConfirmLayout from 'src/layouts/ConfirmLayout'


const Routes = () => {
  return (
    <Router>
      <Set wrap={ConfirmLayout}>
        <Route path="/confirm" page={ConfirmPage} name="confirm" />
      </Set>
      <Set wrap={SearchLayout}>
        <Route path="/" page={SearchPage} name="search" />
      </Set>
      <Set wrap={OfferLayout}>
        <Route path="/offer" page={OfferPage} name="offer" />
      </Set>
      <Set wrap={SubscribeLayout}>
        <Route path="/subscribe" page={SubscribePage} name="subscribe" />
      </Set>
      <Set wrap={UsersLayout}>
        <Route path="/users/new" page={UserNewUserPage} name="newUser" />
        <Route path="/users/{id:Int}/edit" page={UserEditUserPage} name="editUser" />
        <Route path="/users/{id:Int}" page={UserUserPage} name="user" />
        <Route path="/users" page={UserUsersPage} name="users" />
      </Set>
      <Route path="/front" page={FrontPage} name="front" />
      <Route path="/connect" page={ConnectPage} name="connect" />
      <Route path="/schedule" page={SchedulePage} name="schedule" />
      <Route path="/thanks" page={ThanksPage} name="thanks" />
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
