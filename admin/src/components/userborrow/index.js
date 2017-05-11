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
  ReferenceField,
  ReferenceInput,
  BooleanField,
  BooleanInput,
  ImageField,
  Filter
} from 'admin-on-rest';
import ApproveButton from './btn';

export const UserBorrowFilter = props => (
    <Filter {...props}>
         <TextInput label="搜索用户" source="username_q" />
         <ReferenceInput source="useragencyfrom" reference="useragency">
            <SelectInput optionText="username" />
        </ReferenceInput>
    </Filter>
);

const UserBorrowlistTitle = ({ record }) => {
   return <span>借款人</span>;
};


const UserBorrowlistEdit = (props) => {
      return (<Edit title={<UserBorrowlistTitle />} {...props}>
           <TabbedForm>
              <FormTab label="resources.userborrower.tabs.basicinfo">
              <TextField label="Id" source="id" />
              <TextField label="手机号"  source="username" />
              <DateField label="注册时间" source="created_at"  showTime/>
              <DateField label="上次登录时间" source="updated_at"  showTime/>
              <TextField label="真实姓名" source="truename" />
              <ReferenceField label="来自中介" source="useragencyfrom" reference="useragency" allowEmpty addLabel={true}>
                <TextField source="username" />
              </ReferenceField>
              <TextField label="weixinopenid" source="weixinopenid" />
              <TextInput label="拒绝理由" source="approvalrejectseason" />
              <SelectInput  label="审核状态"  source="approvalstatus" choices={[
                  { id: '未递交', name: '未递交资料' },
                  { id: '待审核', name: '待审核' },
                  { id: '审核中', name: '审核中' },
                  { id: '已审核', name: '已审核' },
                  { id: '已拒绝', name: '拒绝(填写拒绝理由)' },
              ]} />
              </FormTab>
              <FormTab label="resources.userborrower.tabs.picvaild">
              <ImageField source="urlphoneid1" label="身份证照片正面" addLabel={true}/>
              <ImageField source="urlphoneid2" label="身份证照片反面" addLabel={true}/>
              <ImageField source="urlphoneid3" label="身份证照片手持" addLabel={true}/>
              <TextInput label="认证结果(拒绝理由)" source="resultrealname_obj" />
              <BooleanInput label="实名认证结果" source="resultrealname"  elStyle={{ float: 'left' }}/>
              </FormTab>
              <FormTab label="resources.userborrower.tabs.realinfo">
              <TextField label="真实姓名" source="truename" />
              <TextField label="身份证号"  source="idcard" />
              <TextField label="手机号"  source="phonenumber" />
              <TextField label="手机密码"  source="phonepassword" />
              <TextField label="淘宝账号"  source="taobaoaccount" />
              <TextField label="淘宝密码"  source="taobaopassword" />
              </FormTab>
              <FormTab label="resources.userborrower.tabs.authresult">
               <BooleanField label="身份认证结果" source="resultid"  elStyle={{ float: 'left' }}/>
               <TextField label="结果"  source="resultid_obj" />
               <BooleanField label="运营商认证结果" source="resultphone"  elStyle={{ float: 'left' }}/>
               <TextField label="结果"  source="resultphone_obj" />
               <BooleanField label="芝麻分认证结果" source="resultzhima"   elStyle={{ float: 'left' }}/>
               <TextField label="结果"  source="resultzhima_obj" />
               <BooleanField label="淘宝认证结果" source="resulttaobao"  elStyle={{ float: 'left' }}/>
               <TextField label="结果"  source="resulttaobao_obj" />
               <BooleanField label="实名认证结果" source="resultrealname"  elStyle={{ float: 'left' }}/>
               <TextField label="结果"  source="resultrealname_obj" />
              </FormTab>
              <FormTab label="resources.userborrower.tabs.personalasset">
                  <TextField label="户口"  source="hukou" />
                  <TextField label="花呗额度"  source="limithuabei" />
                  <TextField label="借呗额度"  source="limitjiebei" />
                  <TextField label="借贷宝负债"  source="jiedaibaofuzai" />
                  <TextField label="借贷宝已还"  source="jiedaobaoyihuan" />
                  <TextField label="手机号实名时间（年）"  source="realtimeforphoneyear" />
                  <BooleanField label="是否有固定资产" source="hasgudingzichan"  elStyle={{ float: 'left' }}/>
                  <BooleanField label="是否有工作单位" source="hasdanwei"   elStyle={{ float: 'left' }}/>
                  <BooleanField label="是否有公积金" source="hasgongjijin"   elStyle={{ float: 'left' }}/>
                  <BooleanField label="是否有社保" source="hasshebao"   elStyle={{ float: 'left' }}/>
                  <BooleanField label="三号是否统一" source="hassanhaotongyi"   elStyle={{ float: 'left' }}/>
                  <BooleanField label="有无今日还款" source="hasjinrihuankuan"   elStyle={{ float: 'left' }}/>
                  <BooleanField label="有无逾期记录" source="hasyuqijilu"  elStyle={{ float: 'left' }}/>
                  <BooleanField label="身份证原件" source="hasshenfenzhengyuanjian"   elStyle={{ float: 'left' }}/>
              </FormTab>
          </TabbedForm>
      </Edit>);

};


const UserBorrowlistList = (props) => (//
     <List title="借款人列表" {...props}  filters={<UserBorrowFilter />} sort={{ field: 'created_at', order: 'DESC' }}>
        <Datagrid>
        <TextField label="手机号" source="username" />
        <ReferenceField label="来自中介" source="useragencyfrom" reference="useragency" allowEmpty>
            <TextField source="username" />
        </ReferenceField>
        <DateField label="注册时间" source="created_at"  showTime/>
        <DateField label="上次登录时间" source="updated_at"  showTime/>
        <ApproveButton style={{ padding: 0 }}  label="审批"/>
        <EditButton style={{ padding: 0 }} />
        </Datagrid>
    </List>
);


export  {UserBorrowlistList,UserBorrowlistEdit};
