This project was created with [`create-react-app`](https://create-react-app.dev/).

## Getting Started

First, install dependencies:

```bash
npm install
```

Then run the development server:

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the app.

To run tests:

```bash
npm test
```

## Requirements

- Only those that have a status of "available" are currently able to be downloaded. Your implementation should manage this.
- The select-all checkbox should be in an unselected state if no items are selected.
- The select-all checkbox should be in a selected state if all items are selected.
- The select-all checkbox should be in an indeterminate state if some but not all items are selected.
- The "Selected 2" text should reflect the count of selected items and display "None Selected" when there are none selected.
- Clicking the select-all checkbox should select all items if none or some are selected.
- Clicking the select-all checkbox should de-select all items if all are currently selected.
- Status should be correctly formatted
- Clicking "Download Selected" when some or all items are displayed should generate an alert box with the path and device of all selected files.
- Precise/exact HTML formatting/styling to match the mockup is not required however rows should change colour when selected and on hover.

## Time Spent

- Friday
  - 11:00 AM - 1:00 PM
- Saturday
  - 1:30 PM - 3:30PM

## Improvements

- Address deprecated packages and vulnerabilities logged when installing dependencies
- Use Tailwind or Styled components
  - Current way isn't ideal. Right now I am styling by HTML tags and even though we have separate stylesheet files, they still get combined into one so we can override styles from any sheet.
  - By using Tailwind or Styled components those styles are only applied to that specific component
- Update Table component to handle dynamic data and render header and cells based on a configuration.

  ```
  const config = [
    {
      header: {
        label: 'Name',
      },
      cell: {
        content: (file: File) => file.name,
      },
    },
    {
      header: {
        label: 'Device',
      },
      cell: {
        content: (file: File) => file.device,
      },
    },
    {
      header: {
        label: 'path',
      },
      cell: {
        content: (file: File) => file.path,
      },
    },
    {
      header: {
        label: 'Name',
      },
      cell: {
        content: (file: File) => file.status,
        // can be used to capitalize
        className: 'status-custom-class',
      },
    },
  ]

  <Table data={files} config={config} />
  ```
