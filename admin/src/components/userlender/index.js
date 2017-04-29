import React from 'react';
import { List, EmailField } from 'admin-on-rest/lib/mui';
import { CardActions } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import NavigationRefresh from 'material-ui/svg-icons/navigation/refresh';
import {
  CreateButton,
  RichTextField,
  NumberInput,
  Create,
  Edit,
  SimpleForm,
  DisabledInput,
  TextInput,
  Show,
  SimpleShowLayout,
  ShowButton,
  DateInput,
  LongTextInput,
  ReferenceManyField,
  Datagrid,
  TextField,
  DateField,
  EditButton,
  SelectInput,
  BooleanInput,
  BooleanField,
  Filter
} from 'admin-on-rest/lib/mui';

import { Field,FieldArray } from 'redux-form';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import ContentAdd from 'material-ui/svg-icons/content/add';
import TimePicker from 'material-ui/TimePicker';

import moment from 'moment';


export const UserLenderFilter = props => (
    <Filter {...props}>
         <TextInput label="搜索用户" source="username_q" />
    </Filter>
);

const UserLenderlistTitle = ({ record }) => {
   return <span>显示 用户</span>;
};

const UserLenderlistShow = (props) => (
       <Show title={<UserLenderlistTitle />} {...props}>
           <SimpleShowLayout>
               <TextField source="id" />
               <TextField label="手机号" source="username" />
               <DateField label="注册时间" source="created_at"  showTime/>
               <DateField label="上次登录时间" source="updated_at"  showTime/>
               <TextField label="真实姓名" source="truename" />
           </SimpleShowLayout>
       </Show>
);

const UserLenderlistEdit = (props) => {
      return (<Edit title={<UserLenderlistTitle />} {...props}>
          <SimpleForm>
              <DisabledInput label="Id" source="id" />
              <DisabledInput label="手机号"  source="username" />
              <DateField label="注册时间" source="created_at"  showTime/>
              <DateField label="上次登录时间" source="updated_at"  showTime/>
              <TextField label="真实姓名" source="truename" />
          </SimpleForm>
      </Edit>);

};


const UserLenderlistList = (props) => (//
     <List title="用户列表" {...props}  filters={<UserLenderFilter />} sort={{ field: 'created_at', order: 'DESC' }}>
        <Datagrid>
        <TextField label="手机号" source="username" />
        <DateField label="注册时间" source="created_at"  showTime/>
        <DateField label="上次登录时间" source="updated_at"  showTime/>
        <TextField label="真实姓名" source="truename" />
        <ShowButton />
        </Datagrid>
    </List>
);


export  {UserLenderlistList,UserLenderlistEdit,UserLenderlistShow};
