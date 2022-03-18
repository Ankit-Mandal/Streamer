import React, { useEffect, useRef } from "react";
import flv from "flv.js";
import { useDispatch, useSelector } from "react-redux";

import { fetchStream } from "../../actions";

const StreamShow = (props) => {
  const streamId = props.match.params.id;

  const videoRef = useRef();
  const stream = useSelector((state) => state.streams[streamId]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchStream(streamId));
  }, [dispatch, streamId]);

  useEffect(() => {
    if (!stream) {
      return;
    }

    const player = flv.createPlayer({
      type: "flv",
      url: `http://localhost:8000/live/${streamId}.flv`,
    });
    player.attachMediaElement(videoRef.current);
    player.load();

    return () => {
      // Will stop and clear the video player, when user navigates to a different page
      if (player) {
        player.destroy();
      }
    };
  }, [stream, streamId]);

  if (!stream) {
    return <div>Loading...</div>;
  }

  const { title, description } = stream;
  return (
    <div>
      <video ref={videoRef} style={{ width: "100%" }} controls={true} />
      <h1>{title}</h1>
      <h5>{description}</h5>
    </div>
  );
};

export default StreamShow;

// import React from "react";
// import flv from "flv.js";
// import { connect } from "react-redux";

// import { fetchStream } from "../../actions";

// class StreamShow extends React.Component {
//   constructor(props) {
//     super(props);

//     this.videoRef = React.createRef();
//   }

//   componentDidMount() {
//     const { id } = this.props.match.params;

//     this.props.fetchStream(id);
//     this.buildPlayer();
//   }

//   componentDidUpdate() {
//     this.buildPlayer();
//   }

//   componentWillUnmount() {
//     this.player.destroy();
//   }

//   buildPlayer() {
//     if (this.player || !this.props.stream) {
//       return;
//     }

//     const { id } = this.props.match.params;
//     this.player = flv.createPlayer({
//       type: "flv",
//       url: `http://localhost:8000/live/${id}.flv`,
//     });
//     this.player.attachMediaElement(this.videoRef.current);
//     this.player.load();
//   }

//   render() {
//     if (!this.props.stream) {
//       return <div>Loading...</div>;
//     }

//     const { title, description } = this.props.stream;

//     return (
//       <div>
//         <video ref={this.videoRef} style={{ width: "100%" }} controls={true} />
//         <h1>{title}</h1>
//         <h5>{description}</h5>
//       </div>
//     );
//   }
// }

// const mapStateToProps = (state, ownProps) => {
//   return { stream: state.streams[ownProps.match.params.id] };
// };

// export default connect(mapStateToProps, { fetchStream })(StreamShow);
