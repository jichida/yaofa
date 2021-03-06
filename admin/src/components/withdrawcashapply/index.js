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
  ReferenceField,
  ReferenceManyField,
  Datagrid,
  TextField,
  DateField,
  EditButton,
  SelectInput,
  BooleanInput,
  BooleanField,
  ReferenceInput,
  Filter
} from 'admin-on-rest';

export const WithdrawcashFilter = props => (
    <Filter {...props}>
         <ReferenceInput label="用户" source="creator" reference="useragency" addLabel={false}>
            <SelectInput optionText="username" />
        </ReferenceInput>
        <SelectInput  label="状态"  source="status" choices={[
               { id: '未验证', name: '未验证' },
               { id: '已验证', name: '已验证' },
               { id: '已支付', name: '已支付' },
           ]}/>
    </Filter>
);

const WithdrawcashlistTitle = ({ record }) => {
   return <span>编辑 提现</span>;
};

const WithdrawcashlistEdit = (props) => {
      return (<Edit title={<WithdrawcashlistTitle />} {...props}>
          <SimpleForm>
             <ReferenceField label="提现用户" source="creator" reference="useragency" addLabel={true}>
                <TextField source="username" />
             </ReferenceField>
             <DisabledInput label="真实姓名" source="truename" />
             <DisabledInput label="银行卡号" source="bankaccount" />
             <DisabledInput label="银行名" source="bankname" />
             <DisabledInput label="提现金额" source="cashmoney" />
             <SelectInput  label="状态"  source="status" choices={[
                    { id: '未验证', name: '未验证' },
                    { id: '已验证', name: '已验证' },
                    { id: '已支付', name: '已支付' },
                    { id: '已拒绝', name: '已拒绝' },
                ]}/>
          </SimpleForm>
      </Edit>);

};


const WithdrawcashlistShow = (props) => (
       <Show title={<WithdrawcashlistTitle />} {...props}>
           <SimpleShowLayout>
               <TextField source="id" />
            </SimpleShowLayout>
       </Show>
);



const WithdrawcashlistList = (props) => (//
     <List title="提现列表" {...props}  filters={<WithdrawcashFilter />} sort={{ field: 'created_at', order: 'DESC' }}>
        <Datagrid>
        <ReferenceField label="提现用户" source="creator" reference="useragency" addLabel={true}>
           <TextField source="username" />
        </ReferenceField>
        <TextField label="真实姓名" source="truename" />
        <TextField label="银行卡号" source="bankaccount" />
        <TextField label="银行名" source="bankname" />
        <TextField label="提现金额" source="cashmoney" />
        <EditButton />
        </Datagrid>
    </List>
);


export  {WithdrawcashlistList,WithdrawcashlistEdit};
