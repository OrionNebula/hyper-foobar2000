import isEqual from 'lodash.isequal'
import IconFactory from '../components/Icon';
import TrackInfoFactory from '../components/TrackInfo';
import FoobarManager from '../lib/FoobarManager';
import ArtFactory from '../components/Art';


const HyperFoobarWidgetFactory = React => {
    const { Component } = React;

    const Icon = IconFactory(React);
    const TrackInfo = TrackInfoFactory(React);
    const Art = ArtFactory(React);

    const skipActions = {
        previous: 'PREV',
        next: 'NEXT'
    };

    const initialState = {
        isRunning: false,
        isPlaying: false,
        track: {
            name: '',
            artist: ''
        }
    };

    return class extends Component {
        constructor (props) {
            super(props);

            this.state = {
                isRunning: false,
                isPlaying: false,
                track: {
                    name: '',
                    artist: ''
                }
            };

            this.foobarManager = new FoobarManager();
        }

        performSoundCheck() {

            const { foobarManager } = this;

            if(!this._reactInternalInstance && !this._reactInternalFiber) {
                if(this.soundCheck) {
                    clearInterval(this.soundCheck);
                }

                return;
            }

            foobarManager.isRunning()
                .then(isRunning => {
                    this.setState({ isRunning });

                    if(isRunning) {
                        foobarManager.connect().then(({state}) => {
                                this.setState({ isPlaying: (state === 'playing') })

                                return foobarManager.getTrack();
                            })
                            .then(track => {
                                this.setState({track});
                            })
                            .catch(() => {
                                this.setState({ ...initialState });
                            });
                    } else {
                        this.setState({ ...initialState });
                    }
                }).catch(() => {
                    this.setState({ ...initialState });
                });
        }

        togglePlayState () {
            const { foobarManager, state: { isRunning }} = this;

            if (isRunning) {
                foobarManager.togglePlayPause()
                    .then(foobarState => {
                        this.setState({isPlaying: (foobarState.state === 'playing')});
                    })
                    .catch(() => {
                        this.setState({ ...initialState });
                    });
            }
        }

        _getSkipPromise (skipAction) {
            const { foobarManager } = this;
            const { previous, next } = skipActions;

            switch (skipAction) {
                case previous:
                    return foobarManager.previousTrack();
                case next:
                    return foobarManager.nextTrack();
            }
        }

        skipTo (skipAction) {
            const { isRunning } = this.state;

            if (isRunning) {
                this._getSkipPromise(skipAction)
                    .then(track => this.setState({ track }))
                    .catch(() => this.setState({ ...initialState }));
            }
        }

        componentDidMount () {
            if (!this.soundCheck) {
                this.soundCheck = setInterval(() => this.performSoundCheck(), 500);
            }

            this.foobarManager.initialCheck().then(isRunning => this.setState({ isRunning }));

            this.performSoundCheck();
        }

        componentWillUnmount () {
            if(this.soundCheck) {
                clearInterval(this.soundCheck);
            }
        }

        shouldComponentUpdate (nextProps, nextState) {
            return !isEqual(nextState, this.state);
        }

        renderControls () {
            const { foobarManager } = this;

            const {
                previous,
                next
            } = skipActions;

            const {
                controlsContainerStyle,
                leftControlsContainerStyle,
                rightControlsContainerStyle,
                iconStyle,
                playIconStyle
            } = styles;

            const {
                isRunning,
                isPlaying
            } = this.state;

            const {
                pluginConfig: {
                    controlsPosition,
                    showArt
                }
            } = this.props;

            if (isRunning) {
                let controlsStyle = controlsContainerStyle;

                switch (controlsPosition) {
                    case "left":
                        controlsStyle = { ...controlsContainerStyle, ...leftControlsContainerStyle };
                        break;
                    case 'right':
                        controlsStyle = { ...controlsContainerStyle, ...rightControlsContainerStyle };
                        break;
                    default:
                        controlsStyle = { ...controlsContainerStyle };
                }

                return (
                    <div style={controlsStyle}>
                        <Icon
                            iconName='previous'
                            onClick={() => this.skipTo(previous)}
                            style={iconStyle}
                        />

                        <Icon
                            iconName={isPlaying ? 'pause' : 'play'}
                            onClick={() => this.togglePlayState()}
                            style={{ ...iconStyle, ...playIconStyle }}
                        />

                        <Icon
                            iconName='next'
                            onClick={() => this.skipTo(next)}
                            style={iconStyle}
                        />
                    </div>
                );
            }

            return (
                <Icon
                    iconName='foobar'
                    onClick={() => foobarManager.connect().then(state => this.setState({ isRunning: true }, () => this.setState({ ...initialState })))}
                    style={iconStyle}
                />
            );
        }

        render () {
            const {
              track
            } = this.state
      
            const {
              widgetStyle
            } = styles

            return (
              <span>
                {this.props.pluginConfig.showArt ? <Art track={track} /> : ''}
                <div style={widgetStyle}>
                    {this.renderControls()}
        
                    <TrackInfo
                    track={track}
                    />
                </div>
              </span>
            )
          }
    };
};

const styles = {
    'widgetStyle': {
      height: 30,
      fontSize: 12,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'
    },
    'controlsContainerStyle': {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      marginRight: 6
    },
    'leftControlsContainerStyle': {
      position: 'absolute',
      left: 14,
      marginRight: 0
    },
    'rightControlsContainerStyle': {
      position: 'absolute',
      right: 14,
      marginRight: 0
    },
    'iconStyle': {
      height: 16,
      width: 17
    },
    'playIconStyle': {
      marginLeft: 6,
      marginRight: 6
    }
  };

  export default HyperFoobarWidgetFactory;