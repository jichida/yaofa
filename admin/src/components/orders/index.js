import React from 'react';
import {
  DateField,
  Edit,
  TabbedForm,
  FormTab,
  NumberField,
  Datagrid,
  TextField,
  ReferenceField,
  EditButton,
  SelectInput,
  List,
  Filter,
  ReferenceInput
} from 'admin-on-rest';

export const OrderFilter = props => (
    <Filter {...props}>
         <ReferenceInput source="creator" reference="userborrower">
            <SelectInput optionText="username" />
        </ReferenceInput>
        <ReferenceInput source="userlender" reference="userlender">
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
          <TabbedForm>
              <FormTab label="resources.order.tabs.orderinfo">

              <TextField label="订单标题"  source="ordertitle" />
              <TextField label="订单详情"  source="orderdetail" />
              <TextField label="支付状态"  source="paystatus" />
              <DateField label="生成时间"  source="created_at" />
              <DateField label="支付时间"  source="pay_at" />
              <NumberField label="实付价" source="moneyreal"  style={{ textAlign: 'left' }}  />

              </FormTab>
              <FormTab label="resources.order.tabs.borrower">

              <NumberField label="借款金额" source="moneylimit"  style={{ textAlign: 'left' }}/>
              <NumberField label="借款周期（天）" source="moneyperiod"  style={{ textAlign: 'left' }}/>
              <TextField label="借款用途"  source="moneyusefor" />
              <TextField label="借款人状态"  source="statusforborrower" />
              <ReferenceField label="借款人" source="creator" reference="userborrower" >
                <TextField source="username" />
              </ReferenceField>

              </FormTab>
              <FormTab label="resources.order.tabs.lender">
              <NumberField label="放款额度" source="moneylender" style={{ textAlign: 'left' }}/>
              <NumberField label="服务费" source="feeservice"  style={{ textAlign: 'left' }}/>
              <NumberField label="押金比" source="depositratio"  style={{ textAlign: 'left' }}/>
              <TextField label="放款人状态"  source="statusforlender" />
              <TextField label="举报异常信息"  source="errorreason" />
              <ReferenceField label="放款人" source="userlender" reference="userlender" allowEmpty>
                <TextField source="username" />
              </ReferenceField>
              </FormTab>
          </TabbedForm>
      </Edit>);

};




const OrderlistList = (props) => (//
     <List title="订单列表" {...props}  filters={<OrderFilter />} sort={{ field: 'created_at', order: 'DESC' }}>
        <Datagrid>
        <DateField label="生成时间" source="created_at" showTime />
        <ReferenceField label="借款人" source="creator" reference="userborrower" >
            <TextField source="username" />
        </ReferenceField>
        <ReferenceField label="放款人" source="userlender" reference="userlender" allowEmpty>
            <TextField source="username" />
        </ReferenceField>
        <NumberField label="借款金额" source="moneylimit" options={{ style: 'currency', currency: 'CNY' }} elStyle={{ fontWeight: 'bold' }}/>
        <NumberField label="放款金额" source="moneylender" options={{ style: 'currency', currency: 'CNY' }} elStyle={{ fontWeight: 'bold' }}/>
        <NumberField label="实际金额" source="moneyreal" options={{ style: 'currency', currency: 'CNY' }} elStyle={{ fontWeight: 'bold' }}/>
        <NumberField label="平台费用" source="realprice" options={{ style: 'currency', currency: 'CNY' }} elStyle={{ fontWeight: 'bold' }}/>
        <TextField label="借款人状态"  source="statusforborrower" />
        <TextField label="支付状态"  source="paystatus" />
        <EditButton />
        </Datagrid>
    </List>
);


export  {OrderlistList,OrderlistEdit};
