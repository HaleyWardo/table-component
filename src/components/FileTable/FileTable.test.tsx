import { fireEvent, render, screen} from "@testing-library/react";
import { File, FileTable } from "./FileTable";

const files: Array<File> = [
    {
      name: 'file-name-1',
      device: 'file-device-1',
      path: 'file-path-1',
      status: 'scheduled',
    },
    {
      name: 'file-name-2',
      device: 'file-device-2',
      path: 'file-path-2',
      status: 'available',
    },
];

  test('it renders no files found message', () => {
    render(<FileTable files={[]} />);
    expect(screen.getByText('No files found')).toBeInTheDocument();
  });

  test('it renders the files', () => {
    render(<FileTable files={files} />);

    files.forEach((file) => {
        const checkbox = screen.getByLabelText(`Select ${file.name}`);
        expect(checkbox).toBeInTheDocument();

        // Ensure checkbox is enabled when available and disabled when scheduled
        if (file.status === 'available') {
            expect(checkbox).toBeEnabled();
        } else {
            expect(checkbox).toBeDisabled();
        }

        expect(screen.getByText(file.name)).toBeInTheDocument();
        expect(screen.getByText(file.device)).toBeInTheDocument();
        expect(screen.getByText(file.path)).toBeInTheDocument();
        expect(screen.getByText(file.status)).toBeInTheDocument();
    })
  });

  test('it disables the download button when no items are selected', () => {
    render(<FileTable files={files} />);
    expect(screen.getByText('Download Selected')).toBeDisabled;
  });

  test('it enables the download button when items are selected', () => {
    render(<FileTable files={files} />);
    
    const downloadButton = screen.getByText('Download Selected');
    expect(downloadButton).toBeDisabled;
    fireEvent.click(screen.getByLabelText(`Select ${files[1].name}`));
    expect(downloadButton).toBeEnabled();
  });

  test('it calls onDownload when download button is clicked', () => {
    const onDownloadMock = jest.fn();
    render(<FileTable files={files} onDownload={onDownloadMock}/>);
    
    fireEvent.click(screen.getByLabelText(`Select ${files[1].name}`));
    fireEvent.click(screen.getByText('Download Selected'));
    expect(onDownloadMock).toHaveBeenCalledWith([files[1]]);
  });
