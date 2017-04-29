import React from 'react';
import TagsInput from 'react-tagsinput';
import 'react-tagsinput/react-tagsinput.css'; // If using WebPack and style-loader.
import { Field,FieldArray } from 'redux-form';
import Chip from 'material-ui/Chip';
const styles = {
  chip: {
    margin: 4,
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
  },
};
//站点列表展示
const TextFieldSZ = ({ source, record = {}, elStyle }) =>{
  let chiplist = [];

  if(record.hasOwnProperty(source)){
    let sz = record[source];
    sz.forEach((s)=>{
      chiplist.push(<Chip key={s} style={styles.chip}>
         {s}
       </Chip>);
    });
  }
  return (<span style={styles.wrapper}>{chiplist}</span>);
}

const renderStationsTags= (props) => {
  let {input} = props;
  if( Object.prototype.toString.call( input.value ) !== '[object Array]' ) {
      input.value = [];
  }
  return (<TagsInput value={input.value} onChange={input.onChange} inputProps={{
    className: 'react-tagsinput-input',
    placeholder: '新增'}}/>);

}

const TextInputSZ = ({source}) => {
  return(
    <span>
      <br />
      <Field name={source} component={renderStationsTags} />
    </span>
)
}

export  {TextFieldSZ,TextInputSZ};
