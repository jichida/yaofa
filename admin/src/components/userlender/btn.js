import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import ThumbUp from 'material-ui/svg-icons/action/thumb-up';
import ThumbDown from 'material-ui/svg-icons/action/thumb-down';
import { reviewApprove as reviewApproveAction, reviewReject as reviewRejectAction, reviewApproveStart as reviewApproveStartAction } from './action';

class ApproveButton extends Component {
    handleApprove = () => {
        const { reviewApprove, record } = this.props;
        reviewApprove(record.id, record);
    }

    handleReject = () => {
        const { reviewReject, record } = this.props;
        reviewReject(record.id, record);
    }

    handleStartApprove = ()=>{
      const { reviewApproveStart, record } = this.props;
      reviewApproveStart(record.id, record);
    }

    render() {
        const { record } = this.props;
        let co;

        if(record.approvalstatus === '待审核'){
            co = (<span>
              <FlatButton label="开始审核" primary={true}  onClick={this.handleStartApprove} />
            </span>);
        }
        else if(record.approvalstatus !== '未递交'){
          co = (
              <span>
                  <FlatButton label="通过" primary={true} onClick={this.handleApprove} disabled={record.approvalstatus === '已审核'}/>
                  <FlatButton label="拒绝" secondary={true}  onClick={this.handleReject} disabled={record.approvalstatus === '已拒绝'}  />
              </span>
          );
        }
        else{
          co = (<span>
          未递交
          </span>);
        }

        return co;
    }
}

ApproveButton.propTypes = {
    record: PropTypes.object,
    reviewApprove: PropTypes.func,
    reviewReject: PropTypes.func,
    reviewApproveStart: PropTypes.func,
};

export default connect(null, {
    reviewApprove: reviewApproveAction,
    reviewReject: reviewRejectAction,
    reviewApproveStart: reviewApproveStartAction,
})(ApproveButton);
