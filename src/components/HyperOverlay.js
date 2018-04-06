const HyperFoobarOverlayFactory = React => () => <span className='hyper-foobar-overlay' style={styles.overlayStyle} />

const styles = {
    overlayStyle: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        opacity: 0.07
    }
};

export default HyperFoobarOverlayFactory;