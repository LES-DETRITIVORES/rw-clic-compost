const ConfirmLayout = (props) => {
  const imageUrl = "https://ik.imagekit.io/dttv/SHOOTING/DETRI_211007_672_xq8S3r6j5.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1651843629362"
  return (
    <div className="p-4 h-screen bg-gray-300 bg-cover bg-center" style={{ backgroundImage: `url(${imageUrl})` }}>
      {props.children}
    </div>
  )
};

export default ConfirmLayout
