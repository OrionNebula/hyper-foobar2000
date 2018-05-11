import request from 'request'
import path from 'path'
import url from 'url'

class FoobarManager {
    constructor (hyperFoobar) {
        this.hyperFoobar = hyperFoobar;
    }

    getState() {
        const { hyperFoobar } = this;

        return new Promise((fulfil, reject) => {
            var options = {
                method: 'GET',
                url: `http://localhost:${hyperFoobar.port}/ajquery/`,
                qs: { param3: 'js/state.json' },
                headers: { 'cache-control': 'no-cache' },
                json: true
            };

            request(options, function (error, response, body) {
                if (error) reject(error);

                var track = body.playlist[Number(body.playingItem) - (Number(body.playlistPage) - 1) * Number(body.playlistItemsPerPage)];
                fulfil({ 
                    state: (body.isPaused == 1 && 'paused') || (body.isPlaying == 1 && 'playing') || 'stopped',
                    track: (track && {
                        name: track.t,
                        artist: track.a,
                        cover: body.albumArt.length > 0 ? url.resolve(`http://localhost:${hyperFoobar.port}/ajquery/`, body.albumArt) : undefined
                    }) || {}
                });
            });
        });
    }

    togglePlayPause () {
        var tThis = this;
        const { hyperFoobar, getState } = this;

        return new Promise((outerFulfil, outerReject) => {
            var options = {
                method: 'GET',
                url: `http://localhost:${hyperFoobar.port}/ajquery/`,
                qs: { cmd: 'PlayOrPause', param3: 'NoResponse' },
                headers: { 'cache-control': 'no-cache' },
            };

            request(options, (error, response, body) => {
                if(error) reject(error);

                return getState.call(tThis);
            });
        });
    }

    previousTrack () {
        var tThis = this;
        const { hyperFoobar, getState } = this;

        return new Promise((outerFulfil, outerReject) => {
            var options = {
                method: 'GET',
                url: `http://localhost:${hyperFoobar.port}/ajquery/`,
                qs: { cmd: 'StartPrevious', param3: 'NoResponse' },
                headers: { 'cache-control': 'no-cache' },
            };

            request(options, (error, response, body) => {
                if(error) reject(error);

                return getState.call(tThis);
            });
        });
    }

    nextTrack () {
        var tThis = this;
        const { hyperFoobar, getState } = this;

        return new Promise((outerFulfil, outerReject) => {
            var options = {
                method: 'GET',
                url: `http://localhost:${hyperFoobar.port}/ajquery/`,
                qs: { cmd: 'StartNext', param3: 'NoResponse' },
                headers: { 'cache-control': 'no-cache' },
            };

            request(options, (error, response, body) => {
                if(error) reject(error);

                return getState.call(tThis);
            });
        });
    }

    getTrack () {
        return this.getState().then(x => x.track );
    }
}

export default FoobarManager;