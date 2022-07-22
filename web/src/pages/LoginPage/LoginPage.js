import { Link, navigate, routes } from '@redwoodjs/router'
import { useRef } from 'react'
import {
  Form,
  Label,
  TextField,
  PasswordField,
  Submit,
  FieldError,
} from '@redwoodjs/forms'
import { useAuth } from '@redwoodjs/auth'
import { MetaTags } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'
import { useEffect } from 'react'

const LoginPage = ({redirectTo}) => {
  const { isAuthenticated, logIn } = useAuth()

  useEffect(() => {
    if (isAuthenticated) {
      navigate(redirectTo ? redirectTo : routes.book())
    }
  }, [isAuthenticated])

  const usernameRef = useRef()
  useEffect(() => {
    usernameRef.current.focus()
  }, [])

  const onSubmit = async (data) => {
    const response = await logIn({ ...data })

    if (response.message) {
      toast(response.message)
    } else if (response.error) {
      toast.error(response.error)
    } else {
      toast.success('Heureux de vous revoir !')
    }
  }

  return (
    <>
      <MetaTags title="Connexion" description="Page de connexion à l'application" />

      <div className="font-sans">
        <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-md shadow-lg p-8 mt-32">
            <h1 className="uppercase font-bold text-lg text-center">Connexion</h1>
            <hr className="my-3 -mx-8"/>
            <Form onSubmit={onSubmit} className="mx-auto font-sans">
              <Label
                name="username"
                className="rw-label"
                errorClassName="rw-label rw-label-error"
              >
                Votre mél
              </Label>
              <TextField
                name="username"
                className="bg-gray-200 rounded-md p-2 text-sm outline-green-700 w-full"
                errorClassName="rw-input rw-input-error"
                ref={usernameRef}
                validation={{
                  required: {
                    value: true,
                    message: 'Veuillez saisir un mél',
                  },
                }}
              />

              <FieldError name="username" className="rw-field-error" />

              <Label
                name="password"
                className="rw-label"
                errorClassName="rw-label rw-label-error"
              >
                Mot de passe
              </Label>
              <PasswordField
                name="password"
                className="bg-gray-200 rounded-md p-2 text-sm outline-green-700 w-full"
                errorClassName="rw-input rw-input-error"
                autoComplete="current-password"
                validation={{
                  required: {
                    value: true,
                    message: 'Veuillez saisir votre mot de passe',
                  },
                }}
              />
              <FieldError name="password" className="rw-field-error" />
              <div className="rw-forgot-link">
                <Link
                  to={routes.forgotPassword()}
                  className="rw-forgot-link hover:text-green-700"
                >
                  Mot de passe oublié ?
                </Link>
              </div>
              <div className="rw-button-group">
                <Submit className="rw-button text-white bg-green-900 hover:bg-green-700 py-3 px-6">Se connecter</Submit>
              </div>
              <div className="rw-login-link">
                <span>Pas encore inscrit ?</span>{' '}
                <Link to={routes.search()} className="rw-link text-green-900 hover:text-green-700">
                  Abonnez-vous !
                </Link>
              </div>
            </Form>
          </div>

        </div>
      </div>
    </>
  )
}

export default LoginPage
