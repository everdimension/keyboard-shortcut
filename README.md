# KeyboardShortcut Component

[![tests](https://github.com/everdimension/keyboard-shortcut-component/actions/workflows/node.js.yml/badge.svg)](https://github.com/everdimension/keyboard-shortcut-component/actions)
[![GitHub](https://img.shields.io/github/license/everdimension/keyboard-shortcut?color=brightgreen)](LICENSE)

A handy React component that listens for keyboard combinations (hotkeys) when mounted.

## Getting Started

### Install

```sh
npm install keyboard-shortcut-component

```

### Usage

Render `<KeyboardShortcut />` component when you want to listen to keyboard shortcuts:

```typescript
import { KeyboardShortcut } from 'keyboard-shortcut-component';

export function Component() {
  const [showDialog, setShowDialog] = useState(false);
  const openDialog = () => setShowDialog(true);
  const closeDialog = () => setShowDialog(false);
  return (
    <>
      <KeyboardShortcut combination="shift+k" onKeyDown={openDialog} />
      {showDialog ? (
        <>
          <KeyboardShortcut combination="esc" onKeyDown={closeDialog} />
          <SomeDialog />
        </>
      ) : null}
    </>
  );
}
```

## API

```jsx
<KeyboardShortcut
  combination="alt+shift+space"
  onKeyDown={(event: KeyboardEvent, combination: string) => void}
  disabled={false}
/>
```

### Props

```typescript
interface Props {
  combination: string;
  onKeyDown: (event: KeyboardEvent, combination: string) => void;
  disabled?: boolean;
}
```

## Credits

This library uses the awesome minimalistic [is-hotkey](https://github.com/ianstormtaylor/is-hotkey) package under the hood.
