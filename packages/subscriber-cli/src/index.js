#!/usr/bin/env node
/* @flow */
/* @jsx h */
import { h, render } from 'ink';
import mri from 'mri';

import App from './App';
import nonTTY from './nonTTY';

const args = mri(process.argv.slice(2), {
  alias: { x: 'debug' },
  default: { debug: false, retry: false },
});

const props = {
  url: args._[0],
  lastEventId: args.last,
  burstTime: args.burstTime,
  burstCount: args.burstCount,
  debug: args.debug,
  retry: args.retry,
};

// $FlowFixMe: see https://nodejs.org/api/tty.html
if (Boolean(process.stdout.isTTY)) {
  render(<App {...props} />);
} else {
  nonTTY(props);
}
