export const dynamicInfo = {
  first_name: {
    placeholder: "نام خود را وارد کنید",
    label: "نام",
    span: 24,
    rules: {},
  },
  last_name: {
    placeholder: "نام خانوادگی را وارد کنید",
    label: "نام خانوادگی",
    span: 24,
    rules: {},
  },
  legal_info_melli_code: {
    placeholder: "شماره ملی خود را وارد کنید",
    label: "کدملی",
    span: 24,
    rules: {
      type: "number",
      message: "کدملی معتبر وارد کنید",
      transform: value => Number(value),
    },
  },
  state: {
    placeholder: "استان خود را وارد کنید",
    label: "استان",
    span: 24,
    rules: {},
  },
  city: {
    placeholder: "شهر خود را وارد کنید",
    label: "شهر",
    span: 24,
    rules: {},
  },
  address: {
    placeholder: "آدرس خود را وارد کنید",
    label: "آدرس",
    span: 24,
    rules: {},
  },
  email: {
    placeholder: "ایمیل خود را وارد کنید",
    label: "ایمیل",
    span: 24,
    rules: {
        type: "email",
        message: "ایمیل معتبر وارد کنید",
      },
  },
  legal_info_economical_code: {
    placeholder: "کد اقتصادی  خود را وارد کنید",
    label: "کد اقتصادی",
    span: 24,
    rules: {},
  },
  legal_info_registration_number: {
    placeholder: "شماره ثبت خود را وارد کنید",
    label: "شماره ثبت",
    span: 24,
    rules: {
      type: "number",
      message: "شماره ثبت معتبر وارد کنید",
      transform: value => Number(value),
    },
  },
  legal_info_company_name: {
    placeholder: "نام شرکت خود را وارد کنید",
    label: "نام شرکت",
    span: 24,
    rules: {},
  },
  legal_info_state: {
    placeholder: "استان خود را وارد کنید",
    label: "استان",
    span: 24,
    rules: {},
  },
  legal_info_city: {
    placeholder: "شهر خود را وارد کنید",
    label: "شهر",
    span: 24,
    rules: {},
  },
  legal_info_address: {
    placeholder: "آدرس خود را وارد کنید",
    label: "آدرس",
    span: 24,
    rules: {},
  },
  legal_info_postal_code: {
    placeholder: "کد پستی خود را وارد کنید",
    label: "کد پستی",
    span: 24,
    rules: {},
  },
  guild_identifier: {
    placeholder: "شماره صنفی خود را وارد کنید",
    label: "شماره صنفی",
    span: 24,
    rules: {
      type: "number",
      message: "شماره صنفی معتبر وارد کنید",
      transform: value => Number(value),
    },
  },
  store_name: {
    placeholder: "نام فروشگاه خود را وارد کنید",
    label: "نام فروشگاه",
    span: 24,
    rules: {},
  },
  legal_info_phone_number:{
    placeholder: "تلفن شرکت را وارد کنید",
    label: "تلفن شرکت (به همراه کد شهر)",
    span: 24,
    rules: {
      type: "number",
      message: "شماره تلفن معتبر وارد کنید",
      transform: value => Number(value),
    },
  }
};
