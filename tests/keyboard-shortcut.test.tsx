import * as React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { KeyboardShortcut } from '../src/index';

const keyboardEvents = {
  esc: { which: 27 },
  w: { which: 87 },
  'shift+w': { shiftKey: true, which: 87 },
  'shift+e': { shiftKey: true, which: 69 },
};

describe('KeyboardShortcut', () => {
  test('fires callbacks correctly for key combinations', async () => {
    const handler = jest.fn();
    render(<KeyboardShortcut combination="shift+w" onKeyDown={handler} />);

    const wrongEvent = keyboardEvents['shift+e'];
    const expectedEvent = keyboardEvents['shift+w'];

    fireEvent.keyDown(document, wrongEvent);
    expect(handler).toHaveBeenCalledTimes(0); // should not have been called yet

    fireEvent.keyDown(document, expectedEvent);
    expect(handler).toHaveBeenCalled();
    expect(handler).toHaveBeenCalledTimes(1);
  });

  test('handles single key combinations', async () => {
    const handlerEsc = jest.fn();
    const handlerW = jest.fn();
    render(<KeyboardShortcut combination="esc" onKeyDown={handlerEsc} />);
    render(<KeyboardShortcut combination="w" onKeyDown={handlerW} />);

    // const escapeKeyEvent = {
    //   which: 27, // code for "Esc"
    // };
    // const wKeyEvent = {
    //   which: 27, // code for "Esc"
    // };

    expect(handlerEsc).toHaveBeenCalledTimes(0); // should not have been called yet
    expect(handlerW).toHaveBeenCalledTimes(0); // should not have been called yet

    fireEvent.keyDown(document, keyboardEvents.esc);
    expect(handlerEsc).toHaveBeenCalled();
    expect(handlerEsc).toHaveBeenCalledTimes(1);
    expect(handlerW).toHaveBeenCalledTimes(0); // should not have been called yet

    fireEvent.keyDown(document, keyboardEvents.w);
    expect(handlerW).toHaveBeenCalled();
    expect(handlerW).toHaveBeenCalledTimes(1);
  });

  test('removes listeners when unmounted', async () => {
    const handler = jest.fn();
    const { unmount } = render(
      <KeyboardShortcut combination="shift+w" onKeyDown={handler} />
    );
    const keyboardEvent = keyboardEvents['shift+w'];

    fireEvent.keyDown(document, keyboardEvent);
    expect(handler).toHaveBeenCalled();
    fireEvent.keyDown(document, keyboardEvent);
    expect(handler).toHaveBeenCalledTimes(2);

    unmount();
    fireEvent.keyDown(document, keyboardEvent);
    expect(handler).toHaveBeenCalledTimes(2);
  });
});
