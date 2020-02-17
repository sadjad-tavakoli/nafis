import React, { Component } from "react";
import { connect } from "react-redux";
import { getSuppliersAction } from "../../actions/SuppliersActions";
import {
  Table,
  Grid,
  Search,
  Button,
  Pagination,
  Container,
  Segment
} from "semantic-ui-react";
import NotFound from "../utils/notFound";
import history from "../../history";
import LoadingBar from "../utils/loadingBar";
import Supplier from "./Supplier";
import AddSupplierModal from "./AddSupplierModal";

class Suppliers extends Component {
  state = {
    open: false,
    totalPageCount: 1,
    activePage: 1,
    allSuppliers: [],
    loading: true,
    pk: null,
    viewButtonClick: false,
    notFound: false
  };

  componentDidMount() {
    this.getSuppliers();
  }

  getSuppliers = () => {
    this.props
      .getSuppliersAction()
      .then(() => {
        this.setState({
          allSuppliers: this.props.allSuppliers.results,
          loading: false
        });
      })
      .catch(() => {
        this.setState({ notFound: true, loading: false });
      });
  };

  componentDidUpdate(prevProps) {
    if (
      prevProps.newSupplier &&
      prevProps.newSupplier.pk !== this.props.newSupplier.pk
    ) {
      this.getSuppliers(this.state.activePage);
    }
    console.log("prevProps", prevProps.newSupplier);
    console.log("props", this.props.newSupplier);
  }

  handleClick = pk => {
    this.setState({ pk });
  };

  changePage = (_, { activePage }) => {
    this.setState({ activePage: activePage }, () => {
      this.props.getSuppliersAction(this.state.activePage);
    });
  };

  onClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <Container>
        <AddSupplierModal open={this.state.open} onClose={this.onClose} />
        <Segment stacked className="rtl">
          <Button
            className="yekan"
            onClick={() => this.setState({ open: true })}
            color="green"
            content="افزودن تامین کننده جدید"
            icon="add"
            labelPosition="right"
          />
          <Button
            icon="home"
            color="teal"
            onClick={() => history.push("/")}
            style={{ float: "left" }}
          />
        </Segment>
        <Table celled className="rtl text-center" columns={6}>
          <Table.Header className="text-right">
            <Table.Row>
              <Table.HeaderCell colSpan="5">
                <Grid columns={1}>
                  <Grid.Row>
                    <h2 className="yekan s-h2-padding">تامین کنندگان</h2>
                    <Search
                      showNoResults={false}
                      placeholder="جست و جو..."
                      className="placeholder-rtl yekan ltr"
                    />
                  </Grid.Row>
                </Grid>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Header>
            {!this.state.loading && this.state.allSuppliers.length > 0 ? (
              <Table.Row>
                <Table.HeaderCell style={{ borderLeft: "1px solid #ddd" }}>
                  نام
                </Table.HeaderCell>
                <Table.HeaderCell>نام خانوادگی</Table.HeaderCell>
                <Table.HeaderCell>ایمیل</Table.HeaderCell>
                <Table.HeaderCell>شماره موبایل</Table.HeaderCell>
                <Table.HeaderCell>آدرس</Table.HeaderCell>
                <Table.HeaderCell style={{ borderTop: "1px solid #ddd" }}>
                  عملیات
                </Table.HeaderCell>
              </Table.Row>
            ) : null}
          </Table.Header>

          {!this.state.loading && this.state.allSuppliers.length > 0
            ? this.state.allSuppliers.map(item => {
                return (
                  <Table.Body>
                    <Table.Row key={item.pk}>
                      <Table.Cell style={{ borderLeft: "1px solid #ddd" }}>
                        {item.first_name}
                      </Table.Cell>
                      <Table.Cell>
                        <span>{item.last_name}</span>
                      </Table.Cell>
                      <Table.Cell className="norm-latin">
                        <span>{item.email}</span>
                      </Table.Cell>
                      <Table.Cell className="norm-latin">
                        <span>{item.phone_number}</span>
                      </Table.Cell>
                      <Table.Cell>
                        <span>{item.address}</span>
                      </Table.Cell>
                      <Table.Cell>
                        <Button
                          color="teal"
                          onClick={() => {
                            this.handleClick(item.pk);
                            history.push(`/suppliers/supplier/${item.pk}/`);
                          }}
                        >
                          <span>مشاهده و ویرایش</span>
                        </Button>
                      </Table.Cell>
                    </Table.Row>
                  </Table.Body>
                );
              })
            : null}
          {this.state.loading ? <LoadingBar /> : null}
          {!this.state.loading && !this.state.allSuppliers.length ? (
            <NotFound />
          ) : null}

          {this.props.allSuppliers && this.props.allSuppliers.count > 25 ? (
            <Table.Footer>
              <Table.Row>
                <Table.HeaderCell colSpan="5">
                  <Pagination
                    className="norm-latin ltr"
                    defaultActivePage={1}
                    onPageChange={this.changePage}
                    firstItem={null}
                    lastItem={null}
                    totalPages={Math.ceil(this.props.allSuppliers.count / 25)}
                  />
                </Table.HeaderCell>
              </Table.Row>
            </Table.Footer>
          ) : null}
        </Table>
        {this.state.viewButtonClick ? <Supplier /> : null}
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    allSuppliers: state.suppliers.suppliers,
    newSupplier: state.suppliers.newSupplier
      ? state.suppliers.newSupplier.pk
      : { pk: 0 }
  };
};

export default connect(mapStateToProps, { getSuppliersAction })(Suppliers);
