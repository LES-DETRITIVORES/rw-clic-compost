import { navigate, routes } from '@redwoodjs/router'
import { useState } from 'react'
import { MetaTags } from '@redwoodjs/web'
import { Form, Label, NumberField, Submit } from '@redwoodjs/forms'
import LocationField from 'src/components/Location/LocationField'

const ConfirmPage = () => {
  const logoUrl = "https://ik.imagekit.io/dttv/logo_k7opAuX3K.png?ik-sdk-version=javascript-1.4.3&updatedAt=1652281391081"

  return (
  <>
    <MetaTags title="Confirmation" description="Confirmation" />
    <div className="flex flex-row">
      <div className="basis-auto md:basis-1/2">
        <div>
        </div>
      </div>
      <div className="basis-full md:basis-2/2">
        <div className="font-bold text-center text-3xl md:text-5xl mt-16 text-white w-min mx-auto -rotate-2">
          <span className="bg-green-900 p-1 block w-min">Vous&nbsp;êtes&nbsp;formidable&nbsp;!</span>
        </div>
        <div className="container mx-auto max-w-xl font-sans bg-white rounded-lg shadow-lg p-8 mt-8 text-center">  
          <p className="mt-6">Votre abonnement est prêt, nous vous livrerons bientôt vos bacs pour débuter le tri. N'hésitez pas à nous contacter pour toutes questions.</p>
          <p className='text-center mt-3'>L'équipe LES DETRITIVORES - bonjour@les-detritivores.co</p>
          <img className="w-72 p-6 mx-auto" src={logoUrl} />
        </div>
      </div>
    </div>
  </>
  )
}

export default ConfirmPage