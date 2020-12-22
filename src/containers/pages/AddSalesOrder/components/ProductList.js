import React, { useContext, useState, useEffect, useRef } from 'react';
import { Table, Input, Button, Popconfirm, Form } from 'antd';
const EditableContext = React.createContext();

const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell = ({ title, editable, children, dataIndex, record, handleSave, ...restProps }) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef();
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };

  const save = async (e) => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24,
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: 'Product Code',
        dataIndex: 'code',
        editable: true,
        fixed: 'left',
      },
      {
        title: 'Product name',
        dataIndex: 'name',
        editable: false,
        fixed: 'left',
      },
      {
        title: 'Description',
        dataIndex: 'description',
      },
      {
        title: 'Unit',
        dataIndex: 'unit',
      },
      {
        title: 'Price (ExVat)',
        dataIndex: 'price',
      },
      {
        title: 'Price (InVat)',
        dataIndex: 'price_in_vat',
      },
      // {
      //   title: 'Discount (%)',
      //   dataIndex: 'discount',
      //   editable: true,
      // },
      {
        title: 'Quantity',
        dataIndex: 'quantity',
        editable: true,
      },
      {
        title: 'Amount (ExVat)',
        dataIndex: 'amount',
      },
      // {
      //   title: 'Vat (%)',
      //   dataIndex: 'vat',
      //   editable: true,
      // },
      {
        title: 'Amount (InVat)',
        dataIndex: 'amount_in_vat',
      },
      {
        title: 'operation',
        dataIndex: 'operation',
        render: (text, record) =>
          this.props.productLists.length >= 1 ? (
            <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.key)}>
              <a>Delete</a>
            </Popconfirm>
          ) : null,
        width: '7%',
        fixed: 'right',
      },
    ];
    console.log(this.props);
  }

  handleDelete = (key) => {
    // const dataSource = [...this.state.dataSource];
    const dataSource = [...this.props.productLists];
    // this.setState({
    //   dataSource: dataSource.filter((item) => item.key !== key),
    // });
    this.props.setProductLists(dataSource.filter((item) => item.key !== key));
  };
  handleAdd = () => {
    const newData = {
      key: this.props.productLists.length,
      id: null,
      code: 'POM-XXX',
      name: null,
      description: null,
      unit: null,
      price: null,
      // discount: 0,
      quantity: 1,
      amount: null,
      // vat: null,
      price_in_vat: null,
      amount_in_vat: null,
    };
    this.props.setProductLists([...this.props.productLists, newData]);
  };
  handleSave = (row) => {
    const newData = [...this.props.productLists];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    const selProduct = this.props.products.find((el) => el.code === row.code);
    if (selProduct) {
      row.id = selProduct.id;
      row.name = selProduct.name;
      row.description = selProduct.description;
      row.unit = selProduct.unit;
      row.price = selProduct.price;
      if (row.quantity > 0) {
        row.amount = selProduct.price * row.quantity;
        row.price_in_vat = selProduct.price * 1.07;
        row.amount_in_vat = row.amount * 1.07;
      }
    }

    newData.splice(index, 1, { ...item, ...row });
    this.props.setProductLists(newData);
  };

  render() {
    const components = {
      body: {
        row: EditableRow,
        cell: EditableCell,
      },
    };
    const columns = this.columns.map((col) => {
      if (!col.editable) {
        return col;
      }

      return {
        ...col,
        onCell: (record) => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave,
        }),
      };
    });
    return (
      <div>
        <Button
          onClick={this.handleAdd}
          type="primary"
          style={{
            marginBottom: 16,
          }}
        >
          Add Product
        </Button>
        <Table
          components={components}
          rowClassName={() => 'editable-row'}
          bordered
          dataSource={this.props.productLists}
          columns={columns}
          scroll={{ x: 1500 }}
        />
      </div>
    );
  }
}

export default ProductList;
