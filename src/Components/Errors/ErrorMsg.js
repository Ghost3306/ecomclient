import React from "react";

function ErrorMsg(props) {
  return (
    <div className="alert alert-danger alert-dismissible fade show" role="alert">
       <h4 className="text-center" >{props.msg}</h4>
      
    </div>
  );
}

export default ErrorMsg;
