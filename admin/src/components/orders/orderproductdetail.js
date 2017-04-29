import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import { translate } from 'admin-on-rest';
import compose from 'recompose/compose';

class OrderProductDetail extends Component {
    render() {
        const { record, translate} = this.props;
      //productsdetail:[{"productid":"58e71be6ef4e8d02eca6e0e8","number":12,"price":12,"_id":"58ef69eb510c6f3752e889b6"},{"productid":"58eaecea130f4809a747d2f8","number":10,"price":11,"_id":"58ef69eb510c6f3752e889b5"}]
       const {productsdetail} = record;
       if(!record.couponprice){
           record.couponprice = 0;
       }
        if(!record.pointprice){
           record.pointprice = 0;
       }
        return (
            <Paper style={{ width: '42em', float: 'right' }} zDepth={2}>
                <Table selectable={false}>
                    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                        <TableRow>
                            <TableHeaderColumn>
                                {translate('resources.order.fields.productname')}
                            </TableHeaderColumn>
                            <TableHeaderColumn style={{ textAlign: 'right' }}>
                                {translate('resources.order.fields.productnumber')}
                            </TableHeaderColumn>
                            <TableHeaderColumn style={{ textAlign: 'right' }}>
                                {translate('resources.order.fields.productprice')}
                            </TableHeaderColumn>
                            <TableHeaderColumn style={{ textAlign: 'right' }}>
                                {translate('resources.order.fields.producttotalprice')}
                            </TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={false}>
                        {productsdetail.map(item => (
                            <TableRow key={item.productid}>
                                <TableRowColumn>
                                    {item.productinfo.name}
                                </TableRowColumn>
                                <TableRowColumn style={{ textAlign: 'right' }}>
                                     {item.number}
                                 </TableRowColumn>
                                <TableRowColumn style={{ textAlign: 'right' }}>
                                    {item.productinfo.pricenow.toLocaleString(undefined, { style: 'currency', currency: 'CNY' })}
 
                                </TableRowColumn>
                                <TableRowColumn style={{ textAlign: 'right' }}>
                                    {item.price.toLocaleString(undefined, { style: 'currency', currency: 'CNY' })}
                                </TableRowColumn>
                            </TableRow>)
                        )}
                        <TableRow>
                            <TableRowColumn colSpan={2} />
                            <TableRowColumn>{translate('resources.order.fields.orderprice')}</TableRowColumn>
                            <TableRowColumn style={{ textAlign: 'right' }}>
                                {record.orderprice.toLocaleString(undefined, { style: 'currency', currency: 'CNY' })}
                            </TableRowColumn>
                        </TableRow>
                        <TableRow>
                            <TableRowColumn colSpan={2} />
                            <TableRowColumn>{translate('resources.order.fields.couponprice')}</TableRowColumn>
                            <TableRowColumn style={{ textAlign: 'right' }}>
                                {record.couponprice.toLocaleString(undefined, { style: 'currency', currency: 'CNY' })}
                            </TableRowColumn>
                        </TableRow>
                        <TableRow>
                            <TableRowColumn colSpan={2} />
                            <TableRowColumn>{translate('resources.order.fields.pointprice')}</TableRowColumn>
                            <TableRowColumn style={{ textAlign: 'right' }}>
                                {record.pointprice.toLocaleString(undefined, { style: 'currency', currency: 'CNY' })}
                            </TableRowColumn>
                        </TableRow>
                        <TableRow>
                            <TableRowColumn colSpan={2} />
                            <TableRowColumn style={{ fontWeight: 'bold' }}>{translate('resources.order.fields.realprice')}</TableRowColumn>
                            <TableRowColumn style={{ textAlign: 'right', fontWeight: 'bold' }}>
                                {record.realprice.toLocaleString(undefined, { style: 'currency', currency: 'CNY' })}
                            </TableRowColumn>
                        </TableRow>
                    </TableBody>
                </Table>
            </Paper>
        );
    }
}



const enhance = compose(
    translate,
    connect()
);

export default enhance(OrderProductDetail);
