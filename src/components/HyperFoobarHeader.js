import HyperFoobarOverlayFactory from './HyperOverlay'
import HyperFoobarWidgetFactory from '../containers/HyperFoobarWidget'

export const HyperFoobarHeaderFactory = (React) => {
  const HyperFoobarOverlay = HyperFoobarOverlayFactory(React) // eslint-disable-line no-unused-vars
  const HyperFoobarWidget = HyperFoobarWidgetFactory(React) // eslint-disable-line no-unused-vars

  return ({ pluginConfig }) => (
    <header
      className='hyper-foobar hoverable'
      style={styles.headerStyle}
    >
      <HyperFoobarOverlay />
      <HyperFoobarWidget pluginConfig={pluginConfig} />
    </header>
  )
}

const styles = {
  'headerStyle': {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    opacity: '0.5',
    marginTop: 34
  }
}
