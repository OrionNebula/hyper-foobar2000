import HyperFoobarOverlayFactory from './HyperOverlay';
import HyperFoobarWidgetFactory from '../containers/HyperFoobarWidget';

export const HyperFoobarFooterFactory = React => {
    const HyperFoobarOverlay = HyperFoobarOverlayFactory(React);
    const HyperFoobarWidget = HyperFoobarWidgetFactory(React);

    return ({ pluginConfig }) => (
        <footer
            className='hyper-foobar hoverable'
            style={styles.footerStyle}
        >
            <HyperFoobarOverlay />
            <HyperFoobarWidget pluginConfig={pluginConfig} />
        </footer>
    );
};

const styles = {
    'footerStyle': {
      position: 'absolute',
      right: 0,
      bottom: 0,
      left: 0,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      opacity: '0.5'
    }
};