import { useEffect, useRef, useState } from 'react'
import { useAuth } from '@redwoodjs/auth'
import { navigate, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'
import {
  Form,
  Label,
  PasswordField,
  Submit,
  FieldError,
} from '@redwoodjs/forms'

const ResetPasswordPage = ({ resetToken }) => {
  const { isAuthenticated, reauthenticate, validateResetToken, resetPassword } =
    useAuth()
  const [enabled, setEnabled] = useState(true)

  useEffect(() => {
    if (isAuthenticated) {
      navigate(routes.book())
    }
  }, [isAuthenticated])

  useEffect(() => {
    const validateToken = async () => {
      const response = await validateResetToken(resetToken)
      if (response.error) {
        setEnabled(false)
        toast.error(response.error)
      } else {
        setEnabled(true)
      }
    }
    validateToken()
  }, [])

  const passwordRef = useRef()
  useEffect(() => {
    passwordRef.current.focus()
  }, [])

  const onSubmit = async (data) => {
    const response = await resetPassword({
      resetToken,
      password: data.password,
    })

    if (response.error) {
      toast.error(response.error)
    } else {
      toast.success('Mot de passe changé')
      await reauthenticate()
      navigate(routes.login())
    }
  }

  return (
    <>
      <MetaTags title="Réinitialisation" description="Réinitialisation du mot de passe" />
      <div className="font-sans">
        <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-md shadow-lg p-8 mt-32">
            <h1 className="uppercase font-bold text-lg text-center">Réinitialiser votre mot de passe</h1>
            <hr className="my-3 -mx-8"/>
            <Form onSubmit={onSubmit} className="mx-auto font-sans">
              <Label
                name="username"
                className="rw-label"
                errorClassName="rw-label rw-label-error"
              >
                Nouveau mot de passe
              </Label>
              <PasswordField
                name="password"
                autoComplete="new-password"
                className="bg-gray-200 rounded-md p-2 text-sm outline-green-700 w-full"
                errorClassName="rw-input rw-input-error"
                disabled={!enabled}
                ref={passwordRef}
                validation={{
                  required: {
                    value: true,
                    message: 'Veuillez saisir un mot de passe',
                  },
                }}
              />
              <FieldError name="password" className="rw-field-error" />
              <div className="rw-button-group">
                <Submit className="rw-button text-white bg-green-900 hover:bg-green-700 py-3 px-6" disabled={!enabled}>Changer votre mot de passe</Submit>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  )
}

export default ResetPasswordPage
