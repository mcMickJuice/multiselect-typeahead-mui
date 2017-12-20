import React from "react";
import { render } from "react-dom";
import MultiselectTypeahead from "./MultiselectTypeahead";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { ListItem } from "material-ui/List";
import DropdownList from "./DropdownList";
import { createMuiTheme } from "material-ui/styles";
import purple from "material-ui/colors/purple";
import green from "material-ui/colors/green";

const theme = createMuiTheme({
  palette: {
    primary: purple,
    secondary: green
  },
  status: {
    danger: "orange"
  }
});

const App = () => (
  <MuiThemeProvider theme={theme}>
    <div>
      <div>
        <h3>MultiselectTypeahead</h3>
        <MultiselectTypeahead />
      </div>
      <div>
        <h3>Dropdown List</h3>
        <DropdownList>
          <ListItem button divider>
            Hello
          </ListItem>
          <ListItem button divider>
            Hi
          </ListItem>
          <ListItem button divider>
            Hey there
          </ListItem>
        </DropdownList>
      </div>
    </div>
  </MuiThemeProvider>
);

render(<App />, document.getElementById("root"));
