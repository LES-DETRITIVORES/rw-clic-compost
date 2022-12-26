import { MetaTags } from '@redwoodjs/web'
import { useAuth } from '@redwoodjs/auth'
import LoginCell from 'src/components/User/LoginCell'
import { navigate, Link, routes } from '@redwoodjs/router'

const ConfirmPage = () => {
  const logoUrl =
    'https://ik.imagekit.io/dttv/logo_k7opAuX3K.png?ik-sdk-version=javascript-1.4.3&updatedAt=1652281391081'
  const { currentUser, isAuthenticated, logIn, logOut } = useAuth()

  return (
    <>
      <MetaTags
        title="Confirmation"
        description="Page de confirmation de réservation de collecte"
      />
      <div className="text-white text-right">
        <span className="text-sm font-light">
          [<LoginCell id={currentUser?.id} />]
        </span>
        &nbsp;
        <Link
          className="underline cursor-pointer font-bold text-md"
          onClick={logOut}
        >
          Se déconnecter
        </Link>
      </div>
      <div className="flex flex-row">
        <div className="basis-full md:basis-1/2">
          <div className="font-bold text-center text-3xl md:text-5xl mt-16 text-white w-min mx-auto -rotate-2">
            <span className="bg-green-900 p-1 block w-min">
              Vous&nbsp;êtes&nbsp;formidable&nbsp;!
            </span>
          </div>
          <div className="container mx-auto max-w-xl font-sans bg-white rounded-lg shadow-lg p-8 mt-8 text-center">
            <p className="mt-6 font-bold text-lg">
              Votre demande de collecte est enregistrée.
            </p>
            <p className="mt-6 text-left">
              1) Un mél récapitulatif vient de vous être envoyé.
            </p>
            <p className="text-left">
              2) Notre équipe prépare l'organisation de votre collecte.
            </p>
            <p className="text-left">
              3) Nous sommes présents pour répondre à toutes vos questions.
            </p>
            <p className="text-center mt-6 font-bold">
              L'équipe LES DETRITIVORES
            </p>
            <p className="text-center mt-6">65 quai de Brazza 33100 Bordeaux</p>
            <p>
              <a
                className="underline"
                href="mailto:bonjour@les-detritivores.co"
              >
                bonjour@les-detritivores.co
              </a>{' '}
              | 05 56 67 14 47
            </p>
            <a href="https://les-detritivores.co">
              <img className="w-72 p-6 mx-auto" src={logoUrl} />
            </a>
          </div>
        </div>
      </div>
    </>
  )
}

export default ConfirmPage
