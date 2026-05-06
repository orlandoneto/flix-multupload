export const selectStyles = {
  control: (provided: any) => ({
    ...provided,
    border: '1px solid #fff',
    borderColor: '#fff',
    backgroundColor: '#161e24',
    fontSize: '14px',
    color: '#f3f3f3',
    boxShadow: 'none',
    '&:hover': {
      border: '1px solid #fff',
      borderColor: '#fff',
    },
  }),
  menu: (provided: any) => ({
    ...provided,
    backgroundColor: '#161e24',
    color: '#f3f3f3',
    fontSize: '14px',
    zIndex: 9999,
  }),
  menuList: (provided: any) => ({
    ...provided,
    backgroundColor: '#161e24',
    color: '#f3f3f3',
    paddingTop: 0,
    paddingBottom: 0,
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isFocused ? '#6e7175' : '#161e24',
    color: state.isFocused ? '#ffffff' : '#f3f3f3',
    cursor: 'pointer',
    '&:active': {
      backgroundColor: '#4a4d50',
    },
  }),
  input: (provided: any) => ({
    ...provided,
    color: '#f3f3f3',
  }),
  placeholder: (provided: any) => ({
    ...provided,
    color: '#6e7175',
  }),
  singleValue: (provided: any) => ({
    ...provided,
    color: '#f3f3f3',
  }),
  indicatorsContainer: (provided: any) => ({
    ...provided,
    color: '#f3f3f3',
  }),
  menuPortal: (base: any) => ({ ...base, zIndex: 9999 }),
};
