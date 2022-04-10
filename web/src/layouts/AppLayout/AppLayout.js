const AppLayout = (props) => {
  return (
    <div className="app">
      <div>
        <img src="/logo.png" className="logo" />
      </div>
      {props.children}
    </div>
  )
};

export default AppLayout
