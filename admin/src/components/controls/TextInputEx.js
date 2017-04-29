import React  from 'react';
import PropTypes from 'prop-types';
import {TextInput,NumberInput} from 'admin-on-rest/lib/mui';
import TextField from 'material-ui/TextField';
import get from 'lodash.get';
import FieldTitle from 'admin-on-rest/lib/util/FieldTitle';

const TextInputEx = (props) => {
  return(
    <TextInput {...props}  elStyle={{width:'100%'}}/>
  );
}

TextInputEx.defaultProps = {
    addField: true,
    options: {},
    type: 'text',
};

//=====================================================================
const DisabledInputEx = ({ label, record, resource, source }) => <TextField
    style={{width:'100%'}}
    value={get(record, source)}
    floatingLabelText={<FieldTitle label={label} source={source} resource={resource} />}
    disabled
/>;

DisabledInputEx.propTypes = {
    label: PropTypes.string,
    record: PropTypes.object,
    resource: PropTypes.string,
    source: PropTypes.string,
};
//=====================================================================

const NumberInputEx = (props) => {
  return(
    <NumberInput {...props}  elStyle={{width:'100%'}}/>
  );
}

NumberInputEx.defaultProps = {
  addField: true,
  options: {},
  step: 'any',
};


export  {TextInputEx,DisabledInputEx,NumberInputEx};
