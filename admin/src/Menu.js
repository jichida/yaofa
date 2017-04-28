import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router';
import { translate } from 'admin-on-rest';
import compose from 'recompose/compose';
import MenuItem from 'material-ui/MenuItem';
import SettingsIcon from 'material-ui/svg-icons/action/settings';
import LabelIcon from 'material-ui/svg-icons/action/label';
import { DashboardMenuItem } from 'admin-on-rest/lib/mui';
import Icon from 'material-ui/svg-icons/social/person';

import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';

const styles = {
    main: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        height: '100%',
    },
};

import { List, ListItem } from 'material-ui/List';
import allmenus from './LeftmenuData.js';

let getallmenus = (valuesel, translate,onMenuTap)=>{
  let getChildItems =(item, translate,onMenuTap)=>{
     let itemsco =[];
     item.children.map((child)=>{
        let title = translate(`resources.${child.name}.name`, { smart_count: 2 });
        let link = `/${child.name}`;
        itemsco.push(<
          MenuItem key={child.name}
          primaryText={title}
          leftIcon={child.icon}
          onTouchTap={onMenuTap}
          containerElement={<Link to={link} />}
          insetChildren={true} className={child.name === valuesel ? 'active' : ''} />);
      });
      return itemsco;
   }
   let menuitemsco =[];
   allmenus.map((item)=> {
     let title = translate(`resources.${item.name}.name`, { smart_count: 2 });
     if(item.children){
        menuitemsco.push(<MenuItem
            primaryText={title}
            key={item.name}
            leftIcon={item.icon}
            rightIcon={<ArrowDropRight />}
            menuItems={getChildItems(item,translate,onMenuTap)}
        />);
     }
     else{
          let link = `/${item.name}`;
            menuitemsco.push(<MenuItem
            primaryText={title}
            key={item.name}
            leftIcon={item.icon}
            onTouchTap={onMenuTap}
            containerElement={<Link to={link} />}
        />);
     }
   });
   return menuitemsco;
}

const Menu = ({ onMenuTap, translate, logout }) => (
    <div style={styles.main}>
        <DashboardMenuItem onTouchTap={onMenuTap} />
        {getallmenus('baseinfocompany', translate,onMenuTap)}
        {logout}
    </div>
);
        /*<MenuItem
            containerElement={<Link to="/configuration" />}
            primaryText={translate('pos.configuration')}
            leftIcon={<SettingsIcon />}
            onTouchTap={onMenuTap}
        />*/
const enhance = compose(
    connect(state => ({
        theme: state.theme,
        locale: state.locale,
    })),
    translate,
);

export default enhance(Menu);
