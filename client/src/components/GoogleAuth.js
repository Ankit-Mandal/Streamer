import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import { signIn, signOut } from "../actions";

const GoogleAuth = () => {
  const isSignedIn = useSelector((state) => state.auth.isSignedIn);
  const dispatch = useDispatch();

  const auth = useRef();

  useEffect(() => {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId:
            "152110517311-te7v58d4481dmt89vf2g99gvlpdjbdop.apps.googleusercontent.com",
          scope: "email",
        })
        .then(() => {
          auth.current = window.gapi.auth2.getAuthInstance();

          // Initially when the application is loaded, below function will set the auth state to       // false, as the user hasn't logged in yet
          onAuthChange(auth.current.isSignedIn.get());

          // The below event listener function listens for a change in the user's Sign In/Out state
          // Accordingly, it updates the state with the help of onAuthChange function
          auth.current.isSignedIn.listen(onAuthChange);
        });
    });

    // onAuthchange just updates the state, .i.e., whether used is signed in or out
    // Whereas, onSignInClick/onSignOutClick actually perform the Sign In/Sign Out operation
    const onAuthChange = (isSignedIn) => {
      if (isSignedIn) {
        dispatch(signIn(auth.current.currentUser.get().getId()));
      } else {
        dispatch(signOut());
      }
    };
  }, [dispatch]);

  const onSignInClick = () => {
    auth.current.signIn();
  };

  const onSignOutClick = () => {
    auth.current.signOut();
  };

  const renderAuthButton = () => {
    if (isSignedIn === null) {
      return null;
    }

    const condition = isSignedIn === false;

    const onClick = condition ? onSignInClick : onSignOutClick;
    const btnColor = condition ? "blue" : "red";
    const action = condition ? "Sign In with Google" : "Sign Out";

    // const falseOptions = [onSignInClick, "blue", "Sign In with Google"];
    // const trueOptions = [onSignOutClick, "red", "Sign Out"];
    // const [onClick, btnColor, action] =
    //   isSignedIn === false ? falseOptions : trueOptions;

    return (
      <button className={`ui ${btnColor} google button`} onClick={onClick}>
        <i className="google icon" />
        {action}
      </button>
    );
  };

  return <div>{renderAuthButton()}</div>;
};

export default GoogleAuth;

// import { connect } from "react-redux";
// class GoogleAuth extends React.Component {
//   componentDidMount() {
//     window.gapi.load("client:auth2", () => {
//       window.gapi.client
//         .init({
//           clientId:
//             "152110517311-te7v58d4481dmt89vf2g99gvlpdjbdop.apps.googleusercontent.com",
//           scope: "email",
//         })
//         .then(() => {
//           this.auth = window.gapi.auth2.getAuthInstance();

//           // Initially when the application is loaded, below function will set the auth state to       // false, as the user hasn't logged in yet
//           this.onAuthChange(this.auth.isSignedIn.get());

//           // The below event listener function listens for a change in the user's Sign In/Out state
//           // Accordingly, it updates the state with the help of onAuthChange function
//           this.auth.isSignedIn.listen(this.onAuthChange);
//         });
//     });
//   }

//   // onAuthchange just updates the state, .i.e., whether used is signed in or out
//   // Whereas, onSignInClick/onSignOutClick actually perform the Sign In/Sign Out operation

//   onAuthChange = (isSignedIn) => {
//     if (isSignedIn) {
//       this.props.signIn(this.auth.currentUser.get().getId());
//     } else {
//       this.props.signOut();
//     }
//   };

//   onSignInClick = () => {
//     this.auth.signIn();
//   };

//   onSignOutClick = () => {
//     this.auth.signOut();
//   };

//   renderAuthButton() {
//     if (this.props.isSignedIn === null) {
//       return null;
//     } else if (this.props.isSignedIn === false) {
//       return (
//         <button className="ui blue google button" onClick={this.onSignInClick}>
//           <i className="google icon" />
//           Sign In with Google
//         </button>
//       );
//     } else {
//       return (
//         <button className="ui red google button" onClick={this.onSignOutClick}>
//           <i className="google icon" />
//           Sign Out
//         </button>
//       );
//     }
//   }

//   render() {
//     return <div>{this.renderAuthButton()}</div>;
//   }
// }

// const mapStateToProps = (state) => {
//   return { isSignedIn: state.auth.isSignedIn };
// };

// export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);
