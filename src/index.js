import React from 'react';
import { render } from 'react-dom';
import MultiselectTypeahead from './MultiselectTypeahead'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {createMuiTheme} from 'material-ui/styles';
import purple from 'material-ui/colors/purple';
import green from 'material-ui/colors/green';

const theme = createMuiTheme({
  palette: {
    primary: purple,
    secondary: green,
  },
  status: {
    danger: 'orange',
  },
});

const App = () => (
  <MuiThemeProvider theme={theme}>
  <div>
    <MultiselectTypeahead />
  </div>
  </MuiThemeProvider>
);

render(<App />, document.getElementById('root'));
