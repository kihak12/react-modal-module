# Modal Module (React)

A lightweight, typed React modal component you can drop into any application. It allows you to display a modal with an optional title, content text, and configurable action buttons.

## Features

- Zero configuration to get started
- Optional title and text content
- Confirm and Cancel buttons with customizable labels
- Callbacks for close, confirm, and cancel
- TypeScript types included
- CSS Modules styling bundled with the build

## Installation

Install from your project (ensure React and ReactDOM are installed as peer dependencies):

```bash
npm install modal-module-kihak12
```

This library targets React 19.

## Quick Start

```tsx
import React, { useState } from "react";
import { ModalComponent } from "modal-module-kihak12";

export default function Example() {
  const [open, setOpen] = useState(true);

  const handleClose = () => setOpen(false);
  const handleConfirm = () => {
    console.log("Confirmed");
    setOpen(false);
  };
  const handleCancel = () => {
    console.log("Cancelled");
    setOpen(false);
  };

  return (
    <div>
      <button onClick={() => setOpen(true)}>Open modal</button>

      {open && (
        <ModalComponent
          title="Action required"
          textContent="Do you confirm this action?"
          showConfirmButton
          confirmButtonText="Yes, confirm"
          showCancelButton
          cancelButtonText="No, cancel"
          onClose={handleClose}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
}
```

Note: The component renders itself when included. You control its visibility by conditionally rendering it in your app state (as in the example above).

## API

ModalComponent props:

- title?: string
- textContent?: string
- showConfirmButton?: boolean (default: true)
- confirmButtonText?: string (default: "Confirm")
- showCancelButton?: boolean (default: false)
- cancelButtonText?: string (default: "Cancel")
- onClose?: () => void
- onConfirm?: () => void
- onCancel?: () => void

Behavior notes:

- The Close button (X) triggers onClose.
- Confirm and Cancel buttons trigger onConfirm and onCancel respectively when shown.
- If you omit showCancelButton, only the Confirm button will be displayed by default.

## Styling

CSS Modules are bundled. The library includes default styles and layout. If you need to override styles, prefer wrapping the component and toggling visibility, or fork/customize the CSS if you own the library. Exposed class names are internal and may change, so overriding from outside is not guaranteed to be stable.

## Assets

The component references an icon at `/assets/close-x.svg` for the close button image. Ensure this asset exists and is served in your host application at that path, or replace it by forking the component and using your own icon.

## TypeScript

Type definitions are published with the package. Import paths work with both ESM and CJS environments:

- ESM: `import { ModalComponent } from 'modal-module-kihak12'`
- CJS: `const { ModalComponent } = require('modal-module-kihak12')`

## Development

Clone the repository and install dependencies:

```bash
npm install
```

Build the library:

```bash
npm run build
```

The build outputs to `dist/` with the following fields used by consumers:

- main: UMD bundle
- module: ESM bundle
- types: TypeScript declarations
- style: compiled CSS

## Troubleshooting

- The close icon does not display: make sure `/assets/close-x.svg` exists in your host app. Adjust the path or replace the asset as needed.
- Buttons not appearing: verify `showConfirmButton` and `showCancelButton` flags.
- Styles not applied: ensure your bundler handles CSS imports (Vite/CRA/Next.js typically do). The package declares CSS as sideEffects to prevent tree-shaking.

## License

ISC
