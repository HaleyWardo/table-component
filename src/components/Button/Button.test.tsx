import { render, screen } from "@testing-library/react";
import { Button } from "./Button";
import { Download } from "../Icons";

test("it renders button", () => {
  render(<Button>Download</Button>);
  const DownloadButton = screen.getByText("Download");
  expect(DownloadButton).toBeInTheDocument();
  expect(DownloadButton).toBeEnabled();
});

test("it disables button", () => {
  render(<Button disabled>Download</Button>);
  expect(screen.getByText("Download")).toBeDisabled();
});

test("it renders icon in button", () => {
  render(<Button icon={Download}>Download</Button>);
  expect(screen.getByText("Download").firstChild).toHaveAttribute(
    "data-icon",
    "Download",
  );
});
