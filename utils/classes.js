const classes = {
  section: {
    marginTop: 1,
    marginBottom: 1,
  },
  smallText: {
    fontSize: '15px',
  },
  main: {
    marginTop: 2,
    minHeight: '80vh',
  },
  footer: {
    marginTop: 1,
    textAlign: 'center',
  },
  appbar: {
    backgroundColor: '#203040',
    '& a': {
      color: '#fff',
      marginLeft: 1,
    },
  },
  toolbar: {
    justifyContent: 'space-between',
  },
  brand: {
    fontWeight: 'bold',
    fontSize: '1.5rem',
  },
  panier: {
    marginBottom: '10px',
    textAlign: 'left',
    marginRight: 0,
    PaddingRight: 0,
  },
  sort: {
    marginRight: 1,
  },
  navbarButton: {
    marginBottom: 1,
  },
  visible: {
    display: 'initial',
  },
  hidden: {
    display: 'hidden ',
  },
  searchForm: {
    border: '1px solid #ffffff',
    backgroundColor: '#ffffff',
    borderRaduis: 1,
    textAlign: 'left',
    display: 'flex',
    marginRight: 1,
    width: '100%',
  },
  searchInput: {
    paddingLeft: 1,
    color: '#000000',
    '& ::placeholder': {
      color: '#606060',
    },
  },
  searchButton: {
    backgroundColor: '#f8c0400',
    padding: 1,
    borderRaduis: '0 5px 5px 0',
    '& span': {
      color: '#000000',
    },
  },
};

export default classes;
