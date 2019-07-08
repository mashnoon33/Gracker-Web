"use strict";

exports.__esModule = true;
exports.Sidebar = undefined;

var _extends =
	Object.assign ||
	function(target) {
		for (var i = 1; i < arguments.length; i++) {
			var source = arguments[i];
			for (var key in source) {
				if (Object.prototype.hasOwnProperty.call(source, key)) {
					target[key] = source[key];
				}
			}
		}
		return target;
	};

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _grommet = require("grommet");

var _Menu = require("grommet-icons/icons/Menu");

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

function _objectWithoutProperties(obj, keys) {
	var target = {};
	for (var i in obj) {
		if (keys.indexOf(i) >= 0) continue;
		if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
		target[i] = obj[i];
	}
	return target;
}

function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) {
		throw new TypeError("Cannot call a class as a function");
	}
}

function _possibleConstructorReturn(self, call) {
	if (!self) {
		throw new ReferenceError(
			"this hasn't been initialised - super() hasn't been called"
		);
	}
	return call && (typeof call === "object" || typeof call === "function")
		? call
		: self;
}

function _inherits(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) {
		throw new TypeError(
			"Super expression must either be null or a function, not " +
				typeof superClass
		);
	}
	subClass.prototype = Object.create(superClass && superClass.prototype, {
		constructor: {
			value: subClass,
			enumerable: false,
			writable: true,
			configurable: true,
		},
	});
	if (superClass)
		Object.setPrototypeOf
			? Object.setPrototypeOf(subClass, superClass)
			: (subClass.__proto__ = superClass);
}

var Sidebar = (function(_React$Component) {
	_inherits(Sidebar, _React$Component);

	function Sidebar() {
		var _temp, _this, _ret;

		_classCallCheck(this, Sidebar);

		for (
			var _len = arguments.length, args = Array(_len), _key = 0;
			_key < _len;
			_key++
		) {
			args[_key] = arguments[_key];
		}

		return (
			(_ret = ((_temp = ((_this = _possibleConstructorReturn(
				this,
				_React$Component.call.apply(_React$Component, [this].concat(args))
			)),
			_this)),
			(_this.state = {
				collapsed: undefined,
			}),
			_temp)),
			_possibleConstructorReturn(_this, _ret)
		);
	}

	Sidebar.prototype.render = function render() {
		var _this2 = this;

		var _props = this.props,
			title = _props.title,
			width = _props.width,
			children = _props.children,
			collapsible = _props.collapsible,
			headingProps = _props.headingProps,
			rest = _objectWithoutProperties(_props, [
				"title",
				"width",
				"children",
				"collapsible",
				"headingProps",
			]);

		var collapsed = this.state.collapsed;

		var BtnToggle = function BtnToggle(_ref) {
			var view = _ref.view;
			return collapsible
				? _react2.default.createElement(_grommet.Button, {
						icon: _react2.default.createElement(_Menu.Menu, null),
						onClick: function onClick() {
							return _this2.setState({ collapsed: view !== "collapsed" });
						},
				  })
				: null;
		};
		return _react2.default.createElement(
			_grommet.ResponsiveContext.Consumer,
			null,
			function(size) {
				return (collapsible && size === "small" && collapsed === undefined) ||
					collapsed === true
					? _react2.default.createElement(
							_grommet.Box,
							{ align: "start" },
							_react2.default.createElement(BtnToggle, { view: "collapsed" })
					  )
					: _react2.default.createElement(
							_grommet.Box,
							_extends(
								{
									width: "300px",
								},
								rest
							),
							_react2.default.createElement(
								_grommet.Box,
								{
									pad: { bottom: "small" },
									gap: "small",
									direction: "row",
									align: "center",
								},
								_react2.default.createElement(BtnToggle, { view: "expanded" }),
								title &&
									_react2.default.createElement(
										_grommet.Box,
										_extends(
											{
												flex: true,
												tag: "header",
											},
											headingProps
										),
										typeof title === "string"
											? _react2.default.createElement(
													_grommet.Heading,
													{ margin: "none", level: 3 },
													title
											  )
											: title
									)
							),
							children
					  );
			}
		);
	};

	return Sidebar;
})(_react2.default.Component);

var SidebarDoc = void 0;
if (process.env.NODE_ENV !== "production") {
	SidebarDoc = require("./doc").default(Sidebar); // eslint-disable-line global-require
}

var SidebaWrapper = SidebarDoc || Sidebar;

SidebaWrapper.defaultProps = {
	title: undefined,
	width: "300px",
	collapsible: true,
	isCollapsed: false,
};

SidebaWrapper.propTypes = {
	title: _propTypes2.default.node,
	width: _propTypes2.default.string,
	collapsible: _propTypes2.default.bool,
	isCollapsed: _propTypes2.default.bool,
};

exports.Sidebar = SidebaWrapper;
