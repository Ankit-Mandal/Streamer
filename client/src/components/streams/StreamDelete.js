import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Modal from "../Modal";
import history from "../../history";
import { fetchStream, deleteStream } from "../../actions";

class StreamDelete extends React.Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  renderActions() {
    const { id } = this.props.match.params;

    return (
      <React.Fragment>
        <button
          className="ui negative cancel button"
          onClick={() => this.props.deleteStream(id)}
        >
          <i className="trash icon"></i>
          Delete
        </button>
        <Link to="/" className="ui ok button">
          <i className="cancel icon"></i>
          Cancel
        </Link>
      </React.Fragment>
    );
  }

  renderModalContent() {
    if (!this.props.stream) {
      return <p>Are you sure you want to delete this stream?</p>;
    }

    return (
      <p>
        Are you sure you want to delete the stream with title:{" "}
        <b>{this.props.stream.title}</b>
      </p>
    );
  }

  render() {
    return (
      <Modal
        title="Delete Stream"
        content={this.renderModalContent()}
        actions={this.renderActions()}
        onDismiss={() => history.push("/")}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchStream, deleteStream })(
  StreamDelete
);
