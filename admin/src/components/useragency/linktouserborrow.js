import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import { Link } from 'react-router-dom';
import { translate } from 'admin-on-rest';

import ProductIcon from 'material-ui/svg-icons/image/collections';

const LinkToRelatedUserborrowers = ({ record, translate }) => (
    <FlatButton
        primary
        label={translate('resources.useragency.fields.userborrower')}
        icon={<ProductIcon />}
        containerElement={<Link to={{ pathname: "/userborrower", query: { filter: JSON.stringify({ useragencyfrom: record.id }) } }} />}
    />
);

export default translate(LinkToRelatedUserborrowers);
