import React from 'react';
import TimePicker from 'material-ui/TimePicker';
import moment from 'moment';
import { Field,FieldArray } from 'redux-form';
const renderTimePicker= (props) => {
  let {input,label} = props;
  let onChange = (event, newdate)=>{
    let newvalue = moment(newdate).format("HH:mm");
    input.onChange(newvalue);
  }
  // if( Object.prototype.toString.call( input.value ) !== '[object Array]' ) {
  //     input.value = [];
  // }
  let value = new Date();

  if(input.value){
    let szvalue = input.value.split(":");
    if(szvalue.length === 2){
      let h = parseInt(szvalue[0],10);
      let m = parseInt(szvalue[1],10);
      value.setHours(h,m,0,0);
    }
  }
  return (<TimePicker floatingLabelText={label} floatingLabelFixed={true}
  value={value} onChange={onChange} okLabel='确定' cancelLabel='取消'/>);
}

const TimePickerInput = (props) => {
  let {source,label} = props;
  return(
    <span>
      <Field name={source} component={renderTimePicker} label={label}/>
    </span>
)
}


export  {TimePickerInput};
