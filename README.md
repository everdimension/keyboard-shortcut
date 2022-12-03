# KeyboardShortcut Component

[![GitHub](https://img.shields.io/github/license/everdimension/keyboard-shortcut)](LICENSE)

A handy React component that listens for keyboard combintaions (hotkeys) when mounted.

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
