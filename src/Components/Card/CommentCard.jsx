import { makeStyles } from "@material-ui/core/styles";
import Link from "next/link";
import clsx from "clsx";

import ReplayIcon from "Assets/img/icons/replay.svg";
import {dateFA} from "Utils/helperFunction"
import useWindowDimensions from "hooks/useWindowDimensions";
const useStyles = makeStyles(theme => ({
  commentCard: {
    marginBottom: 32,
    paddingBottom: 22,
    borderBottom:({isLast})=>isLast?"none": "1px solid #EBEBEB",
    "@media(max-width: 960px)": {
      marginBottom: 15,

    },
    "& > div": {
      display: "flex",
      alignItems: "center",
      gap: 12,
      marginBottom: 22,
      "& > div": {
        display: "flex",
        flexDirection: "column",
        "& > span": {
          color: "#616161",
          fontWeight: 500,
          fontSize: 12,
        },
        "& > strong": {
          color: "#333333",
          fontWeight: 500,
          fontSize: 14,
        },
      },
    },
    "& > p": {
      marginLeft: 24,
    },
  },
  answerWrapper: {
    display: "flex",
    alignItems: "center",
    gap: 12,

    "& > div": {
      background: "#FAFAFA",
      borderRadius: 8,
      width: "100%",
      border: "none",
      marginTop: 24,
    },
  },
}));

export default function CommentCard({ answer ,user,content,date="2022/02/02", isLast,reply}) {
  const classes = useStyles({isLast});
  const {width}=useWindowDimensions()
  return (
    <div className={classes.commentCard}>
      <div>
        <img src="/images/default-avatar.png" />
        <div>
          <strong>{`${user?.first_name} ${user?.last_name}`}</strong>
          <span>{dateFA(date) }</span>
        </div>
      </div>
      <p>{content}</p>
      {answer && (
        <div className={classes.answerWrapper}>
         {width>900&& <ReplayIcon />}
          <div className={classes.commentCard}>
            <div>
              <img src="/images/default-avatar.png" />
              <div>
                <strong>{reply?.user?.first_name}</strong>
                <span>{dateFA(reply?.created_at)}</span>
              </div>
            </div>
            <p>{reply?.content}</p>
          </div>
        </div>
      )}
    </div>
  );
}
