const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

const source = fs.readFileSync(path.join(__dirname, '..', 'midi-hotkeys.js'), 'utf8');

test('the standalone browser script parses', () => {
    assert.doesNotThrow(() => new vm.Script(source));
});

for (const layout of [1, 2, 3, 4]) {
    test(`layout ${layout} loads WebMidi and attaches listeners to every input`, () => {
        const scripts = [];
        const subscriptions = [[], []];
        const connectionEvents = [];
        let enableCalls = 0;
        const context = vm.createContext({
            console: { log() {} },
            document: {
                createElement(tag) {
                    assert.equal(tag, 'script');
                    return {};
                },
                head: { appendChild(script) { scripts.push(script); } }
            },
            WebMidi: {
                enable(callback) {
                    enableCalls++;
                    callback(null);
                },
                addListener(event, callback) {
                    connectionEvents.push(event);
                    assert.equal(typeof callback, 'function');
                },
                inputs: subscriptions.map(listeners => ({
                    addListener(event, channel, callback) {
                        listeners.push({ event, channel, callback });
                    }
                }))
            }
        });

        vm.runInContext(source, context);
        assert.equal(context.session.midiHotkeys, 1);
        assert.equal(scripts.length, 1);
        assert.equal(scripts[0].src, './thirdparty/webmidi.js');
        assert.equal(enableCalls, 0);

        context.session.midiHotkeys = layout;
        scripts[0].onload();

        assert.equal(enableCalls, 1);
        assert.deepEqual(connectionEvents, ['connected', 'disconnected']);
        for (const listeners of subscriptions) {
            assert.equal(listeners.length, 1);
            assert.equal(listeners[0].event, layout === 4 ? 'controlchange' : 'noteon');
            assert.equal(listeners[0].channel, 'all');
            assert.equal(typeof listeners[0].callback, 'function');
        }
    });
}
