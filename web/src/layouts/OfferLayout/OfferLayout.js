const OfferLayout = (props) => {
    const imageUrl = "https://ik.imagekit.io/dttv/SHOOTING/DETRI_211202_436__25PSAfEv.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1651843531520"
    return (
        <div className="p-4 h-screen bg-gray-300 bg-cover bg-center" style={{ backgroundImage: `url(${imageUrl})` }}>
        {props.children}
        </div>
    )
};
  
export default OfferLayout
  