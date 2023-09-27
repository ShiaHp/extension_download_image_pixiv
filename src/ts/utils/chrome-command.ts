export class ChromeCommand {
  static closeTab(data) {
    chrome.tabs.query({}, (tabs) => {
      for (let i = 1; i <= data; i++) {
        chrome.tabs.remove(tabs[tabs.length - i].id);
      }
    });
  };

  static reloadExtension() {
    chrome.runtime.requestUpdateCheck(() => {
      chrome.runtime.reload();
    });
  };

  static downloadFileName(url, filename) {
    chrome.downloads.download({
      url: url,
      filename: `downloadFromPixiv/${filename}/pixiv-${Date.now()}.filename`,
      conflictAction: 'overwrite',
      saveAs: false,
    });
  };

  static handleRequest(request) {
    const data = request.data || 1;

    const functionStrategies = {
      Close: ChromeCommand.closeTab,
      reloadextension: ChromeCommand.reloadExtension,
      downloadfilename: ChromeCommand.downloadFileName,
    };

    if (request.notification) {
      const selectedFunction = functionStrategies[request.notification];
      if (selectedFunction) {
        selectedFunction(request.url, request.filename, data);
      }
    }
  };

  static sendMessage(notification: string, url: string, filename: string, data: unknown) {
    chrome.runtime.sendMessage({
      notification: notification,
      url: url,
      filename: filename,
      data: data,
    });
  };

  static closeExtensionRequired(msg) {
    if (msg !== 'undifined') {
      chrome.runtime.sendMessage({ notification: "Close" });
    }
  };

  static sendDownload(url: string, filename: unknown) {
   return chrome.runtime.sendMessage({
      notification: "downloadfilename",
      url: url,
      filename: filename,
    });
  }
}
