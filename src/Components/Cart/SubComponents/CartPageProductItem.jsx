import { useState } from "react";
import { makeStyles, Grid } from "@material-ui/core";
import Link from "next/link";
import { Button } from "Components/Button";
import Counter from "Components/Counter";

// Assets
import CircleIcon from "Assets/img/icons/gray-circle.svg";
import RemoveIcon from "Assets/img/icons/remove-red.svg";
import { toToman } from "Utils/helperFunction";
import { addToCart, deleteToCart } from "Services/order.api";
import { useDispatch } from "react-redux";
import { addToBasket, removeCart } from "ReduxWrapper/actions/order.action";
import { useSelector } from "react-redux";
import { useUpdateEffect } from "hooks/useUpdateEffect"
const useStyles = makeStyles(theme => ({
  productItem: {
    display: "flex",
    alignItems: "flex-start",
    gap: 18,
    paddingBottom: 15,
    borderBottom: "1px solid #EBEBEB",
    marginBottom: 20,

    "@media(max-width: 576px)": {
      flexDirection: "column",
      "& > a": {
        width: "100%",
      },
    },

    "& > a": {
      width: 140,
      padding: 12,
      borderRadius: 8,
      border: "1px solid #EBEBEB",
      "& > img": {
        width: "100%",
      },
    },

    "& > div": {
      width: "100%",
      "& > h4": {
        color: "#333333",
        fontSize: 16,
        fontWeight: 700,
        marginBottom: 20,
      },
    },
  },
  ability: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    marginBottom: 20,
  },
  productFooter: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    "@media(max-width: 576px)": {
      alignItems: "flex-end",
      flexDirection: "column",
      alignItems: "flex-start",
      gap: 12,
    },
    "& > div": {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 12,
    },
    "& > div.right": {
      "& > h5": {
        color: "#333333",
        fontSize: 14,
        fontWeight: 700,
      },
    },
    "& > div.left": {
      "& > strong": {
        color: "#616161",
        fontSize: 14,
        fontWeight: 400,
        textDecoration: "line-through",
      },
      "& > span": {
        color: "#F6891F",
        fontSize: 18,
        fontWeight: 700,
      },
    },
  },
}));

export default function Cart({ setUpdate, ...item }) {
  const classes = useStyles();

  const [count, setCount] = useState(item?.count);
  const state = useSelector(state => state.cart);
  const dispatch = useDispatch();

  useUpdateEffect(() => {
    console.log('add run');
    try {
      addToCart({
        product_id: item.product_id,
        count,
      })
        .then(res => {
          console.log(res);
          dispatch(
            addToBasket({
              product_id: item.product_id,
              count,
            }),
          );
          setUpdate(pre => !pre);
        })
        .catch(err => {
          const error = err.response && (err.response || err.message);
          throw error;
        });
    } catch (err) {
      console.log("err__", err);
    }
  }, [count]);

  const removeHand = async () => {
    try {
      await deleteToCart(item.product_id)
        .then(res => {
          setUpdate(pre => !pre);
          dispatch(removeCart(item.product_id));
        })
        .catch(err => {
          const error = err.response && (err.response || err.message);

          throw error;
        });
    } catch (err) {
      console.log("err__", err);
    }
  };

  return (
    <div className={classes.productItem}>
      <Link href={`/products/${item.product.id}`}>
        <a>
          <img
            src={`${process.env.NEXT_PUBLIC_APP_FILE_BASE_URL}${item?.product?.cover_image?.image?.path}`}
            alt={item.product.name}
          />
        </a>
      </Link>

      <div>
        <h4>{item.product.name}</h4>
        <div className={classes.ability}>
          <div>
            <span>نام کشور سازنده : </span>
            <strong>{item.product?.manufacturing_country}</strong>
          </div>
          <CircleIcon />
          <div>
            <span>وزن : </span>
            <strong>{item.product.weight} کیلوگرم</strong>
          </div>
        </div>
        <div className={classes.productFooter}>
          <div className="right">
            <h5>تعداد</h5>
            <Counter number={count} setNumber={setCount} />
            <Button
              background="transparent"
              border="1px solid #FF0000"
              iconColor="#FF0000"
              padding="8px 10px"
              onClick={removeHand}
            >
              <RemoveIcon />
            </Button>
          </div>
          <div className="left">
            {/* <strong>120,000</strong> */}
            <span>{toToman(item.product.purchase_price)} تومان</span>
          </div>
        </div>
      </div>
    </div>
  );
}
