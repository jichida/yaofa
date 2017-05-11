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

import LinkToRelatedUserborrowers from './linktouserborrow';
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
              <TextField label="weixinopenid" source="weixinopenid" />
              <TextInput label="拒绝理由" source="approvalrejectseason" />
              <SelectInput  label="审核状态"  source="approvalstatus" choices={[
                  { id: '未递交', name: '未递交资料' },
                  { id: '待审核', name: '待审核' },
                  { id: '审核中', name: '审核中' },
                  { id: '已审核', name: '已审核' },
                  { id: '已拒绝', name: '拒绝(填写拒绝理由)' },
              ]} />
          </SimpleForm>
      </Edit>);

};


const UserAgencylistList = (props) => (//
     <List title="中介列表" {...props}  filters={<UserAgencyFilter />} sort={{ field: 'created_at', order: 'DESC' }}>
        <Datagrid>
        <TextField label="手机号" source="username" />
        <DateField label="注册时间" source="created_at"  showTime/>
        <DateField label="上次登录时间" source="updated_at"  showTime/>
        <LinkToRelatedUserborrowers />
        <ApproveButton style={{ padding: 0 }}  label="审批"/>
        <EditButton style={{ padding: 0 }} />
        </Datagrid>
    </List>
);


export  {UserAgencylistList,UserAgencylistEdit};
