
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class ModalUser extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
    }

    toggle = () => {
        alert('me toggle')
    }

    render() {
        return (
            <Modal isOpen={true} toggle={() => { this.toggle() }} className={'abcclassName'}>
                <ModalHeader toggle={() => { this.toggle() }}>Create a new user</ModalHeader>
                <ModalBody>
                    Lorem ipsum dolor sit amet, consectetur adipising elit,
                    sed do eiusmod tempor incidiunt ut labore et dolore magna aliqua
                    ded et na ca cho haha incu ding met thu ta qua lalal ca ha.
                    htats,cndfjheb ex to ba di nsja.
                    sjdheushasaks tatatatat sjnegfuhdsaaks.
                    bddwwkdwopjdoehfh;lfn;ln;aslx;oshwqodo
                    hsjsasaslasklaskalskalsklasklaskaslska
                    akjskajskajksaksjaksjkasjkasjkajskaskasj
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={() => { this.toggle() }}>Do Something</Button>{' '}
                    <Button color="secondary" onClick={() => { this.toggle() }}>Cancel</Button>
                </ModalFooter>
            </Modal>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
