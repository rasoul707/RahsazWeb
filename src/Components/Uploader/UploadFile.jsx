import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Spin, Upload } from "antd";
import clsx from "clsx";

// Assets
import UploadImageIcon from "Assets/img/icons/upload-image.svg";

// Services
// import { uploadFileInLibraryApi } from "Services";

const useStyles = makeStyles(theme => ({
  wrapper: {
    height: ({ fixHeight }) => fixHeight && "100%",
    "& .ant-upload-drag": {
      padding: ({ forInput }) => (forInput ? 12 : 42),
    },
    "& .ant-spin-nested-loading": {
      height: ({ fixHeight }) => fixHeight && "100%",
    },
    "& .ant-spin-container": {
      height: ({ fixHeight }) => fixHeight && "100%",
    },
    "& .ant-upload": {
      height: ({ fixHeight }) => fixHeight && "100%",
    },
  },
  libraryButton: {
    display: "block",
    margin: "0px auto",
    padding: "5px 0",
  },
}));
const { Dragger } = Upload;
export default function UploadFile({
  text,
  fixHeight,
  setFile,
  forInput,
  showLibraryButton = true,
  isMulti = false,
}) {
  const classes = useStyles({ forInput, fixHeight });

  const [loading, setLoading] = useState(false);

  const initialPage = async () => {
    setLoading(true);
    // const data = await initialDashboardPageApi();
    setLoading(false);
  };

  useEffect(() => {
    // get data for initial page
    initialPage();
  }, []);

  const handleOnChange = info => {
    const file = info.file;
    let formData = new FormData();
    formData.append("image", file);
    // uploadFileInLibraryApi(formData)
    //   .then(data => {
    //     if (setFile) setFile({ id: data?.id, path: data?.path });
    //     info.onSuccess();
    //   })
    //   .catch(() => {
    //     info.onError();
    //   });
  };

  const openLibrary = e => {
    e.stopPropagation();
    setShowLibraryModal(true);
  };

  return (
    <>
      <div className={classes.wrapper}>
        <Spin spinning={loading}>
          <Dragger
            multiple={false}
            customRequest={handleOnChange}
            showUploadList={{ showRemoveIcon: false }}
            accept="image/*"
          >
            <UploadImageIcon />
            <p>{text || "فایل خود را انتخاب کنید"}</p>
          </Dragger>
        </Spin>
      </div>
    </>
  );
}
