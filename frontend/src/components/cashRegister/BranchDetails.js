import React from "react";
import { Form, Header } from "semantic-ui-react";
import renderField from "./RenderField";

const BranchDetails = props => {
  return (
    <React.Fragment>
      <Header as="h3" textAlign="right">
        <span>شعبه: </span>
      </Header>
      <Form.Group className="rtl" widths="equal">
        {renderField(props.branch, "name", "اسم شعبه")}
        {renderField(props.branch, "address", "آدرس شعبه")}
      </Form.Group>
    </React.Fragment>
  );
};
export default BranchDetails;
