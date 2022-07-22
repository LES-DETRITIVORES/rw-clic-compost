import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
const stripePromise = loadStripe(process.env.STRIPE_PUBLIC_TOKEN);

import { Transition } from '@headlessui/react'
import { useState, useEffect } from 'react'

const SubscribeLayout = (props) => {
    const imageUrl = "https://ik.imagekit.io/dttv/SHOOTING/DETRI_211202_599__s4xTKpKa.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1651844829335"

    let [isShowing, setIsShowing] = useState(false)
    useEffect(() => {
    // Update the transition state after component mounting
        setIsShowing(true)
    });

    return (
      <Elements stripe={stripePromise}>
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
      </Elements>
    )
};

export default SubscribeLayout
