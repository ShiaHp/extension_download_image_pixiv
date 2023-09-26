const regex = /access-control-allow-origin/i;

export const removeMatchingHeaders = (
  headers: chrome.webRequest.HttpHeader[],
  regex: RegExp
) => {
  for (let i = 0, header; (header = headers[i]); i++) {
    if (header.name.match(regex)) {
      headers.splice(i, 1);
      return;
    }
  }
}

export const responseListener = (
  details: chrome.webRequest.WebResponseHeadersDetails
) => {
  removeMatchingHeaders(details.responseHeaders!, regex);
  details.responseHeaders!.push({
    name: "access-control-allow-origin",
    value: "*",
  });
}


export const something = (blob) => {
  return URL.createObjectURL(blob);
}
