class Appender {
    constructor(msg) {
        this._message = msg;
    }

    appendHTML() {
        var doc = document.createElement('div').textContent = this._message;
        return doc;
    }
}

export {Appender};