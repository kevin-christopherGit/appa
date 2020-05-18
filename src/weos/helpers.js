import {useState} from 'react';
import {connect} from 'react-redux';

export const Component = (controller, view) => {
  return connect(
    state => controller.configureState(state),
    dispatch => controller.configureDispatch(dispatch),
  )(view);
};

// Form Hooks

// Handles setting of form data
export const useForm = initValues => {
  const [values, setvalues] = useState(initValues);

  return [
    values,
    (val, key) => {
      setvalues({...values, [key]: val});
    },
  ];
};
// Handles validation of fields belonging to form data
export const useValidated = (form, validated) => {
  const [valid, setValid] = useState(validated);

  return [
    valid,
    (data, currentValid) => {
      currentValid.title = data.title !== '';
      currentValid.timeEstimate = !(
        data.timeEstimate === '' ||
        data.timeEstimate === '0' ||
        data.timeEstimate === undefined
      );
      setValid({...valid, ...currentValid});
    },
    () => {
      setValid({...valid, title: true, timeEstimate: true});
    },
  ];
};