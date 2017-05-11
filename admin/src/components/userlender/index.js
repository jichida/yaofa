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
              <TextInput label="拒绝理由" source="approvalrejectseason" />
              <SelectInput  label="审核状态"  source="approvalstatus" choices={[
                  { id: '未递交', name: '未递交资料' },
                  { id: '待审核', name: '待审核' },
                  { id: '审核中', name: '审核中' },
                  { id: '已审核', name: '已审核' },
                  { id: '已拒绝', name: '拒绝(填写拒绝理由)' },
              ]} />
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
