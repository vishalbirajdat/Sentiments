import React, { useEffect } from 'react'
import { ToastContainer } from 'react-toastify';

const Layout = ({children}) => {



  return (
        <div style={
          {
        color: "white",
        background: "#000015",
        width:"100%",
        minHeight:"100vh"
          }
        }>


              <div style={
        {
         
          padding:"20px 22px",
          maxWidth: "1300px",
          margin:"auto"
        }
              }>
          {children}
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          closeOnClick
          newestOnTop
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
              </div>
              </div>
  )
}

export default Layout
