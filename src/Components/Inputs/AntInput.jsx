import { makeStyles } from '@material-ui/core';
import { Input } from 'antd';
import React from 'react';

const useStyles = makeStyles(theme => ({
    root: {
      height:"44px",
      borderRadius:"12px",
      borderColor:theme.color.lightDark
    },
  }));

const AntInput = ({className,...props}) => {
  const classes = useStyles();
  return <Input className={`${classes.root} ${className}`} {...props} />;
};

export const AntPass=({className,...props})=>{
  const classes = useStyles();
  return <Input.Password className={`${classes.root} ${className}`} {...props} />;
}

export default AntInput;
