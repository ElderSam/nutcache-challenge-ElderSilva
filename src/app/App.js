import React from 'react';
import { makeStyles, CssBaseline, createMuiTheme, ThemeProvider } from '@material-ui/core';
import { createStore } from "redux";
import employeeReducer from "../reducers/employeeReducer";
import { Provider } from 'react-redux';

import SideMenu from "../components/SideMenu";
import Header from "../components/Header";

import Employees from "../pages/Employees/Employees";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#333996",
      light: '#3c44b126'
    },
    secondary: {
      main: "#f83245",
      light: '#f8324526'
    },
    background: {
      default: "#f4f5fd"
    },
  },
  overrides:{
    MuiAppBar:{
      root:{
        transform:'translateZ(0)'
      }
    }
  },
  props:{
    MuiIconButton:{
      disableRipple:true
    }
  }
})


const useStyles = makeStyles({
  appMain: {
    paddingLeft: '320px',
    width: '100%'
  }
})

function App() {
  const classes = useStyles();

  if (localStorage.getItem('employees') == null)
    localStorage.setItem('employees', JSON.stringify([]))
  let initialState = {
    currentIndex: -1,
    list: JSON.parse(localStorage.getItem('employees'))
  }
  const store = createStore(employeeReducer, initialState)


  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <SideMenu />
        <div className={classes.appMain}>
          <Header />
          
          <Employees />
        </div>
        <CssBaseline />
      </ThemeProvider>
    </Provider>
  );
}

export default App;