// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Set, Router, Route } from '@redwoodjs/router'
import TalentsLayout from 'src/layouts/TalentsLayout'

const Routes = () => {
  return (
    <Router>
      <Set wrap={TalentsLayout}>
        <Route path="/talents/new" page={TalentNewTalentPage} name="newTalent" />
        <Route path="/talents/{id:Int}/edit" page={TalentEditTalentPage} name="editTalent" />
        <Route path="/talents/{id:Int}" page={TalentTalentPage} name="talent" />
        <Route path="/talents" page={TalentTalentsPage} name="talents" />
      </Set>
      <Route path="/" page={HomePage} name="home" />
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
