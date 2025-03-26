export const resizeImage = (file: File, size: number): Promise<File> => {
  return new Promise<File>((resolve, reject) => {
    const img = new Image();
    const objectURL = URL.createObjectURL(file);
    img.src = objectURL;

    img.onload = () => {
      // const size = 512;
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return reject("Canvas context not available");

      const aspectRatio = img.width / img.height;
      let newWidth = size;
      let newHeight = size;

      if (img.width > img.height) {
        newHeight = size / aspectRatio;
      } else {
        newWidth = size * aspectRatio;
      }

      canvas.width = size;
      canvas.height = size;

      // 이미지 그리기
      ctx.clearRect(0, 0, size, size);
      ctx.drawImage(
        img,
        (size - newWidth) / 2,
        (size - newHeight) / 2,
        newWidth,
        newHeight
      );

      // 캔버스에서 Blob으로 변환
      canvas.toBlob(
        (blob) => {
          if (!blob) return reject("Blob conversion failed");

          // Blob을 File 객체로 변환
          const resizedFile = new File([blob], file.name, {
            type: "image/png",
          });
          resolve(resizedFile);
        },
        "image/png",
        1 // 품질 (0 ~ 1)로 설정
      );
    };

    img.onerror = (error: any) => reject(error);
  });
};
