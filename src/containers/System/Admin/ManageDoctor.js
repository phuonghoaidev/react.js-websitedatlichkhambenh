import React, { Component } from 'react';
import { connect } from 'react-redux';
import './TableManageUser.scss';
import * as actions from "../../../store/actions"
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import './ManageDoctor.scss';
import Select from 'react-select';
import { values } from 'lodash';
import { CRUD_ACTIONS, LANGUAGES } from "../../../utils";
import userService from "../../../services/userService";
import { FormattedMessage } from 'react-intl';
import { toast } from 'react-toastify';

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //save to Markdown table
            contentMarkdown: '',
            contentHTML: '',
            selectedOption: '',
            description: '',
            listDoctors: [],
            hasOldData: false,

            //save to doctor_infor table
            listPrice: [],
            listPayment: [],
            listProvince: [],
            listClinic: [],
            listSpecialty: [],


            selectedPrice: '',
            selectedPayment: '',
            selectedProvince: '',
            selectedClinic: '',
            selectedSpecialty: '',

            nameClinic: '',
            addressClinic: '',
            note: '',
            clinicId: '',
            specialtyId: ''

        }
    }
    componentDidMount() {
        this.props.fetchAllDoctors()
        this.props.getRequiredDoctorInfor();
    }

    builDataInputSelect = (inputData, type) => {
        let result = [];
        let { language } = this.props;
        if (inputData && inputData.length > 0) {
            if (type === 'USERS') {
                inputData.map((item, index) => {
                    let object = {};
                    let labelVi = `${item.lastName} ${item.firstName}`;
                    let labelEn = `${item.firstName} ${item.lastName}`;
                    object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                    object.value = item.id;
                    result.push(object)
                })
            }
            if (type === 'PRICE') {
                inputData.map((item, index) => {
                    let object = {};
                    let labelVi = `${item.valueVi}`;
                    let labelEn = `${item.valueEn} USD`;
                    object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                    object.value = item.keyMap;
                    result.push(object)
                })
            }
            if (type === 'PAYMENT' || type === 'PROVINCE') {
                inputData.map((item, index) => {
                    let object = {};
                    let labelVi = `${item.valueVi}`;
                    let labelEn = `${item.valueEn}`;
                    object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                    object.value = item.keyMap;
                    result.push(object)
                })
            }

            if (type === 'SPECIALTY') {
                inputData.map((item, index) => {
                    let object = {};
                    object.label = item.name;
                    object.value = item.id;
                    result.push(object)
                })
            }
            if (type === 'CLINIC') {
                inputData.map((item, index) => {
                    let object = {};
                    object.label = item.name;
                    object.value = item.id;
                    result.push(object)
                })
            }
        }


        return result;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.builDataInputSelect(this.props.allDoctors, 'USERS')
            this.setState({
                listDoctors: dataSelect
            })
        }

        if (prevProps.allRequiredDoctorInfor !== this.props.allRequiredDoctorInfor) {
            let { resPayment, resPrice, resProvince, resSpecialty, resClinic } = this.props.allRequiredDoctorInfor;

            let dataSelectPrice = this.builDataInputSelect(resPrice, 'PRICE');
            let dataSelectPayment = this.builDataInputSelect(resPayment, 'PAYMENT');
            let dataSelectProvince = this.builDataInputSelect(resProvince, 'PROVINCE');
            let dataSelectSpecialty = this.builDataInputSelect(resSpecialty, 'SPECIALTY');
            let dataSelectClinic = this.builDataInputSelect(resClinic, 'CLINIC');

            this.setState({
                listPrice: dataSelectPrice,
                listPayment: dataSelectPayment,
                listProvince: dataSelectProvince,
                listSpecialty: dataSelectSpecialty,
                listClinic: dataSelectClinic
            }, () => {
                // The doctor detail request can finish before the option
                // lists. Reload the selected doctor after the lists exist so
                // the saved price/payment/province are resolved correctly.
                if (this.state.selectedOption && this.state.selectedOption.value) {
                    this.handleChangeSelect(this.state.selectedOption);
                }
            })
        }

        if (prevProps.language !== this.props.language) {
            let dataSelect = this.builDataInputSelect(this.props.allDoctors, 'USERS');
            let { resPayment, resPrice, resProvince } = this.props.allRequiredDoctorInfor;
            let dataSelectPrice = this.builDataInputSelect(resPrice, 'PRICE');
            let dataSelectPayment = this.builDataInputSelect(resPayment, 'PAYMENT');
            let dataSelectProvince = this.builDataInputSelect(resProvince, 'PROVINCE');
            this.setState({
                listDoctors: dataSelect,
                listPrice: dataSelectPrice,
                listPayment: dataSelectPayment,
                listProvince: dataSelectProvince,
            })
        }
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html,
        })
    }

    resetForm = () => {
        this.setState({
            selectedOption: '', contentMarkdown: '', contentHTML: '', description: '',
            hasOldData: false, selectedPrice: '', selectedPayment: '', selectedProvince: '',
            selectedSpecialty: '', selectedClinic: '', nameClinic: '', addressClinic: '', note: ''
        });
    }

    handleSaveContentMarkdown = async () => {
        let { hasOldData, selectedOption, selectedPrice, selectedPayment, selectedProvince,
            selectedSpecialty, selectedClinic } = this.state;
        if (!selectedOption || !selectedOption.value) {
            toast.error('Please select a doctor!');
            return;
        }

        const res = await this.props.saveDetailDoctor({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: selectedOption.value,
            action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,

            selectedPrice: selectedPrice && selectedPrice.value,
            selectedPayment: selectedPayment && selectedPayment.value,
            selectedProvince: selectedProvince && selectedProvince.value,
            nameClinic: this.state.nameClinic,
            addressClinic: this.state.addressClinic,
            note: this.state.note,
            clinicId: selectedClinic && selectedClinic.value ? selectedClinic.value : '',
            specialtyId: selectedSpecialty && selectedSpecialty.value ? selectedSpecialty.value : ''
        });

        if (res && res.errCode === 0) {
            this.resetForm();
        }
    }


    handleChangeSelect = async (selectedOption) => {
        if (!selectedOption || !selectedOption.value) {
            this.setState({
                selectedOption: '', contentHTML: '', contentMarkdown: '', description: '',
                hasOldData: false, addressClinic: '', nameClinic: '', note: '',
                selectedPayment: '', selectedPrice: '', selectedProvince: '',
                selectedSpecialty: '', selectedClinic: '',
            });
            return;
        }

        this.setState({ selectedOption });
        let { listPayment, listPrice, listProvince, listSpecialty, listClinic } = this.state;

        let res = await userService.getDetailInforDoctor(selectedOption.value);
        if (!res || res.errCode !== 0 || !res.data) {
            this.setState({
                contentHTML: '',
                contentMarkdown: '',
                description: '',
                hasOldData: false,
                addressClinic: '',
                nameClinic: '',
                note: '', selectedPayment: '', selectedPrice: '', selectedProvince: '',
                selectedSpecialty: '', selectedClinic: '', specialtyId: ''
            })
            return;
        }

        // Normalize null relations returned by the API before reading fields.
        const Markdown = res.data.Markdown || {};
        const rawDoctorInfor = res.data.Doctor_Infor || {};
        const doctorInforItem = Array.isArray(rawDoctorInfor)
            ? (rawDoctorInfor[0] || {})
            : rawDoctorInfor;
        // Sequelize may expose the actual columns under dataValues.
        const Doctor_Infor = doctorInforItem.dataValues || doctorInforItem;
        const findOption = (options, value) => (options || []).find(item =>
            item && (
                String(item.value) === String(value) ||
                String(item.keyMap) === String(value)
            )
        ) || '';

        const selectedPayment = findOption(listPayment, Doctor_Infor.paymentId);
        const selectedPrice = findOption(listPrice, Doctor_Infor.priceId);
        const selectedProvince = findOption(listProvince, Doctor_Infor.provinceId);
        const selectedSpecialty = findOption(listSpecialty, Doctor_Infor.specialtyId);
        const selectedClinic = findOption(listClinic, Doctor_Infor.clinicId);

        this.setState({
            contentHTML: Markdown.contentHTML || '',
            contentMarkdown: Markdown.contentMarkdown || '',
            description: Markdown.description || '',
            hasOldData: Boolean(Markdown.contentHTML || Markdown.contentMarkdown || Object.keys(Doctor_Infor).length),
            addressClinic: Doctor_Infor.addressClinic || '',
            nameClinic: Doctor_Infor.nameClinic || '',
            note: Doctor_Infor.note || '',
            selectedPayment, selectedPrice, selectedProvince,
            selectedSpecialty, selectedClinic
        });
    };




    handleChangeselectDoctorInfor = async (selectedOption, name) => {
        let stateName = name.name;
        let stateCopy = { ...this.state };
        stateCopy[stateName] = selectedOption;

        this.setState({
            ...stateCopy
        })
    }




    handleOnChangeText = (event, id) => {
        let stateCopy = { ...this.state };
        stateCopy[id] = event.target.value;
        this.setState({
            ...stateCopy
        })
    }
    render() {
        let { hasOldData, listSpecialty } = this.state;

        return (
            <div className="manage-doctor-container">
                <div className="manage-doctor-title">
                    <FormattedMessage id="admin.manage-doctor.title" />
                </div>
                <div className="more-infor">
                    <div className="content-left form-group">
                        <label> <FormattedMessage id="admin.manage-doctor.select-doctor" /></label>
                        <Select
                            value={this.state.selectedOption}
                            onChange={this.handleChangeSelect}
                            options={this.state.listDoctors}
                            placeholder={<FormattedMessage id="admin.manage-doctor.select-doctor" />}
                        />
                    </div>
                    <div className="content-right">
                        <label> <FormattedMessage id="admin.manage-doctor.intro" /></label>
                        <textarea className="form-control"
                            onChange={(event) => this.handleOnChangeText(event, 'description')}
                            value={this.state.description}
                        >
                        </textarea>
                    </div>

                </div>


                <div className="more-infor-extra row">
                    <div className="col-4 form-group">
                        <label><FormattedMessage id="admin.manage-doctor.price" /></label>
                        <Select
                            value={this.state.selectedPrice}
                            onChange={this.handleChangeselectDoctorInfor}
                            options={this.state.listPrice}
                            placeholder={<FormattedMessage id="admin.manage-doctor.price" />}
                            name="selectedPrice"
                        />
                    </div>
                    <div className="col-4 form-group">
                        <label><FormattedMessage id="admin.manage-doctor.payment" /></label>
                        <Select
                            value={this.state.selectedPayment}
                            onChange={this.handleChangeselectDoctorInfor}
                            options={this.state.listPayment}
                            placeholder={<FormattedMessage id="admin.manage-doctor.payment" />}
                            name="selectedPayment"
                        />
                    </div>
                    <div className="col-4 form-group">
                        <label><FormattedMessage id="admin.manage-doctor.province" /></label>
                        <Select
                            value={this.state.selectedProvince}
                            onChange={this.handleChangeselectDoctorInfor}
                            options={this.state.listProvince}
                            placeholder={<FormattedMessage id="admin.manage-doctor.province" />}
                            name="selectedProvince"
                        />
                    </div>
                    <div className="col-4 form-group">
                        <label><FormattedMessage id="admin.manage-doctor.nameClinic" /></label>
                        <input className="form-control"
                            onChange={(event) => this.handleOnChangeText(event, 'nameClinic')}
                            value={this.state.nameClinic}
                        />
                    </div>
                    <div className="col-4 form-group">
                        <label><FormattedMessage id="admin.manage-doctor.addressClinic" /></label>
                        <input className="form-control"
                            onChange={(event) => this.handleOnChangeText(event, 'addressClinic')}
                            value={this.state.addressClinic}
                        />
                    </div>
                    <div className="col-4 form-group">
                        <label><FormattedMessage id="admin.manage-doctor.note" /></label>
                        <input className="form-control"
                            onChange={(event) => this.handleOnChangeText(event, 'note')}
                            value={this.state.note}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-4 form-group">
                        <label><FormattedMessage id="admin.manage-doctor.specialty" /></label>
                        <Select
                            value={this.state.selectedSpecialty}
                            onChange={this.handleChangeselectDoctorInfor}
                            options={this.state.listSpecialty}
                            placeholder={<FormattedMessage id="admin.manage-doctor.specialty" />}
                            name="selectedSpecialty"
                        />
                    </div>
                    <div className="col-4 form-group">
                        <label><FormattedMessage id="admin.manage-doctor.select-clinic" /></label>
                        <Select
                            value={this.state.selectedClinic}
                            onChange={this.handleChangeselectDoctorInfor}
                            options={this.state.listClinic}
                            placeholder={<FormattedMessage id="admin.manage-doctor.select-clinic" />}
                            name="selectedClinic"
                        />
                    </div>
                </div>

                <div className="manage-doctor-editor">
                    <MdEditor
                        style={{ height: '300px' }}
                        renderHTML={text => mdParser.render(text)}
                        onChange={this.handleEditorChange}
                        value={this.state.contentMarkdown}
                    />
                </div>




                <button
                    onClick={() => this.handleSaveContentMarkdown()}
                    className={hasOldData === true ? "save-content-doctor" : "create-content-doctor"}>
                    {hasOldData === true ?
                        <span><FormattedMessage id="admin.manage-doctor.save" /></span>
                        :
                        <span><FormattedMessage id="admin.manage-doctor.add" /></span>
                    }
                </button>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        allDoctors: state.admin.allDoctors,
        allRequiredDoctorInfor: state.admin.allRequiredDoctorInfor,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
        getRequiredDoctorInfor: () => dispatch(actions.getRequiredDoctorInfor()),
        saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctor(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
