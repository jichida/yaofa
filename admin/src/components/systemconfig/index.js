import React from 'react';
import {
    Datagrid,
    DateField,
    Create,
    Edit as EditPage,
    EditButton,
    Filter,
    FormTab,
    List,
    NumberInput,
    ReferenceInput,
    ReferenceField,
    ReferenceManyField,
    SingleFieldList,
    RichTextField,
    SelectInput,
    TabbedForm,
    TextField,
    TextInput,
    LongTextInput,
    SimpleShowLayout,
    Show as ShowPage,
    SimpleForm
} from 'admin-on-rest/lib/mui';

import Chip from 'material-ui/Chip';
import RichTextEditorInput from '../controls/richtoolbar.js';


import ShowPageOne from '../controls/singlelistpage.js';
// import ShowPage from '../controls/ShowPage.js';
// import EditPage from '../controls/EditPage.js';


const SystemconfigTitle = ({ record }) => <span>系统设置</span>;
const SystemconfigShow = (props) => (
       <ShowPage title={<SystemconfigTitle />} {...props}>
           <SimpleShowLayout>
               <TextField  label="预借款金额比例" source="percentborrowpre" />
               <TextField  label="实际借款金额比例" source="percentborrowreal" />
               <TextField  label="超时时间（小时为单位）" source="timeexporder" />
           </SimpleShowLayout>
       </ShowPage>
);

 const SystemconfigList = props => (
    <ShowPageOne resource={props.resource} location={props.location} ShowPage={SystemconfigShow} hasEdit={true}>
    </ShowPageOne>
);

const SystemconfigCreateTitle = ({ record }) => {
   return <span>新建 系统配置</span>;
};
 const SystemconfigCreate = (props) => (
       <Create {...props} title={<SystemconfigCreateTitle />} >
           <SimpleForm>
                <NumberInput  label="预借款金额比例" source="percentborrowpre" />
                <NumberInput  label="实际借款金额比例" source="percentborrowreal" />
                <NumberInput  label="超时时间（小时为单位）" source="timeexporder" />
           </SimpleForm>
       </Create>
);


 const SystemconfigEdit = (props) => (
    <EditPage {...props} title={<SystemconfigTitle />}>
        <SimpleForm>
                <NumberInput  label="预借款金额比例" source="percentborrowpre" />
                <NumberInput  label="实际借款金额比例" source="percentborrowreal" />
                <NumberInput  label="超时时间（小时为单位）" source="timeexporder" />
        </SimpleForm>
    </EditPage>
);

export {SystemconfigList,SystemconfigShow,SystemconfigCreate,SystemconfigEdit};