const SubscribeLayout = (props) => {
    const imageUrl = "https://ik.imagekit.io/dttv/SHOOTING/DETRI_211202_599__s4xTKpKa.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1651844829335"
    return (
        <div className="p-4 h-screen bg-gray-300 bg-cover bg-center" style={{ backgroundImage: `url(${imageUrl})` }}>
        {props.children}
        </div>
    )
};
  
export default SubscribeLayout