import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManageUser.scss';

class TableManageUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
           
        }
    }
    render() {
        return (
                    <table id="TableManageUser">
                        <thead>
                            <tr>
                                <th>Email</th>
                                <th>First name</th>
                                <th>Last name</th>
                                <th>Address</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                                    <tr >
                                        <td>{'item.email'}</td>
                                        <td>{'item.firstName'}</td>
                                        <td>{'item.lastName'}</td>
                                        <td>{'item.address'}</td>
                                        <td>
                                        </td>
                                    </tr>
                        </tbody>
                    </table>
              
        );
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
