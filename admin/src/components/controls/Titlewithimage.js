import React from 'react';
import Avatar from 'material-ui/Avatar';
import { Field } from 'redux-form';

const style= { verticalAlign: 'middle' };
const size = 25;
const Titlewithimage = ({ source, record = {}, elStyle,icon,name }) =>{
  let iconurl = record[icon];
  let nametxt = record[name];
  return(<span>
      <Avatar src={`${iconurl}?size=${size}x${size}`} size={size} style={style} />
      <span style={{ display: 'inline-block', width: size/3 }}>&nbsp;</span>
      {nametxt}
</span>)
};


export  {Titlewithimage};
