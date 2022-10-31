import PropTypes from 'prop-types'
import React from 'react'
import { Modal as AntModal } from 'antd'
// import { ModalCloseIcon } from 'SVG/Icons'
import {
  makeStyles,
} from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  root: {
    width: '600px !important',
    
    '& .ant-modal-content': {
      padding: '24px',
      borderRadius: '10px',
      '@media only screen and (max-width: 1200px)': {
        padding: '0',
        marginBottom:80
      },
      '& > .ant-modal-close': {
        top: 24,
        right: 24,
        '@media only screen and (max-width: 900px)': {
          top: 5,
          right:5
        },
      },
      '& .ant-modal-title': {
        fontFamily: 'Montserrat',
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: 18,
        lineHeight: '20px',
        color: theme.color.primary,
      },
    },
  },
}))

const Modal = ({ isVisible, children, handleCancel, title = '', footer = null }) => {
  const classes = useStyles()
  return (
    <AntModal
      className={classes.root}
      title={title}
      visible={isVisible}
      // closeIcon={<ModalCloseIcon />}
      onCancel={handleCancel}
      footer={footer}
    >
      {children}
    </AntModal>
  )
}

Modal.propTypes = {
  children: PropTypes.any,
  handleCancel: PropTypes.func.isRequired,
  isVisible: PropTypes.bool.isRequired,
  title: PropTypes.string,
}

export default Modal
