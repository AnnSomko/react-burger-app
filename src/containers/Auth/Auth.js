import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";
import Input from "../../components/UI/Input/Input";
import classes from "./Auth.css";
import * as actions from "../../store/actions/index";
import { updateObject, checkValidity } from "../../shared/utility";

function Auth(props) {
  const [state, setState] = useState({
    controls: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Mail address",
        },
        value: "",
        validation: {
          required: true,
          isEmail: true,
        },
        valid: false,
        touched: false,
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Password",
        },
        value: "",
        validation: {
          required: true,
          minLength: 6,
        },
        valid: false,
        touched: false,
      },
    },
    isSignup: true,
  });

  useEffect(() => {
    if (!props.buildingBurger && props.authRedirectPath !== "/") {
      props.onSetAuthRedirectPath();
    }
  }, []);

  //nested objects old/new values
  const inputChangedHandler = (event, controlName) => {
    const updatedControls = updateObject(state.controls, {
      [controlName]: updateObject(state.controls[controlName], {
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          state.controls[controlName].validation
        ),
        touched: true,
      }),
    });
    setState({
      controls: updatedControls,
    });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    state.props.onAuth(
      state.controls.email.value,
      state.controls.password.value,
      state.isSignup
    );
  };

  const switchAuthModeHandler = () => {
    setState((prevState) => {
      return {
        isSignup: !prevState.isSignup,
      };
    });
  };

  const formElementsArray = [];
  for (let key in state.controls) {
    formElementsArray.push({
      id: key,
      config: state.controls[key],
    });

    let form = formElementsArray.map((formEl) => (
      <Input
        key={formEl.id}
        elementType={formEl.config.elementType}
        elementConfig={formEl.config.elementConfig}
        value={formEl.config.value}
        changed={(e) => inputChangedHandler(e, formEl.id)}
        invalid={!formEl.config.valid}
        shouldValidate={formEl.config.validation}
        touched={formEl.config.touched}
      />
    ));

    if (state.props.loading) {
      form = <Spinner />;
    }

    let errorMessage = null;
    if (state.props.error) {
      errorMessage = <p>{state.props.error.message}</p>;
    }

    let authRedirect = null;
    if (state.props.isAuthenticated) {
      authRedirect = <Redirect to={state.props.authRedirectPath} />;
    }

    return (
      <div className={classes.Auth}>
        {authRedirect}
        {errorMessage}
        <form onSubmit={submitHandler}>
          {form}
          <Button btnType="Success">Submit</Button>
        </form>
        <Button clicked={switchAuthModeHandler} btnType="Danger">
          Switch to {state.isSignup ? "Sign in" : "Sign up"}
        </Button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    buildingBurger: state.burgerBuilder.building,
    authRedirectPath: state.auth.authRedirectPath,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password, isSignup) =>
      dispatch(actions.auth(email, password, isSignup)),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath("/")),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
