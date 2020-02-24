import React from "react";
import { connect } from "react-redux";
import { Table, Pagination, Button, Icon, Popup } from "semantic-ui-react";
import { getActiveBill } from "../../actions/SaleActions";
import { digitToComma, phoneNumberBeautifier } from "../utils/numberUtils";
import { standardTimeToJalaali } from "../utils/jalaaliUtils";
import InformationModal from "./informationModal";
import LoadingBar from "../utils/loadingBar";
import NotFound from "../utils/notFound";
import NewBillPopup from "./newBillPopup";

const colSpan = 7;

class BillTable extends React.Component {
  state = {
    activeBill: [],
    totalPageCount: 1,
    isOpenInformationModal: false,
    itemData: {},
    isOpenAddItem: NaN,
    activePage: 1,
    firstTime: true,
    openingModal: false,
    pk: null
  };

  componentDidMount() {
    this.getActiveBill();
  }

  componentDidUpdate(newProps) {
    if (
      newProps.newBillData &&
      newProps.newBillData.pk !== this.props.newBillData.pk
    ) {
      this.getActiveBill(this.state.activePage);
    }
  }

  getActiveBill = (page = 1) => {
    this.props.getActiveBill(page).then(() => {
      this.setState({
        firstTime: false,
        activeBill: this.props.activeBill ? this.props.activeBill.results : {},
        totalPageCount: this.props.activeBill
          ? Math.ceil(this.props.activeBill.count / 25)
          : 0
      });
    });
  };

  changePage = (_, { activePage }) => {
    this.setState({ activePage }, () => {
      this.getActiveBill(this.state.activePage);
    });
  };

  closeInformationModal = () => {
    this.getActiveBill(this.state.activePage);
    this.setState({ isOpenInformationModal: false });
  };

  openInformationModal = itemData => {
    this.setState({ itemData }, () => {
      this.setState({ isOpenInformationModal: true, pk: itemData.pk });
    });
  };

  toggleAddItemPopup = id => {
    this.setState({ isOpenAddItem: id });
  };

  submitItemPopup = data => {
    this.setState({
      itemsDataSheet: [...this.state.itemsDataSheet, data],
      formValidation: { ...this.state.formValidation, items: false }
    });
    this.toggleAddItemPopup();
  };

  render() {
    // Render Loading Bar
    if (this.state.firstTime) {
      return <LoadingBar />;
    }
    // ---

    // Render Not Found
    if (!this.state.activeBill.length && !this.state.firstTime) {
      return <NotFound />;
    }
    // ---

    return (
      <React.Fragment>
        <Table celled striped>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell colSpan={colSpan} className="rtl text-right">
                <h3 className="yekan">لیست فاکتور های فعال</h3>
              </Table.HeaderCell>
            </Table.Row>
            <Table.Row>
              <Table.HeaderCell className="text-center">
                عملیات
              </Table.HeaderCell>
              <Table.HeaderCell className="text-center">
                تعداد پرداختی ها
              </Table.HeaderCell>
              <Table.HeaderCell className="text-center">
                تاریخ ثبت
              </Table.HeaderCell>
              <Table.HeaderCell className="text-center">
                مبلغ کل
              </Table.HeaderCell>
              <Table.HeaderCell className="text-center">
                مبلغ نهایی
              </Table.HeaderCell>
              <Table.HeaderCell className="text-center">
                تخفیف کل
              </Table.HeaderCell>
              <Table.HeaderCell className="text-center">
                شماره تلفن خریدار
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {this.state.activeBill.map((item, index) => {
              return (
                <Table.Row key={index}>
                  <Table.Cell className="norm-latin text-center">
                    <Popup
                      content={
                        <NewBillPopup
                          refetch={() =>
                            this.getActiveBill(this.state.activePage)
                          }
                          phoneNumber={item.buyer.phone_number}
                          pk={item.pk}
                          onClose={() => this.toggleAddItemPopup(NaN)}
                          onSubmit={this.submitItemPopup}
                        />
                      }
                      open={this.state.isOpenAddItem === index}
                      className="no-filter"
                      position="bottom center"
                      wide="very"
                      trigger={
                        <Button
                          onClick={() => this.toggleAddItemPopup(index)}
                          icon
                          labelPosition="right"
                          color="green"
                        >
                          <span className="yekan">آیتم جدید</span>
                          <Icon name="add" />
                        </Button>
                      }
                      color="green"
                      size="huge"
                      icon="add"
                    />

                    <Button
                      onClick={() => this.openInformationModal(item)}
                      icon
                      labelPosition="right"
                      color="teal"
                    >
                      <span className="yekan">مشاهده و ویرایش</span>
                      <Icon name="info" />
                    </Button>
                  </Table.Cell>
                  <Table.Cell className="norm-latin text-center rtl">
                    <span>{item.payments.length}</span>&nbsp;
                    <span className="yekan">پرداختی</span>
                  </Table.Cell>
                  <Table.Cell className="norm-latin text-center">
                    <span>{standardTimeToJalaali(item.create_date)}</span>
                  </Table.Cell>
                  <Table.Cell className="norm-latin text-center rtl">
                    <span>{digitToComma(item.price)}</span>&nbsp;
                    <span className="yekan">تومان</span>
                  </Table.Cell>
                  <Table.Cell className="norm-latin text-center rtl">
                    <b>
                      <span>{digitToComma(item.final_price)}</span>&nbsp;
                      <span className="yekan">تومان</span>
                    </b>
                  </Table.Cell>
                  <Table.Cell className="norm-latin text-center rtl">
                    {item.total_discount ? (
                      <React.Fragment>
                        <span>{digitToComma(item.total_discount)}</span>
                        <span className="yekan">تومان</span>
                      </React.Fragment>
                    ) : (
                      "--"
                    )}{" "}
                  </Table.Cell>
                  <Table.Cell className="norm-latin text-center">
                    <span>
                      {phoneNumberBeautifier(item.buyer.phone_number)}
                    </span>
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
          <Table.Footer fullWidth hidden={this.state.totalPageCount < 2}>
            <Table.Row>
              <Table.HeaderCell colSpan={colSpan} className="norm-latin">
                <Pagination
                  className="norm-latin"
                  defaultActivePage={1}
                  onPageChange={this.changePage}
                  totalPages={this.state.totalPageCount}
                />
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>

        {this.state.isOpenInformationModal ? (
          <InformationModal
            refetch={() => this.getActiveBill(this.state.activePage)}
            open={this.state.isOpenInformationModal}
            onClose={this.closeInformationModal}
            pk={this.state.pk}
          />
        ) : null}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    activeBill: state.sale.activeBill,
    newBillData: !state.sale.newBillData ? { pk: 0 } : state.sale.newBillData
  };
};

export default connect(mapStateToProps, {
  getActiveBill
})(BillTable);
