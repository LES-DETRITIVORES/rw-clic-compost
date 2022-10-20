import { Link, routes } from '@redwoodjs/router'

const ThanksPage = () => {
  return (
    <div class="min-h-screen py-6 px-6 flex flex-col justify-center sm:py-12 relative sm:max-w-xl sm:mx-auto space-y-12">
      <div>
        <img src="/logo.png" class="object-contain h-48 w-full" />
      </div>
      <p class="font-semibold space-y-12 mb-20 text-center">
        <div class="transform -rotate-2">
          <div>
            Nous vous remercions pour votre{' '}
            <span class="bg-gray-900 text-white p-1 rounded-md">
              réservation
            </span>
            .
          </div>
          <div class="mx-auto">
            Nous vous préviendrons par téléphone de l'arrivée du collectIVORES.
          </div>
        </div>
      </p>
      <Link
        to={routes.welcome()}
        class="w-48 mx-auto p-2 text-center text-md text-gray-900 font-semibold rounded-md border border-gray-900 hover:text-white hover:bg-gray-900 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 transform rotate-1"
      >
        Au revoir !
      </Link>
    </div>
  )
}

export default ThanksPage
