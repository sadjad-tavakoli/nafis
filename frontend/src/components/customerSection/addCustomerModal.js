import React, { Component } from "react";
import { Button, Form, Modal } from "semantic-ui-react";
import { connect } from "react-redux";
import { getClassTypes } from "../../actions/CustomerSectionActions";

class AddCustomerModal extends Component {
  state = {
    first_name: null,
    last_name: null,
    email: null,
    phone_number: null,
    address: null,
    city: null,
    bitrth_date: null,
    marriage_date: null,
    points: null,
    class_type_options: [],
    city_options: [],
    formValidation: {
      first_name: false,
      last_name: false,
      email: false,
      phone_number: false
    }
  };

  componentDidMount() {
    this.props.getClassTypes().then(() => {
      this.setState(
        {
          class_type_options: this.props.classAndCity.customerTypes,
          city_options: this.props.classAndCity.cities
        },
        () => {
          console.log(this.state.class_type_options);
        }
      );
    });
  }

  inputChange = (event, inputName) => {
    this.setState({
      [inputName]: event.target.value
    });
  };

  render() {
    return (
      <Modal
        dimmer={"blurring"}
        open={this.props.open}
        onClose={this.props.onClose}
        className="text-right"
      >
        <Modal.Header>افزودن مشتری جدید</Modal.Header>

        <Modal.Content>
          <Form className="rtl">
            <Form.Group unstackable widths={2}>
              <Form.Input
                className="ltr placeholder-rtl text-right"
                label="نام"
                error={this.state.formValidation.first_name}
                onChange={e => this.inputChange(e, "first_name")}
                placeholder="نام"
              />
              <Form.Input
                className="ltr placeholder-rtl text-right"
                placeholder="نام خانوادگی"
                label="نام خانوادگی"
                error={this.state.formValidation.last_name}
                onChange={e => this.inputChange(e, "last_name")}
              />
            </Form.Group>
            <Form.Group unstackable widths={2}>
              <Form.Input
                className="ltr placeholder-rtl"
                label="ایمیل"
                error={this.state.formValidation.email}
                onChange={e => this.inputChange(e, "email")}
                placeholder="آدرس ایمیل"
              />
              <Form.Input
                className="rtl placeholder-rtl text-right"
                placeholder="شماره تلفن"
                label="تلفن"
                type="number"
                error={this.state.formValidation.phone_number}
                onChange={e => this.inputChange(e, "phone_number")}
              />
            </Form.Group>
            <Form.Group unstackable widths={2}>
              <Form.Input
                className="ltr placeholder-rtl text-right"
                label="آدرس"
                onChange={e => this.inputChange(e, "address")}
                placeholder="آدرس"
              />
              <Form.Select
                className="ltr placeholder-rtl text-right"
                placeholder="شهر"
                label="شهر"
                search
                selection
                fluid
                options={this.state.city_options}
              />
            </Form.Group>
            <Form.Group unstackable widths={2}>
              <Form.Input
                className="ltr placeholder-rtl"
                label="تاریخ تولد"
                onChange={e => this.inputChange(e, "birth_date")}
                placeholder="مثل 15/2/1398"
              />
              <Form.Input
                className="ltr placeholder-rtl"
                placeholder="تاریخ ازدواج"
                label="تاریخ ازدواج"
                onChange={e => this.inputChange(e, "marriage_date")}
              />
            </Form.Group>
            <Form.Group unstackable widths={2}>
              <Form.Input
                className="rtl placeholder-rtl text-right"
                type="number"
                label="امتیاز"
                onChange={e => this.inputChange(e, "points")}
                placeholder="امتیاز"
              />
              <Form.Select
                className="ltr placeholder-rtl"
                placeholder="نوع"
                label="نوع"
                search
                selection
                fluid
                options={this.state.class_type_options}
              />
            </Form.Group>
          </Form>
        </Modal.Content>

        <Modal.Actions>
          <Button color="black" onClick={this.props.onClose}>
            لغو
          </Button>
          <Button
            positive
            icon="checkmark"
            labelPosition="right"
            content="تایید"
            onClick={this.props.onClose}
          />
        </Modal.Actions>
      </Modal>
    );
  }
}

const mapStateToProps = state => {
  console.log(state);
  return {
    classAndCity: state.customers.classTypesAndCity
  };
};

export default connect(mapStateToProps, { getClassTypes })(AddCustomerModal);