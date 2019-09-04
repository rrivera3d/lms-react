import React, { Component } from 'react';
import JssProvider from 'react-jss/lib/JssProvider';
import { create } from 'jss';
import { 
  MuiThemeProvider,
  createMuiTheme, 
  createGenerateClassName, 
  jssPreset 
} from 'material-ui/styles';

import config from '../../config';

// INCLUDE CSS
import '../../styles/index.css';

if (document) {
  const styleNode = document.createComment("jss-insertion-point");
  document.head.insertBefore(styleNode, document.head.lastChild);
}

// DYNAMIC CSS STYLES GENERATION
const generateClassName = createGenerateClassName();
const jss = create(jssPreset());

// We define a custom insertion point that JSS will look for injecting the styles in the DOM.
jss.options.insertionPoint = 'jss-insertion-point';

export default function applyTheme(WrappedComponent) {

  return class extends Component {
    render() {
            
      const { session } = this.props;
      const company = session.company || process.env.REACT_APP_COMPANY;
      const theme = createMuiTheme(config.theme[company]);

      return (
        <JssProvider jss={jss} generateClassName={generateClassName}>
          <MuiThemeProvider theme={theme}>
            <WrappedComponent {...this.props} />
          </MuiThemeProvider> 
        </JssProvider>
      );
    }
  };

}

