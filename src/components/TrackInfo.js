const TrackInfoFactory = React => ({ track }) => {
    return (
        <div
            className='hyper-foobar-track'
        >
            <b>{track.name}</b> {track.artist ? <span> by <b>{track.artist}</b></span> : ''}
        </div>
    );
};

export default TrackInfoFactory;