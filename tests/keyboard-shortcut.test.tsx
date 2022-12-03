import * as React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { KeyboardShortcut } from '../src/index';

test('KeyboardShortcut fires correctly', async () => {
  const handler = jest.fn();
  render(<KeyboardShortcut combination="shift+w" onKeyDown={handler} />);

  const wrongEvent = {
    shiftKey: true,
    which: 69, // code for "e"
  };

  const shiftWEvent = {
    shiftKey: true,
    which: 87, // code for "w"
  };

  fireEvent.keyDown(document, wrongEvent);
  expect(handler).toHaveBeenCalledTimes(0); // should not have been called yet

  fireEvent.keyDown(document, shiftWEvent);
  expect(handler).toHaveBeenCalled();
  expect(handler).toHaveBeenCalledTimes(1);
});

test('KeyboardShortcut handles single keys', async () => {
  const handler = jest.fn();
  render(<KeyboardShortcut combination="esc" onKeyDown={handler} />);

  const escapeKeyEvent = {
    which: 27, // code for "Esc"
  };

  expect(handler).toHaveBeenCalledTimes(0); // should not have been called yet

  fireEvent.keyDown(document, escapeKeyEvent);
  expect(handler).toHaveBeenCalled();
  expect(handler).toHaveBeenCalledTimes(1);
});

test('KeyboardShortcut removes listeners when unmounted', async () => {
  const handler = jest.fn();
  const { unmount } = render(
    <KeyboardShortcut combination="shift+w" onKeyDown={handler} />
  );
  const shiftWEvent = {
    shiftKey: true,
    which: 87, // code for "w"
  };
  fireEvent.keyDown(document, shiftWEvent);
  expect(handler).toHaveBeenCalled();
  fireEvent.keyDown(document, shiftWEvent);
  expect(handler).toHaveBeenCalledTimes(2);

  unmount();
  fireEvent.keyDown(document, shiftWEvent);
  expect(handler).toHaveBeenCalledTimes(2);
});
