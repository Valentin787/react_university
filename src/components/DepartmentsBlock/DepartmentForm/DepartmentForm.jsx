import React, { Component } from "react";
import PropTypes from "prop-types";
import Paper from "../../common/Paper/Paper";
import BigButton from "../../common/BigButton/BigButton";
import s from "./DepartmentForm.module.css";

class DepartmentForm extends Component {
  static propTypes = {
    addNewCity: PropTypes.func,
  };

  state = {
    department: "",
  };

  handlerInput = (e) => {
    const { value } = e.target;

    this.setState({
      department: value,
    });
  };

  handlerSubmitForm = (e) => {
    e.preventDefault();

    const { addNewDepartment } = this.props;
    const { department } = this.state;
    addNewDepartment(department);

    this.resetInput();
  };

  resetInput = () => {
    this.setState({
      department: "",
    });
  };

  render() {
    const { department } = this.state;
    const { name, title, placeholder, departmentArr } = this.props;

    const sameDepartmentName = departmentArr.includes(department);

    const isActiveBtnAdd = Object.values(this.state).some(
      (inputItem) => inputItem === ""
    );

    return (
      <div className={s.wrap}>
        <Paper>
          <h4 className={s.header}>{title}</h4>
          <form onSubmit={this.handlerSubmitForm} className={s.form} action="">
            <input
              onChange={this.handlerInput}
              name={name}
              type="text"
              placeholder={placeholder}
              value={department}
              className={s.input}
              required
            />
            {sameDepartmentName && <p>Название {department} уже существует</p>}
            <BigButton
              type="submit"
              text="Добавить"
              disabledBtnCity={isActiveBtnAdd}
            />
          </form>
        </Paper>
      </div>
    );
  }
}

DepartmentForm.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  departmentArr: PropTypes.array,
};

export default DepartmentForm;
