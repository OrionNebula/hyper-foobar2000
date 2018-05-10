import winax from 'winax'
import tasklist from 'tasklist'
import path from 'path'
import fs from 'fs'

class FoobarManager {
    constructor () {
    }

    initialCheck() {
        return new Promise((f, r) => {
            tasklist({filter: [ 'Imagename eq foobar2000.exe' ]}).then(tasks => {
                var res = tasks.length > 0;
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
            let coverDir = path.dirname(this.foobar.FormatTitle('%path%'));
            let coverName = fs.readdirSync(coverDir).filter(x => x.toLowerCase().startsWith('cover') || x.toLowerCase().startsWith('folder') || x.toLowerCase().startsWith('front'))[0];
            return {
                name: this.foobar.FormatTitle('%title%'),
                artist: this.foobar.FormatTitle('%artist%'),
                cover: coverName ? path.format({ 
                    dir: coverDir,
                    name: coverName
                }) : undefined
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