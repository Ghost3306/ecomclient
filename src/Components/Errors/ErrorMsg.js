import React from "react";

function ErrorMsg(props) {
  return (
    <div class="alert alert-danger alert-dismissible fade show" role="alert">
       {props.msg}
      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close"
      ></button>
    </div>
  );
}

export default ErrorMsg;
