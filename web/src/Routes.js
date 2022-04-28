// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Router, Route } from '@redwoodjs/router'

const Routes = () => {
  return (
    <Router>
      <Route path="/" page={SearchPage} name="search" />
      <Route path="/front" page={FrontPage} name="front" />
      <Route path="/connect" page={ConnectPage} name="connect" />
      <Route path="/schedule" page={SchedulePage} name="schedule" />
      <Route path="/thanks" page={ThanksPage} name="thanks" />
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
