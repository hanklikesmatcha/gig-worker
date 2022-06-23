// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Set, Router, Route, Private } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/dist/toast'
import HeaderLayout from './layouts/HeaderLayout/HeaderLayout'

const Routes = () => {
  return (
    <Router>
      <Set wrap={HeaderLayout}>
        <Route path="/" page={HomePage} name="home" />
        <Route path="/login" page={AuthPage} name="login" />
        <Route notfound page={NotFoundPage} />
        <Route path="/talents/{id:String}" page={TalentTalentPage} name="talent" />
        <Private unauthenticated="login">
          <Route path="/talents/new" page={TalentNewTalentPage} name="newTalent" />
          <Route path="/talents/{id:String}/edit" page={TalentEditTalentPage} name="editTalent" />
          <Route path="/talents" page={TalentTalentsPage} name="talents" />
        </Private>
      </Set>
    </Router>
  )
}

export default Routes
