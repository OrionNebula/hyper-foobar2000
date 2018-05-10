const ArtFactory = React => ({ track }) => {
    return (
        <div>
            {track.cover ? <img src={track.cover} className='hyper-foobar-art' /> : ''}
        </div>
    );
};

export default ArtFactory;
