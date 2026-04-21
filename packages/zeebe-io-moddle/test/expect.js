import {
  use as chaiUse
} from 'chai';

import { jsonEqualMatchers } from './matchers.js';

export {
  expect
} from 'chai';

chaiUse(jsonEqualMatchers);
