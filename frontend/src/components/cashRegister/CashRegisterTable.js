import React from "react";
import { Icon, Table, Button, Pagination } from "semantic-ui-react";
import { connect } from "react-redux";
import { getActiveBills, deleteBill } from "../../actions/CashRegisterActions";
import { digitToComma } from "../utils/numberUtils";
import { standardTimeToJalaali } from "../utils/jalaaliUtils";
import NotFound from "../utils/notFound";
import LoadingBar from "../utils/loadingBar";
import { toastr } from "react-redux-toastr";
import history from "../../history";
import TableLabel from "../utils/tableLabelGenerator";
import RepeatButton from "../utils/RepeatButton";
const colSpan = 5;

class CashRegisterTable extends React.Component {
  state = {
    fetch: false,
    totalPageCount: 1,
    activePage: 1
  };

  componentDidMount() {
    this.getActiveBills();
  }

  closeModal = () => {
    this.setState({
      open: true
    });
  };

  handleDelete = pk => {
    let confirm = window.confirm("آیا از حذف این فاکتور مطمئن هستید؟");
    if (confirm) {
      this.props
        .deleteBill(pk)
        .then(() => {
          this.setState({ fetch: false });
          toastr.success(
            "حذف فاکتور با موفقیت انجام شد",
            "فاکتور با موفقیت حذف گردید"
          );
          this.getActiveBills(this.state.activePage);
        })
        .catch(() => {
          toastr.error("عملیات حذف ناموفق بود");
        });
    }
  };
  getActiveBills = (page = 1) => {
    this.props.getActiveBills(page).then(res => {
      console.log(res);
      this.setState({
        fetch: true,
        totalPageCount: this.props.activeBills
          ? Math.ceil(res.data.count / 25)
          : 0
      });
    });
  };
  changePage = (_, { activePage }) => {
    this.setState(
      {
        activePage,
        fetch: false
      },
      () => {
        this.getActiveBills(this.state.activePage);
      }
    );
  };
  render() {
    return (
      <React.Fragment>
        <Table celled className="rtl text-center">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell colSpan={colSpan} className="text-right">
                لیست فاکتورهای فعال
                <RepeatButton
                  onClick={() => this.getActiveBills(this.state.activePage)}
                />
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          {this.state.fetch && this.props.activeBills.length ? (
            <React.Fragment>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell className="table-border-left">
                    <TableLabel>1</TableLabel>
                    موبایل خریدار
                  </Table.HeaderCell>
                  <Table.HeaderCell>
                    <TableLabel>2</TableLabel>
                    اسم فروشنده
                  </Table.HeaderCell>
                  <Table.HeaderCell>
                    <TableLabel>3</TableLabel>
                    مبلغ نهایی فاکتور
                  </Table.HeaderCell>
                  <Table.HeaderCell>
                    <TableLabel>4</TableLabel>
                    تاریخ فاکتور
                  </Table.HeaderCell>
                  <Table.HeaderCell>عملیات فاکتور</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {this.props.activeBills.map(bill => {
                  return (
                    <Table.Row>
                      <Table.Cell
                        className="table-border-left"
                        style={{ fontFamily: "arial" }}
                      >
                        <TableLabel>1</TableLabel>
                        {bill.buyer.phone_number}
                      </Table.Cell>
                      <Table.Cell>
                        <TableLabel>2</TableLabel>
                        {bill.seller.first_name}
                        &nbsp;
                        {bill.seller.last_name}
                      </Table.Cell>
                      <Table.Cell
                        style={{ fontFamily: "arial", fontWeight: "bold" }}
                      >
                        <TableLabel>3</TableLabel>
                        {digitToComma(bill.final_price)}&nbsp;
                        <span className="yekan">تومان</span>
                      </Table.Cell>
                      <Table.Cell style={{ fontFamily: "arial" }}>
                        <TableLabel>4</TableLabel>
                        {standardTimeToJalaali(bill.create_date)}
                      </Table.Cell>
                      <Table.Cell>
                        <Button
                          icon="info"
                          labelPosition="right"
                          color="teal"
                          content="مشاهده"
                          className="yekan"
                          onClick={() => {
                            history.push(`/cashregister/${bill.pk}`);
                          }}
                        />
                        <Button
                          icon="delete"
                          labelPosition="right"
                          color="red"
                          content="حذف"
                          className="yekan"
                          LoadingBar
                          onClick={() => {
                            this.handleDelete(bill.pk);
                          }}
                        />
                      </Table.Cell>
                    </Table.Row>
                  );
                })}
              </Table.Body>
              <Table.Footer
                fullWidth
                className={"ltr"}
                hidden={this.state.totalPageCount < 2}
              >
                <Table.Row>
                  <Table.HeaderCell colSpan={colSpan} className="norm-latin">
                    <Pagination
                      className="norm-latin"
                      activePage={this.state.activePage}
                      defaultActivePage={1}
                      onPageChange={this.changePage}
                      totalPages={this.state.totalPageCount}
                    />
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Footer>
            </React.Fragment>
          ) : null}
        </Table>
        {!this.state.fetch ? <LoadingBar /> : null}
        {this.state.fetch && !this.props.activeBills.length ? (
          <NotFound />
        ) : null}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    activeBills: state.cash.activeBills && state.cash.activeBills.results
  };
};

export default connect(mapStateToProps, { getActiveBills, deleteBill })(
  CashRegisterTable
);
