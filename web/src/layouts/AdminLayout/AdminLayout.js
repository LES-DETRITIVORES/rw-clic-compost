import { Transition } from '@headlessui/react'
import { useState, useEffect } from 'react'

const AdminLayout = (props) => {
  let [isShowing, setIsShowing] = useState(false)

  const imageUrl = "https://ik.imagekit.io/dttv/SHOOTING/DETRI_211007_557_AHqbPk0KPD.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1651843627053"

  useEffect(() => {
  // Update the transition state after component mounting
      setIsShowing(true)
  });

  return (
      <div className="p-6 min-h-screen min-w-screen bg-gray-300 bg-cover bg-no-repeat bg-center" style={{ backgroundImage: `url(${imageUrl})` }}>
          <Transition
              appear={true}
              show={isShowing}
              enter="transition-opacity duration-[1500ms] ease-in-out"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave=" transition-opacity duration-[1500ms] ease-in-out"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
          >
              {props.children}
          </Transition>
      </div>
  )
}

export default AdminLayout