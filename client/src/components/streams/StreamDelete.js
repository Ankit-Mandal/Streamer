import React from "react";
import Modal from "../Modal";

const StreamDelete = () => {
  const actions = (
    <React.Fragment>
      <button className="ui negative cancel button">
        <i className="trash icon"></i>
        Delete
      </button>
      <button className="ui ok button">
        <i className="cancel icon"></i>
        Cancel
      </button>
    </React.Fragment>
  );

  return (
    <div>
      StreamDelete
      <Modal
        title="Delete Stream"
        content="Are you sure you want to delete this stream?"
        actions={actions}
      />
    </div>
  );
};

export default StreamDelete;
