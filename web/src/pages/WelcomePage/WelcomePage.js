import { Link, routes } from '@redwoodjs/router'
import AppLayout from 'src/layouts/AppLayout'

const WelcomePage = () => {
  return (
    <AppLayout>
      <div className="form">
        <div>Bonjour et bienvenue :)</div>
        <div>Voici l'application la plus <span className="keyword">simple</span></div>
        <div>pour valoriser chaque jour vos <span className="keyword">biodéchets</span>.</div>
        <div>Cliquez, c'est <span className="keyword">composté</span>.</div>
      </div>
      <Link to={routes.location()} className="next">
          Oui, je clique !
      </Link>
    </AppLayout>
  )
}

export default WelcomePage
