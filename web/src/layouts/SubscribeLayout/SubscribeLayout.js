import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
const stripePromise = loadStripe('pk_test_51IvKaADczmPm9BYQtdO5EoCNEvLJc3fZEVaguUSuPFVHf5GhT6CutZSAletz8O1b4GNqbY3taIOtwt2CpE0xABwP001j677CaS');

const SubscribeLayout = (props) => {
    const imageUrl = "https://ik.imagekit.io/dttv/SHOOTING/DETRI_211202_599__s4xTKpKa.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1651844829335"
    return (
      <Elements stripe={stripePromise}>
        <div className="p-4 h-screen bg-gray-300 bg-cover bg-center" style={{ backgroundImage: `url(${imageUrl})` }}>
          {props.children}
        </div>
      </Elements>
    )
};

export default SubscribeLayout
