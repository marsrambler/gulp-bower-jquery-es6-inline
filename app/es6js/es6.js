import $ from '../../bower_components/jquery/dist/jquery.js'
import {Appender} from './appender.js'

class Entry {
    constructor() {
        this.appender = new Appender('From-Entry')
    }

    execTask() {
        var subDoc = this.appender.appendHTML();
        $("#root").append(subDoc);
    }
};

var entryInstance = new Entry();
entryInstance.execTask();