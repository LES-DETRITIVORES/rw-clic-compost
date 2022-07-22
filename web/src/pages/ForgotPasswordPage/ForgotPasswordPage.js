import { useEffect, useRef } from 'react'
import { useAuth } from '@redwoodjs/auth'
import { navigate, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'
import { Form, Label, TextField, Submit, FieldError } from '@redwoodjs/forms'

const ForgotPasswordPage = () => {
  const { isAuthenticated, forgotPassword } = useAuth()

  useEffect(() => {
    if (isAuthenticated) {
      navigate(routes.book())
    }
  }, [isAuthenticated])

  const usernameRef = useRef()
  useEffect(() => {
    usernameRef.current.focus()
  }, [])

  const onSubmit = async (data) => {
    const response = await forgotPassword(data.username)

    if (response.error) {
      toast.error(response.error)
    } else {
      // The function `forgotPassword.handler` in api/src/functions/auth.js has
      // been invoked, let the user know how to get the link to reset their
      // password (sent in email, perhaps?)
      toast.success(
        'Lien de réinitialisation du mot de passe envoyé à ' + response.email
      )
      navigate(routes.login())
    }
  }

  return (
    <>
      <MetaTags title="Mot de passe oublié" />
      <div className="font-sans">
        <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-md shadow-lg p-8 mt-32">
            <h1 className="uppercase font-bold text-lg text-center">Mot de passe oublié</h1>
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
              <div className="rw-button-group">
                <Submit className="rw-button text-white bg-green-900 hover:bg-green-700 py-3 px-6">Réinitialiser</Submit>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  )
}

export default ForgotPasswordPage
