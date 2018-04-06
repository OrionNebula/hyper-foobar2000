import winax from 'winax'
import tasklist from 'tasklist'

class FoobarManager {
    constructor () {
    }

    initialCheck() {
        return new Promise((f, r) => {
            tasklist().then(tasks => {
                var res = tasks.filter(x => x.imageName === 'foobar2000.exe').length > 0;
                if(res)
                    this.foobar = winax.Object('Foobar2000.Application.0.7').Playback;
                f(res);
            });
        });
    }

    isRunning() {
        return new Promise((f, r) => {
            f(!!this.foobar);
        });
    }

    connect() {
        if(!this.foobar)
            this.foobar = winax.Object('Foobar2000.Application.0.7').Playback;
        return this.getState();
    }

    getState() {
        return new Promise((f,r) => {
            if(!this.foobar) {r(); return; }
            f(this.generateState());
        });
    }

    togglePlayPause () {
        return new Promise((f, r) => {
            if(!this.foobar) {r(); return; }
            if(!this.foobar.isPaused && !this.foobar.isPlaying)
                this.foobar.Start(false);
            else
                this.foobar.Pause();
            f(this.generateTrack());
        });
    }

    previousTrack () {
        return new Promise((f, r) => {
            if(!this.foobar) {r(); return; }
            this.foobar.Previous();
            f(this.generateTrack());
        });
    }

    nextTrack () {
        return new Promise((f, r) => {
            if(!this.foobar) {r(); return; }
            this.foobar.Next();
            f(this.generateTrack());
        });
    }

    getTrack () {
        return new Promise((f, r) => {
            if(!this.foobar) {r(); return; }
            f(this.generateTrack());
        });
    }

    generateTrack() {
        try {
            return {
                name: this.foobar.FormatTitle('%title%'),
                artist: this.foobar.FormatTitle('%artist%')
            };
        } catch(err) {
            this.foobar = null;
            throw err;
        }
    }

    generateState() {
        try {
            return { state: (this.foobar.isPaused && 'paused') || (this.foobar.isPlaying && 'playing') || ('stopped') };
        } catch (err) {
            this.foobar = null;
            throw err;
        }
    }
}

export default FoobarManager;