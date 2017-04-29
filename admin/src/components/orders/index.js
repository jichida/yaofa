import React from 'react';
import { List, EmailField } from 'admin-on-rest/lib/mui';
import { CardActions } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import NavigationRefresh from 'material-ui/svg-icons/navigation/refresh';
import {
  CreateButton,
  RichTextField,
  NumberInput,
  DateField,
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
  NumberField,
  Datagrid,
  TextField,
  ReferenceField,
  EditButton,
  SelectInput,
  BooleanInput,
  BooleanField,
  Filter,
  ReferenceInput
} from 'admin-on-rest/lib/mui';

import { Field,FieldArray } from 'redux-form';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import ContentAdd from 'material-ui/svg-icons/content/add';
import TimePicker from 'material-ui/TimePicker';
import moment from 'moment';

import OrderProductDetail from './orderproductdetail';

export const OrderFilter = props => (
    <Filter {...props}>
         <ReferenceInput source="creator" reference="user">
            <SelectInput optionText="username" />
        </ReferenceInput>
        <SelectInput source="paystatus" choices={[
            { id: '未支付', name: '未支付' },
            { id: '已支付', name: '已支付' },
        ]} />
    </Filter>
);

const OrderlistTitle = ({ record }) => {
   return <span>编辑 订单</span>;
};

const OrderlistEdit = (props) => {
      return (<Edit title={<OrderlistTitle />} {...props}>
          <SimpleForm>
                <DisabledInput label="Id" source="id" />
                <OrderProductDetail />
                <DisabledInput label="订单标题" source="ordertitle" />
                <DisabledInput label="订单详情" source="body" />
                <DisabledInput label="实付价" source="realprice" />
                <DisabledInput label="应付价" source="orderprice" />
                <DisabledInput label="支付状态" source="paystatus" />
                <ReferenceInput source="expressid" reference="express" allowEmpty
                filterToQuery={searchText => ({ expressname: searchText })}
                filter={{ isvisiable: true }}>
                  <SelectInput optionText={item=>(`${item.expressname}(${item.expresscode})`)} />
                </ReferenceInput>
                <SelectInput source="orderstatus" choices={[
                    { id: '未支付', name: '未支付' },
                    { id: '待发货', name: '待发货' },
                    { id: '待收货', name: '待收货' },
                    { id: '已完成', name: '已完成' },
                    { id: '已取消', name: '已取消' },
                ]} />
                 <TextInput label="运单号" source="expressbarid" />
          </SimpleForm>
      </Edit>);

};


const OrderlistShow = (props) => (
       <Show title={<OrderlistTitle />} {...props}>
           <SimpleShowLayout>
               <TextField source="id" />
               <TextField label="公司名" source="Ordername" />
           </SimpleShowLayout>
       </Show>
);



const OrderlistList = (props) => (//
     <List title="订单列表" {...props}  filters={<OrderFilter />} sort={{ field: 'created_at', order: 'DESC' }}>
        <Datagrid>
        <DateField label="生成时间" source="created_at" showTime />
        <ReferenceField label="订单用户" source="creator" reference="user" addLabel={false}>
            <TextField source="username" />
        </ReferenceField>
        <NumberField label="订单金额" source="orderprice" options={{ style: 'currency', currency: 'CNY' }} elStyle={{ fontWeight: 'bold' }}/>
        <TextField label="订单状态" source="orderstatus" />
        <TextField label="支付状态"  source="paystatus" />
        <EditButton />
        </Datagrid>
    </List>
);


export  {OrderlistList,OrderlistEdit};
