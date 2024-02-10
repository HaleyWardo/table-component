import { fireEvent, render, screen } from "@testing-library/react";
import { File, FileTable } from "./FileTable";

const files: File[] = [
  {
    name: "file-name-1",
    device: "file-device-1",
    path: "file-path-1",
    status: "scheduled",
  },
  {
    name: "file-name-2",
    device: "file-device-2",
    path: "file-path-2",
    status: "available",
  },
];

const multipleAvailableFiles: File[] = [
  ...files,
  {
    name: "file-name-3",
    device: "file-device-3",
    path: "file-path-3",
    status: "available",
  },
  {
    name: "file-name-4",
    device: "file-device-4",
    path: "file-path-4",
    status: "available",
  },
];

test("it renders no files found message", () => {
  render(<FileTable files={[]} />);
  expect(screen.getByText("No files found")).toBeInTheDocument();
});

test("it renders the files", () => {
  render(<FileTable files={files} />);

  files.forEach((file) => {
    const checkbox = screen.getByLabelText(`Select ${file.name}`);
    expect(checkbox).toBeInTheDocument();

    // Ensure checkbox is enabled when available and disabled when scheduled
    if (file.status === "available") {
      expect(checkbox).toBeEnabled();
    } else {
      expect(checkbox).toBeDisabled();
    }

    expect(screen.getByText(file.name)).toBeInTheDocument();
    expect(screen.getByText(file.device)).toBeInTheDocument();
    expect(screen.getByText(file.path)).toBeInTheDocument();
    expect(screen.getByText(file.status)).toBeInTheDocument();
  });
});

test("it selects file when checkbox is clicked", () => {
  render(<FileTable files={files} />);
  const checkbox = screen.getByLabelText(`Select ${files[1].name}`);
  fireEvent.click(checkbox);
  expect(checkbox).toBeChecked();
  fireEvent.click(screen.getByText("Selected 1"));
});

test("it selects file when row is clicked", () => {
  render(<FileTable files={files} />);
  fireEvent.click(screen.getByText(files[1].path));
  fireEvent.click(screen.getByText("Selected 1"));
});

test("it selects all available rows if select all is clicked and no rows are checked", () => {
  render(<FileTable files={multipleAvailableFiles} />);
  const [scheduled, ...availableCheckboxes] =
    screen.getAllByLabelText(/Select /);

  // Ensure all checkboxes are unchecked
  availableCheckboxes.forEach((checkbox) => {
    expect(checkbox).not.toBeChecked();
  });
  expect(scheduled).not.toBeChecked();

  // Click select all checkbox
  const selectAllCheckbox = screen.getByLabelText("None Selected");
  fireEvent.click(selectAllCheckbox);
  expect(selectAllCheckbox).toBeChecked();

  // Ensure available files are selected
  availableCheckboxes.forEach((checkbox) => {
    expect(checkbox).toBeChecked();
  });
  expect(screen.getByText(`Selected ${availableCheckboxes.length}`));
  // Ensure scheduled files aren't selected
  expect(scheduled).not.toBeChecked();
});

test("it disables the download button when no items are selected", () => {
  render(<FileTable files={files} />);
  expect(screen.getByText("Download Selected")).toBeDisabled;
});

test("it enables the download button when items are selected", () => {
  render(<FileTable files={files} />);
  const downloadButton = screen.getByText("Download Selected");
  expect(downloadButton).toBeDisabled;
  fireEvent.click(screen.getByLabelText(`Select ${files[1].name}`));
  expect(downloadButton).toBeEnabled();
});

test("it calls onDownload when download button is clicked", () => {
  const onDownloadMock = jest.fn();
  render(<FileTable files={files} onDownload={onDownloadMock} />);
  fireEvent.click(screen.getByLabelText(`Select ${files[1].name}`));
  fireEvent.click(screen.getByText("Download Selected"));
  expect(onDownloadMock).toHaveBeenCalledWith([files[1]]);
});
