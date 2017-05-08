import React from 'react';
import {
  Edit,
  TabbedForm,
  FormTab,
  Datagrid,
  TextField,
  DateField,
  TextInput,
  List,
  EditButton,
  SelectInput,
  BooleanField,
  BooleanInput,
  ImageField,
  Filter
} from 'admin-on-rest';
import ApproveButton from './btn';


export const UserLenderFilter = props => (
    <Filter {...props}>
         <TextInput label="搜索用户" source="username_q" />
    </Filter>
);

const UserLenderlistTitle = ({ record }) => {
   return <span>放款人</span>;
};


const UserLenderlistEdit = (props) => {
      return (<Edit title={<UserLenderlistTitle />} {...props}>
          <TabbedForm>
              <FormTab label="resources.userlender.tabs.basicinfo">
              <TextField label="Id" source="id" />
              <TextField label="手机号"  source="username" />
              <DateField label="注册时间" source="created_at"  showTime/>
              <DateField label="上次登录时间" source="updated_at"  showTime/>
              <TextField label="真实姓名" source="truename" />
              <BooleanInput label="是否审批通过" source="isapprovaled" defaultValue={true} />
              <TextField label="weixinopenid" source="weixinopenid" />
              </FormTab>
              <FormTab label="resources.userlender.tabs.realinfo">
              <TextField label="真实姓名" source="truename" />
              <TextField label="手机号"  source="phonenumber" />
              <ImageField source="urlphoneid1" label="身份证照片正面" addLabel={true}/>
              <ImageField source="urlphoneid2" label="身份证照片反面" addLabel={true}/>
              </FormTab>
               </TabbedForm>
      </Edit>);

};


const UserLenderlistList = (props) => (//
     <List title="放款人列表" {...props}  filters={<UserLenderFilter />} sort={{ field: 'created_at', order: 'DESC' }}>
        <Datagrid>
        <TextField label="手机号" source="username" />
        <DateField label="注册时间" source="created_at"  showTime/>
        <DateField label="上次登录时间" source="updated_at"  showTime/>
        <ApproveButton style={{ padding: 0 }}  label="审批"/>
        <EditButton style={{ padding: 0 }} />
        </Datagrid>
    </List>
);


export  {UserLenderlistList,UserLenderlistEdit};
