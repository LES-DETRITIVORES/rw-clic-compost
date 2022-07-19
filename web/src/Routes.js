// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Set, Private, Router, Route } from '@redwoodjs/router'
import BookingsLayout from 'src/layouts/BookingsLayout'
import SubscriptionsLayout from 'src/layouts/SubscriptionsLayout'
import UsersLayout from 'src/layouts/UsersLayout'
import SearchLayout from 'src/layouts/SearchLayout'
import OfferLayout from 'src/layouts/OfferLayout'
import SubscribeLayout from 'src/layouts/SubscribeLayout'
import ConfirmLayout from 'src/layouts/ConfirmLayout'
import AuthLayout from 'src/layouts/AuthLayout'
import BookLayout from 'src/layouts/BookLayout'


const Routes = () => {
  return (
    <Router>
      <Set wrap={BookingsLayout}>
        <Route path="/bookings/new" page={BookingNewBookingPage} name="newBooking" />
        <Route path="/bookings/{id:Int}/edit" page={BookingEditBookingPage} name="editBooking" />
        <Route path="/bookings/{id:Int}" page={BookingBookingPage} name="booking" />
        <Route path="/bookings" page={BookingBookingsPage} name="bookings" />
      </Set>
      <Private unauthenticated="login">
        <Set wrap={BookLayout}>
          <Route path="/book" page={BookPage} name="book" />
        </Set>
        <Set wrap={SubscriptionsLayout}>
          <Route path="/subscriptions/new" page={SubscriptionNewSubscriptionPage} name="newSubscription" />
          <Route path="/subscriptions/{id:Int}/edit" page={SubscriptionEditSubscriptionPage} name="editSubscription" />
          <Route path="/subscriptions/{id:Int}" page={SubscriptionSubscriptionPage} name="subscription" />
          <Route path="/subscriptions" page={SubscriptionSubscriptionsPage} name="subscriptions" />
        </Set>
        <Set wrap={UsersLayout}>
          <Route path="/users/new" page={UserNewUserPage} name="newUser" />
          <Route path="/users/{id:Int}/edit" page={UserEditUserPage} name="editUser" />
          <Route path="/users/{id:Int}" page={UserUserPage} name="user" />
          <Route path="/users" page={UserUsersPage} name="users" />
        </Set>
      </Private>
      <Set wrap={AuthLayout}>
        <Route path="/login" page={LoginPage} name="login" />
        <Route path="/signup" page={SignupPage} name="signup" />
        <Route path="/forgot-password" page={ForgotPasswordPage} name="forgotPassword" />
        <Route path="/reset-password" page={ResetPasswordPage} name="resetPassword" />
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
      <Set wrap={ConfirmLayout}>
        <Route path="/confirm" page={ConfirmPage} name="confirm" />
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
