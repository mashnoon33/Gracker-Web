'use strict';

exports.__esModule = true;

var _reactDesc = require('react-desc');

exports.default = function (Element) {
  var DocumentedElement = (0, _reactDesc.describe)(Element).description('Collapsible side bar component.').usage('$ npm install grommet-controls\n\n    import { Sidebar } from \'grommet-controls\';\n\n    <Sidebar title=\'My title\'>\n\n        ...\n    </Sidebar>\n');

  DocumentedElement.propTypes = {
    title: _reactDesc.PropTypes.node.description('Title string or any react node.'),
    width: _reactDesc.PropTypes.string.description('The width of the side bar.').defaultValue('medium'),
    collapsible: _reactDesc.PropTypes.bool.description('Whether the sidebar can be collapsed.').defaultValue(true)
  };

  return DocumentedElement;
};