import { File, FileTable } from "./components";

const files: File[] = [
  {
    name: "smss.exe",
    device: "Mario",
    path: "\\Device\\HarddiskVolume2\\Windows\\System32\\smss.exe",
    status: "scheduled",
  },
  {
    name: "netsh.exe",
    device: "Luigi",
    path: "\\Device\\HarddiskVolume2\\Windows\\System32\\netsh.exe",
    status: "available",
  },
  {
    name: "uxtheme.dll",
    device: "Peach",
    path: "\\Device\\HarddiskVolume1\\Windows\\System32\\uxtheme.dll",
    status: "available",
  },
  {
    name: "aries.sys",
    device: "Daisy",
    path: "\\Device\\HarddiskVolume1\\Windows\\System32\\aries.sys",
    status: "scheduled",
  },
  {
    name: "cryptbase.dll",
    device: "Yoshi",
    path: "\\Device\\HarddiskVolume1\\Windows\\System32\\cryptbase.dll",
    status: "scheduled",
  },
  {
    name: "7za.exe",
    device: "Toad",
    path: "\\Device\\HarddiskVolume1\\temp\\7za.exe",
    status: "scheduled",
  },
];

function App() {
  const handleOnDownload = (selectedFiles: File[]) => {
    if (!selectedFiles.length) return;

    let alertMessage = "Downloading these files:\n\n";

    selectedFiles.forEach((file) => {
      alertMessage += `* ${file.path} + ${file.device}\n`;
    });

    window.alert(alertMessage);
  };

  return <FileTable files={files} onDownload={handleOnDownload} />;
}

export default App;
