export const isValidImageUrl = (url: string): boolean => {
  console.log(1111111);
  try {
    const { protocol, pathname } = new URL(url);
    const validProtocols = ["http:", "https:", "ftp:"];
    const validExtensions = [
      ".jpg",
      ".jpeg",
      ".png",
      ".gif",
      ".bmp",
      ".svg",
      ".webp",
    ];

    const extension = pathname.toLowerCase().slice(pathname.lastIndexOf("."));
    console.log(
      "valid",
      validProtocols.includes(protocol) && validExtensions.includes(extension)
    );
    return (
      validProtocols.includes(protocol) && validExtensions.includes(extension)
    );
  } catch {
    console.log("Invalid URL format.");
    return false;
  }
};

export const getSum = (oneNumber: number, twoNumber: number) => {
  return oneNumber + twoNumber;
};
