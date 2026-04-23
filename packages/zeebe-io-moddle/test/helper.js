import {
  readFileSync
} from 'node:fs';

import { BpmnModdle } from 'bpmn-moddle';

import ioModdle from 'zeebe-io-moddle/resources/ccon.json' with { type: 'json' };


export function readFile(filename) {
  return readFileSync(filename, { encoding: 'UTF-8' });
}

export function createModdle() {
  return new BpmnModdle({
    ccon: ioModdle
  });
}

/**
 * Normalizes whitespace in a (XML) string by removing newlines and leading spaces.
 *
 * @example
 * const result = normalizeWhitespace(`
 *   <bpmn:process id="Process_1">
 *     <bpmn:startEvent id="StartEvent_1" />
 *   </bpmn:process>
 * `);
 *
 * // result === '<bpmn:process id="Process_1"><bpmn:startEvent id="StartEvent_1" /></bpmn:process>'
 *
 * @param {string} str
 *
 * @returns {string}
 */
export function normalizeWhitespace(str) {
  return str.replace(/\n\s*/g, '');
}