import { Transition } from '@headlessui/react'
import { useState, useEffect } from 'react'

const AuthLayout = (props) => {
  let [isShowing, setIsShowing] = useState(false)

  const imageUrl =
    'https://ik.imagekit.io/dttv/SHOOTING/DETRI_220516_0719_MggiduSDo.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1655423313381'

  useEffect(() => {
    // Update the transition state after component mounting
    setIsShowing(true)
  })

  return (
    <div
      className="p-6 min-h-screen min-w-screen bg-gray-300 bg-cover bg-no-repeat bg-center"
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      <Transition
        appear={true}
        show={isShowing}
        enter="transform ease-out duration-300 transition"
        enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
        enterTo="translate-y-0 opacity-100 sm:translate-x-0"
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        {props.children}
      </Transition>
    </div>
  )
}

export default AuthLayout
