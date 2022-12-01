import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

// Icons
import SearchSvg from "Assets/img/icons/search.svg";
import Close from "Assets/img/icons/close.svg";

import { useEffect } from "react";
import { getProducts } from "Services";
import { Divider } from "@material-ui/core";
import { useRouter } from "next/router";
import { toToman } from "Utils/helperFunction";

const useStyles = makeStyles(theme => ({
  main: {
    position: "relative",
    width: "100%",
  },
  searchInputWrapper: {
    position: "absolute",
    width: "100%",
    top: -20,
    "@media(max-width: 960px)": {
      position: "relative",
      top: "unset",
    },
    zIndex: 1000,
  },
  searchInput: {
    width: "95%",
    padding: "13px 54px",
    borderRadius: 8,
    background: "#F8F8F8",
    border: "none",
    outline: "none",
    ...theme.font.s14w500,
    "&::placeholder": {
      color: "#B1B1B1",
    },

    "@media(max-width: 960px)": {
      width: "100%",
      padding: "10px 6px 10px 32px",
    },
  },
  searchICon: {
    position: "absolute",
    top: 11,
    left: 20,
    "@media(max-width: 960px)": {
      top: 7,
      left: 7,
    },
  },
  search_item: {
    display: "flex",
    alignItems: "center",
    color: theme.color.black,
    gap: 12,
    cursor: "pointer",
  },
  left: {
    display: "flex",
    flexDirection: "column",
    color: theme.color.black,
    gap: 15,
    "& h5": {
      ...theme.font.s14w700,
    },
    "& p": {
      ...theme.font.s14w500,
      "& b": {
        color: theme.color.boldOrange,
      },
      "& span ": {
        color: "#616161",
      },
    },
  },
  right: {
    border: "1px solid #EBEBEB",
    borderRadius: "8px",
    padding: "6px",
    background: "#fff",
    "& img": {
      width: 50,
      height: 50,
    },
  },
  mask: {
    background: "rgba(0, 0, 0, 0.6)",
    width: "100%",
    height: "100vh",
    position: "fixed",
    top: 0,
    right: 0,
    zIndex: 100,
  },
  divider: {
    margin: "15px 0",
  },
  data: {
    padding: "20px",
    borderRadius: 8,
    position: "absolute",
    background: "#fff",
    maxWidth: "100%",
    maxHeight: "400px",
    overflowY: "auto",
    zIndex: 1000000000,
    width: "95%",
    top: 40,
    "@media(max-width: 960px)": {
      width: "100%",
    },
    "& h2": {
      color: "#616161",
      ...theme.font.s12w400,
      marginBottom: "20px",
    },
  },
  close: {
    position: "absolute",
    top: 13,
    display: "flex",
    right: 50,
    cursor: "pointer",
    "@media(max-width: 960px)": {
      right: 10,
    },
  },
}));

export default function NavCategory() {
  const classes = useStyles();
  const [inpt, setInpt] = useState("");
  const [products, setProducts] = useState({});
  const [isStart, setIsStart] = useState(false);

  const searchHand = event => {
    setInpt(event.target.value);
  };

  const removeHand = () => {
    setIsStart(false);
    setInpt("");
    setProducts({});
  };

  const fetchData = async () => {
    const data = await getProducts(0, null, inpt);
    setProducts(data);
    setIsStart(true);
  };

  useEffect(() => {
    let timer;
    if (inpt.length > 1) {
      timer = setTimeout(fetchData, 300);
    } else {
      setIsStart(false);
      setProducts({});
    }
    return () => clearTimeout(timer);
  }, [inpt]);

  const DATA = (
    <div className={classes.data}>
      <h2>نتایج جستجو</h2>
      {products?.items?.map((item, i) => (
        <React.Fragment key={item.id}>
          <SearchItem
            id={item.id}
            image={item?.cover_image?.image?.path}
            price={item?.purchase_price}
            name={item?.name}
            removeHand={removeHand}
          />
          {products?.items?.length - i != 1 && (
            <Divider classes={{ root: classes.divider }} />
          )}
        </React.Fragment>
      ))}
    </div>
  );

  return (
    <div className={classes.main}>
      <div className={classes.searchInputWrapper}>
        {inpt.length > 1 && (
          <span className={classes.close} onClick={removeHand}>
            <Close />
          </span>
        )}
        <input
          className={classes.searchInput}
          placeholder="دنبال چه چیزی می‌گردید؟"
          value={inpt}
          onChange={searchHand}
        />
        <SearchSvg className={classes.searchICon} />
      </div>
      {isStart && inpt && DATA}
      {isStart && inpt && <div className={classes.mask} />}
    </div>
  );
}

const SearchItem = ({ image, name, id, price, removeHand }) => {
  const classes = useStyles();
  const router = useRouter();

  const routeHand = () => {
    router.push(`/products/${id}`);
    removeHand();
  };
  return (
    <div className={classes.search_item} onClick={routeHand}>
      <div className={classes.right}>
        <img src={`${process.env.NEXT_PUBLIC_APP_FILE_BASE_URL}${image}`} alt={name} />
      </div>
      <div className={classes.left}>
        <h5>{name}</h5>
        <p>
          {" "}
          <span>قیمت کالا :</span>{" "}
          <b>
            {toToman(price) || "به زودی"} {price && "تومان"}
          </b>
        </p>
      </div>
    </div>
  );
};
