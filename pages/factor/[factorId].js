import { makeStyles, useMediaQuery } from "@material-ui/core";
import { Table, Tag, Space } from "antd";
const { Column } = Table;
import { Button } from "Components/Button";
import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { getOrders } from "Services/order.api";
import { dateFA, toFarsiNumber, toToman } from "Utils/helperFunction";
import styles from "./factor.module.css";
import Head from "next/head";
import ReactToPdf from "react-to-pdf";
import ExpandedIcon from "Assets/img/icons/icon_expanded.svg";
import NotExpandedIcon from "Assets/img/icons/icon_not_expanded.svg";
const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      background: "#fff",
    },
  },
  root: {
    padding: "20px",
    "& .ant-table-thead > tr > th, .ant-table-tbody > tr > td, .ant-table tfoot > tr > th, .ant-table tfoot > tr > td":
    {
      padding: "8px 10px",
    },
    "@media print": {
      "& .label": {
        ...theme.font.s12w700,
      },
    },
  },
  info: {
    display: "flex",
    gap: 40,
    marginBottom: "20px",
    "@media only screen and (max-width: 960px)": {
      justifyContent: "space-between",
      flexDirection: "column",
      gap: 20,
    },
    "& p": {
      margin: "10px 0",
      "@media only screen and (max-width: 960px)": {
        ...theme.font.s10w700,
      },
    },
  },
  seller: {
    border: "1px solid",
    margin: 3,
  },
  main_color: {
    color: "#F6891F",
  },
  info_company_title: {
    display: "flex",
    gap: 40,
    justifyContent: "center",
    "@media only screen and (max-width: 960px)": {
      justifyContent: "space-between",
      flexDirection: "column",
      gap: 20,
    },
    "& p": {
      margin: "10px 0",
      "@media only screen and (max-width: 960px)": {
        ...theme.font.s10w700,
      },
    },
  },
  text_table: {
    fontWeight: 40
  },
  info_company: {
    display: "flex",
    gap: 40,
    marginBottom: "20px",
    justifyContent: "center",
    "@media only screen and (max-width: 960px)": {
      justifyContent: "space-between",
      flexDirection: "column",
      gap: 20,
    },
    "& p": {
      margin: "10px 0",
      "@media only screen and (max-width: 960px)": {
        ...theme.font.s10w700,
      },
    },
  },
  name: {
    "@media only screen and (max-width: 960px)": {
      ...theme.font.s12w700,
    },
  },
}));
const FactorPage = () => {
  const classes = useStyles();
  const router = useRouter();
  const [order, setOrder] = useState({});
  const [loading, setLoading] = useState(false);
  const ref = React.createRef();
  const matches = useMediaQuery("@media (max-width:1120px)");
  console.log(order);
  useEffect(() => {
    setLoading(true);
    if (router?.query?.factorId) {
      getOrders(router?.query?.factorId)
        .then(res => {
          setOrder(res);
          setLoading(false);
        })
        .catch(err => {
          setLoading(false);
        });
    }
  }, [router?.query?.factorId]);
  const columns = [
    // {
    //   title: <div className={classes.label}>????????</div>,
    //   key: "row",
    //   render: (_text, record) => {
    //     console.log("record", record);
    //   },
    // },
    {
      title: <div className={styles.label}>?????????? ????????</div>,
      dataIndex: "product_id",
      key: "product_id",
      render: ({ record }) => <div className={styles.render}>{toFarsiNumber(record?.product_id)}</div>,
    },
    {
      title: <div className={styles.label}>?????? ??????????</div>,
      key: "product_name",
      render: ({ record }) => (
        <div className={`${classes.name} ${styles.text_table} ${styles.name_p}`}>
          {record?.product?.name}
        </div>
      ),
    },
    {
      title: <div className={styles.label}>??????????</div>,
      key: "count",
      render: ({ record }) => <div className={styles.render}>{toFarsiNumber(record?.count)}</div>,
    },
    {
      title: <div className={styles.label}> ???????? ????????</div>,
      key: "price",
      render: ({ record }) => (
        <div className={styles.render}>{toToman(record?.product?.purchase_price)} ??????????</div>
      ),
    },
    {
      title: <div className={styles.label}>  ???????? ????</div>,
      key: "total_amount",
      render: ({ record }) => <div className={styles.render}>{toToman(record?.total_amount)} ??????????</div>,
    },
    {
      title: <div className={styles.label}>  ???????? ??????????</div>,
      key: "off_amount",
      render: ({ record }) => <div className={styles.render}>{toToman(record?.off_amount)} ??????????</div>,
    },
    {
      title: (
        <div className={styles.label}>
          ?????? ?????????? {toToman(3)} %{" "}
        </div>
      ),
      key: "charges_amount",
      render: ({ record }) => <div className={styles.render}>{toToman(record?.charge_amount)} ??????????</div>,
    },
    {
      title: (
        <div className={styles.label}>
          ?????? ???????????? {toToman(6)} %{" "}
        </div>
      ),
      key: "_amount",
      render: ({ record }) => <div className={styles.render}>{toToman(record?.tax_amount)} ??????????</div>,
    },
    {
      title: (
        <div className={styles.label}> ???????? ???? ???? ???????????? ???????????? ?? ??????????  </div>
      ),
      key: "total_amount_with_tax",
      render: ({ record }) => (
        <div className={styles.render}>{toToman(order?.total_amount_without_delivery_amount)} ??????????</div>
      ),
    },
  ];
  const mobileColumnsKey = ["product_name", "count"];
  const first = columns.filter(
    value => mobileColumnsKey.indexOf(value.key) > -1,
  );
  const second = columns.filter(
    value => mobileColumnsKey.indexOf(value.key) === -1,
  );
  const mobileColumns = { first, second };
  const expandable = {
    expandedRowRender: record => (
      <>
        <div>
          <div>
            {mobileColumns?.second?.map(column => {
              const { render: Render } = column;
              return (
                <div
                  key={Math.random()}
                  style={{ display: "flex", gap: "10px", padding: "8px 0" }}
                >
                  {column.title}: <Render record={record} />
                </div>
              );
            })}
          </div>
        </div>
      </>
    ),
    expandIcon: ({ expanded, onExpand, record }) => (
      <div className="cell">
        {expanded ? (
          <div onClick={e => onExpand(record, e)} style={{ display: "flex" }}>
            <ExpandedIcon />
          </div>
        ) : (
          <div onClick={e => onExpand(record, e)} style={{ display: "flex" }}>
            <NotExpandedIcon />
          </div>
        )}
      </div>
    ),
    expandRowByClick: true,
  };
  const downloadHand = () => {
    var pdf = new jsPDF("p", "pt", "letter");
    pdf.canvas.height = 72 * 11;
    pdf.canvas.width = 72 * 8.5;
    pdf.fromHTML(document.body);
    pdf.save("test.pdf");
  };
  return (
    <>
      <Head>
        <h2> <title>???????????? ????????</title></h2>
      </Head>
      {/* <ReactToPdf targetRef={ref} filename="div-blue.pdf"  x={.5} y={.5} scale={0.8}>
        {({toPdf}) => (
            <button onClick={toPdf}>Generate pdf</button>
        )}
    </ReactToPdf> */}
      <div className={`${classes.seller} `}>
        <div className={`${classes.info_company_title} `}>
          <h1 className={`${classes.main_color} `}>???????? ???????????? ?????????? ?????????? ????????????????</h1>
        </div>
        <div className={`${classes.info_company} `}>
          <p>???????? : <span className={`${classes.main_color} `}>???????? ???????????? ???????? 27 ?????? ???????? ?????????? 3</span></p>
          <p>?????????? ???????? : <span className={`${classes.main_color} `}><tel>33445566-051</tel></span></p>
          <p> ???????????? : <span className={`${classes.main_color} `}><url>zl50.ir</url></span></p>
          <p> ?????????? : <span className={`${classes.main_color} `}>info@arshiarahsazmachine.com</span></p>
          <p> ?????????? ?????? : <span className={`${classes.main_color} `}>{dateFA(new Date())}</span></p>
        </div>
      </div>
      <div className={`${classes.seller} `}>
        <div className={`${classes.info_company_title} `}>
          <h1 className={`${classes.main_color} `}>????????????</h1>
        </div>
        <div className={`${classes.info_company} `}>
          {/* <p> ???????????? : <span>{order?.address?.location}</span></p> */}
          <p> ?????? ???????? : <span className={`${classes.main_color} `}>{`${order?.user?.first_name} ${order?.user?.last_name} `}</span></p>
          <p> ???????? : <span className={`${classes.main_color} `}>{order?.user?.phone_number}</span></p>
          <p>  ?????????? ?????????? : <span className={`${classes.main_color} `}>{order?.id}</span></p>
          <p>  ?????????? ??????????  : <span className={`${classes.main_color} `}>{dateFA(order?.created_at)}</span></p>
        </div>
        <div className={`${classes.root} ${styles.main_p}`} ref={ref}>
          <Table
            dataSource={order?.products}
            loading={loading}
            bordered={true}
            // columns={columns}
            expandable={matches ? expandable : null}
          >
            {matches ? (
              <>
                {mobileColumns?.first?.map(column => {
                  const { render: Render, ...columnProps } = column;
                  return (
                    <Column
                      key={Math.random()}
                      render={(text, record) => {
                        console.log("column", record);
                        return <Render text={text} record={record} />;
                      }}
                      {...columnProps}
                    />
                  );
                })}
              </>
            ) : (
              columns.map((column, index) => {
                const { render: Render, ...columnProps } = column;
                return (
                  <Column
                    key={index}
                    render={(text, record) => {
                      console.log("column", record);
                      return <Render text={text} record={record} />;
                    }}
                    {...columnProps}
                  />
                );
              })
            )}
          </Table>
          <div className={`${classes.info_company} `}>
            <p >???????? ???? : <span className={`${classes.main_color} `}> {toToman(order?.total_amount_without_delivery_amount)} ??????????</span></p>
            <p>?????????? ?????? ?? ?????? : <span className={`${classes.main_color} `}>{toToman(order?.delivery_amount)} ??????????</span></p>
            <p>???????? ?????????? : <span className={`${classes.main_color} `}>{toToman(order?.total_amount)} ??????????</span></p>
          </div>
          {!matches && (
            <Button className={styles.btn} onClick={() => window.print()}>
              ??????????
            </Button>
          )}
        </div>
      </div>
    </>
  );
};
export default FactorPage;