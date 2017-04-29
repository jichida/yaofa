import React from 'react';
import {
  Edit,
  SimpleForm,
  TextInput,
  Datagrid,
  TextField,
  DateField,
  EditButton,
  List,
  BooleanInput,
  BooleanField,
  Filter
} from 'admin-on-rest';
import ApproveButton from './btn';


export const UserAgencyFilter = props => (
    <Filter {...props}>
         <TextInput label="搜索用户" source="username_q" />
    </Filter>
);

const UserAgencylistTitle = ({ record }) => {
   return <span>中介</span>;
};

const UserAgencylistEdit = (props) => {
      return (<Edit title={<UserAgencylistTitle />} {...props}>
          <SimpleForm>
              <TextField label="Id" source="id" />
              <TextField label="手机号"  source="username" />
              <DateField label="注册时间" source="created_at"  showTime/>
              <DateField label="上次登录时间" source="updated_at"  showTime/>
              <TextField label="邀请码" source="invitecode" />
              <TextField label="余额" source="balance" />
               <BooleanInput label="是否审批通过" source="isapprovaled" defaultValue={true} />
          </SimpleForm>
      </Edit>);

};


const UserAgencylistList = (props) => (//
     <List title="中介列表" {...props}  filters={<UserAgencyFilter />} sort={{ field: 'created_at', order: 'DESC' }}>
        <Datagrid>
        <TextField label="手机号" source="username" />
        <DateField label="注册时间" source="created_at"  showTime/>
        <DateField label="上次登录时间" source="updated_at"  showTime/>
        <ApproveButton style={{ padding: 0 }}  label="审批"/>
        <EditButton style={{ padding: 0 }} />
        </Datagrid>
    </List>
);


export  {UserAgencylistList,UserAgencylistEdit};
