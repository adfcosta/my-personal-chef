import React from 'react';
import PropTypes from 'prop-types';

function FormInput(props) {
  const {
    labelText,
    dataTestId,
    type,
    name,
    value,
    placeholder: placeHolderText,
    onChange,
    onClick,
  } = props;

  return (
    <label htmlFor={ name }>
      <input
        data-testid={ dataTestId }
        type={ type }
        id={ name }
        name={ name }
        placeholder={ placeHolderText }
        value={ value }
        onChange={ onChange }
        onClick={ onClick }
      />
      {labelText}
    </label>
  );
}

FormInput.defaultProps = {
  labelText: '',
  dataTestId: '',
  type: 'text',
  placeholder: '',
  onChange: null,
  onClick: null,
};

FormInput.propTypes = {
  labelText: PropTypes.string,
  dataTestId: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
};

export default FormInput;