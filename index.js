const get = require('lodash.get');
const { getThemeCssByName } = require('./dist/utils/ThemeManager');
const { HyperFoobarHeaderFactory } = require('./dist/components/HyperFoobarHeader');
const { HyperFoobarFooterFactory } = require('./dist/components/HyperFoobarFooter');

exports.decorateConfig = config => {
    const hyperFoobar = Object.assign({
        position: 'bottom',
        margin: 'default',
        controlsPosition: 'default',
        showArt: true,
        port: 8888
    }, config.hyperFoobar);

    const { position, margin } = hyperFoobar;

    let marginValue = (position === 'top' ? 34 : 0);
    switch (margin) {
        case 'default':
            marginValue += 30;
            break;
        case 'double':
            marginValue += 60;
            break;
        default:
            marginValue = margin;
    }

    return Object.assign({ hyperFoobar }, config, {
        css: `
            ${config.css || ''}

            .terms_terms {
                margin-${position}: ${marginValue}px;
            }

            .hyper-foobar.hoverable:hover,
            .hyper-foobar .hoverable:hover {
                opacity: 1 !important;
            }
        `
    });
};

exports.reduceUI = (state, {type, config}) => {
    switch (type) {
        case 'CONFIG_LOAD':
        case 'CONFIG_RELOAD':
            return state.set('hyperFoobar', config.hyperFoobar);
    }

    return state;
};

exports.mapHyperState = ({ ui : { hyperFoobar } }, map) => Object.assign({}, map, {
    hyperFoobar: Object.assign({}, hyperFoobar),
    customCSS: `${map.customCSS || ''} ${getThemeCssByName(get(hyperFoobar, 'theme', 'default'), hyperFoobar)}`
});

exports.decorateHyper = (Hyper, { React }) => {
    const HyperFoobarHeader = HyperFoobarFooterFactory(React);
    const HyperFoobarFooter = HyperFoobarFooterFactory(React);

    return class extends React.PureComponent {
        render () {
            const {
                customInnerChildren: existingInnerChildren,
                hyperFoobar: pluginConfig
            } = this.props;

            let customInnerChildren = existingInnerChildren ? existingInnerChildren instanceof Array ? existingInnerChildren : [existingInnerChildren] : [];

            const position = get(pluginConfig, 'position', 'bottom');
            if (position === 'top') {
                customInnerChildren = [].concat(React.createElement(HyperFoobarHeader, { pluginConfig }), customInnerChildren);
            } else if (position === 'bottom') {
                customInnerChildren = [].concat(customInnerChildren, React.createElement(HyperFoobarFooter, { pluginConfig }));
            }

            return React.createElement(Hyper, Object.assign({}, this.props, { customInnerChildren }));
        }
    }
};