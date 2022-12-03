import { useEffect, useRef } from 'react';
import { isHotkey } from 'is-hotkey';

interface Props {
  combination: string;
  onKeyDown: (event: KeyboardEvent, combination: string) => void;
  disabled?: boolean;
}

const inputTagNames = new Set(['INPUT', 'TEXTAREA', 'SELECT', 'OPTION']);

export function KeyboardShortcut({
  combination,
  onKeyDown,
  disabled = false,
}: Props) {
  const handler = useRef(onKeyDown);
  useEffect(() => {
    handler.current = onKeyDown;
  }, [onKeyDown]);

  useEffect(() => {
    if (disabled) {
      return;
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (
        event.target instanceof Element &&
        inputTagNames.has(event.target.tagName)
      ) {
        // do not activate single-letter keyboard shortcuts when user
        // is focused in a text field or another form control
        return;
      }
      if (isHotkey(combination, event)) {
        if (!handler.current) {
          return;
        }
        event.preventDefault();
        handler.current(event, combination);
      }
    }
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [combination, disabled]);
  return null;
}
