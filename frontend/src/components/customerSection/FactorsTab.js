import React, { Component } from "react";
import { Segment, Checkbox, Table } from "semantic-ui-react";
import { connect } from "react-redux";
import {
  getAllBills,
  getRemainedBills
} from "../../actions/CustomerSectionActions";
import NotFound from "../utils/notFound";
import LoadingBar from "../utils/loadingBar";

class FactorsTab extends Component {
  state = {
    bills: [],
    virgin: true,
    remainedBillsToggle: false
  };
  componentDidMount() {
    this.props.getAllBills(this.props.passingPk).then(() => {
      this.setState({
        virgin: false,
        bills: this.props.allBills
      });
    });
  }

  createTable = () => {
    if (this.state.bills.length !== 0) {
      return (
        <Table celled className="text-center">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell className="d-table-border">
                نام محصول
              </Table.HeaderCell>
              <Table.HeaderCell>کد محصول</Table.HeaderCell>
              <Table.HeaderCell>قیمت واحد</Table.HeaderCell>
              <Table.HeaderCell>مقدار (متر)</Table.HeaderCell>
              <Table.HeaderCell>تخفیف</Table.HeaderCell>
              <Table.HeaderCell>قیمت نهایی فاکتو</Table.HeaderCell>
              <Table.HeaderCell>تخفیف کل</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              {this.state.bills[0].items.map(item => {
                return (
                  <React.Fragment>
                    <Table.Cell className="d-table-border">
                      {item.product.name}
                    </Table.Cell>
                    <Table.Cell>{item.product.code}</Table.Cell>
                    <Table.Cell>{item.product.selling_price}</Table.Cell>
                    <Table.Cell>{item.amount}</Table.Cell>
                    <Table.Cell>{item.discount}</Table.Cell>
                    <Table.Cell>{item.final_price}</Table.Cell>
                    <Table.Cell>{item.total_discount}</Table.Cell>
                  </React.Fragment>
                );
              })}
            </Table.Row>
          </Table.Body>
        </Table>
      );
    }
  };

  onClose = () => {
    this.props.onClose();
  };

  handleToggleClick = () => {
    this.setState(
      {
        virgin: false,
        remainedBillsToggle: !this.state.remainedBillsToggle
      },
      () => {
        if (this.state.remainedBillsToggle) {
          this.props.getRemainedBills(this.props.passingPk).then(() => {
            this.setState({
              virgin: false,
              bills: this.props.remainedBills
            });
          });
          this.setState({
            bills: this.props.allBills
          });
        } else {
          this.props.getAllBills(this.props.passingPk).then(() => {
            this.setState({
              virgin: false,
              bills: this.props.allBills
            });
          });
        }
      }
    );
  };

  render() {
    return (
      <div className="rtl text-center">
        <Segment stacked className="text-right us-fm-segment">
          <Checkbox
            toggle
            className="us-fm-toggle"
            onClick={this.handleToggleClick}
          />
          <span className="us-fm-span">نمایش فاکتورهای باقی مانده</span>
        </Segment>
        {this.state.virgin ? <LoadingBar /> : null}
        {this.state.bills.length ? this.createTable() : <NotFound />}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    allBills: state.customers.allBills,
    remainedBills: state.customers.remainedBills
  };
};

export default connect(mapStateToProps, { getAllBills, getRemainedBills })(
  FactorsTab
);
