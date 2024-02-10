import React from "react";
import { Button } from "../Button";
import { Checkbox } from "../Checkbox";
import { Download } from "../Icons";
import {
  Table,
  TableBody,
  TableDataCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../Table";
import "./FileTable.css";

enum Status {
  "AVAILABLE" = "available",
  "SCHEDULED" = "scheduled",
}

enum SelectAllState {
  "CHECKED" = "checked",
  "UNCHECKED" = "unchecked",
  "INDETERMINATE" = "indeterminate",
}

export interface File {
  name: string;
  device: string;
  path: string;
  status: "available" | "scheduled";
}

interface DataTableDownloadProps {
  files: File[];
  onDownload?: (selectedFiles: File[]) => void;
}

export const FileTable: React.FC<DataTableDownloadProps> = ({
  files,
  onDownload,
}) => {
  const [selectAllState, setSelectAllState] = React.useState<SelectAllState>(
    SelectAllState.UNCHECKED,
  );
  const [selectedFiles, setSelectedFiles] = React.useState<File[]>([]);

  React.useEffect(() => {
    const availableFiles = files?.filter(
      (option) => option.status === Status.AVAILABLE,
    );

    const isIndeterminate =
      selectedFiles.length > 0 && selectedFiles.length < availableFiles.length;

    if (isIndeterminate) {
      setSelectAllState(SelectAllState.INDETERMINATE);
      return;
    }

    if (selectedFiles.length === availableFiles.length) {
      setSelectAllState(SelectAllState.CHECKED);
    } else {
      setSelectAllState(SelectAllState.UNCHECKED);
    }
  }, [files, selectedFiles.length]);

  const handleOnIndeterminateChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const availableFiles = files.filter(
      (file) => file.status === Status.AVAILABLE,
    );

    // If select all is checked, check all options
    if (event.target.checked && selectedFiles.length >= 0) {
      setSelectedFiles(availableFiles);
    }

    // If select all is unchecked, uncheck all options
    if (
      !event.target.checked &&
      selectedFiles.length === availableFiles.length
    ) {
      setSelectedFiles([]);
    }
  };

  const handleToggleChecked = (checked: boolean, file: File) =>
    setSelectedFiles((previousFiles: File[]) => {
      if (checked) {
        return [...previousFiles, file];
      } else {
        return previousFiles?.filter((prevFile) => prevFile !== file);
      }
    });

  return (
    <div className="fileTable-container">
      <div className="fileTable-header">
        <Checkbox
          checked={selectAllState === SelectAllState.CHECKED}
          isIndeterminate={selectAllState === SelectAllState.INDETERMINATE}
          label={
            selectedFiles.length
              ? `Selected ${selectedFiles.length}`
              : "None Selected"
          }
          onChange={handleOnIndeterminateChange}
        />
        <Button
          disabled={!selectedFiles.length}
          icon={Download}
          onClick={() => onDownload?.(selectedFiles)}
        >
          Download Selected
        </Button>
      </div>

      <Table>
        <TableHead>
          <TableRow>
            {/* Spacer for checkbox column */}
            <TableHeader />
            <TableHeader>Name</TableHeader>
            <TableHeader>Device</TableHeader>
            <TableHeader>Path</TableHeader>
            <TableHeader>Status</TableHeader>
          </TableRow>
        </TableHead>

        <TableBody>
          {!!files.length ? (
            files.map((file) => {
              const checked = selectedFiles.includes(file);
              const isAvailable = file.status === Status.AVAILABLE;

              return (
                <TableRow
                  key={file.name}
                  onClick={
                    isAvailable
                      ? () => handleToggleChecked(!checked, file)
                      : undefined
                  }
                >
                  <TableDataCell>
                    <Checkbox
                      aria-label={`Select ${file.name}`}
                      checked={checked}
                      disabled={!isAvailable}
                      onChange={(event) =>
                        handleToggleChecked(event.target.checked, file)
                      }
                      // Stop row click event from being called
                      onClick={(event) => event.stopPropagation()}
                    />
                  </TableDataCell>
                  <TableDataCell>{file.name}</TableDataCell>
                  <TableDataCell>{file.device}</TableDataCell>
                  <TableDataCell>{file.path}</TableDataCell>
                  <TableDataCell className={`fileTable-status ${file.status}`}>
                    {file.status}
                  </TableDataCell>
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableDataCell colSpan={5}>No files found</TableDataCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
