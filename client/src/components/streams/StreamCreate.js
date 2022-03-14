import React from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";

import { createStream } from "../../actions/index";

class StreamCreate extends React.Component {
  renderError({ error, touched }) {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  }

  renderInput = (formProps) => {
    // console.log(
    //   `Props passed to the Field component "${formProps.input.name}" : `,
    //   formProps
    // );
    // console.log("Error object for form validation : ", formProps.meta);
    const className = `field ${
      formProps.meta.touched && formProps.meta.error ? "error" : ""
    }`;
    return (
      <div className={className}>
        <label>{formProps.label}</label>
        <input {...formProps.input} autoComplete="off" />
        <div>{this.renderError(formProps.meta)}</div>
      </div>
    );
  };

  // renderInput = ({ input, label, meta }) => {
  //   console.log("Error object for form validation : ", formProps.meta);
  //   return (
  //     <div className="field">
  //       <label>{label}</label>
  //       <input {...input}  autoComplete="off" />
  //       <div>{this.renderError(meta)}</div>
  //     </div>
  //   );
  // }

  onSubmit = (formValues) => {
    // console.log("Form Values passed to onSubmit : ", formValues);
    this.props.createStream(formValues);
  };

  render() {
    // console.log("Props passed to StreamCreate class : ", this.props);
    return (
      <form
        onSubmit={this.props.handleSubmit(this.onSubmit)}
        className="ui form error"
      >
        <Field name="title" component={this.renderInput} label="Enter Title" />
        <Field
          name="description"
          component={this.renderInput}
          label="Enter Description"
        />
        <button className="ui button primary">Submit</button>
      </form>
    );
  }
}

const validate = (formValues) => {
  const errors = {};

  if (!formValues.title) {
    errors.title = "Title is mandatory";
  }
  if (!formValues.description) {
    errors.description = "Description is mandatory";
  }

  return errors;
};

const formWrapped = reduxForm({
  form: "streamCreate",
  validate: validate,
})(StreamCreate);

export default connect(null, { createStream })(formWrapped);
