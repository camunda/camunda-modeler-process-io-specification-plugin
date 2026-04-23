import {
  fireEvent,
  act
} from '@testing-library/preact';

import {
  query as domQuery,
  matches as domMatches
} from 'min-dom';


export function changeInput(input, value) {
  fireEvent.input(input, { target: { value } });
}

export function clickInput(input) {
  fireEvent.click(input);
}

export function mouseEnter(element) {
  fireEvent.mouseEnter(element);
}

export function findGroup(container, id) {
  return domQuery(`[data-group-id="group-${id}"`, container);
}

export function queryField(elementName, container) {
  const selector = `[name=${elementName}]`;

  return domQuery(selector, container);
}

export function findField(elementName, container) {
  const element = queryField(elementName, container);

  expect(element, `DOM element matching <[name=${elementName}]>`).to.exist;

  return element;
}

export async function setFieldValue(element, value) {

  // plain input
  if (domMatches(element, 'input')) {
    return changeInput(element, value);
  }

  // CodeMirror editor
  const editorElement = domQuery('[role="textbox"]', element);
  return setEditorValue(editorElement, value);
}

export function fieldValue(element) {

  // plain input
  if (domMatches(element, 'input')) {
    return element.value;
  }

  // CodeMirror editor
  if (domMatches(element, 'div')) {
    const editorElement = domQuery('[role="textbox"]', element);

    expect(editorElement, '[role="textbox"] element').to.exist;

    return editorElement.textContent;
  }

  throw new Error('unsupported element - ' + element);
}

export async function setEditorValue(editor, value) {
  await act(() => {
    editor.textContent = value;
  });

  // Requires 2 ticks to propagate the change to bpmn-js
  await act(() => {});
}