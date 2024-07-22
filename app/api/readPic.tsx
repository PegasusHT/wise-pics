const T = require('tesseract.js');

export function readPic(file: File) {
  return new Promise<string>((resolve, reject) => {
    T.recognize(file)
      .then(({ data: { text } }: { data: { text: string } }) => {
        resolve(text);
      })
      .catch((error: any) => {
        reject(error);
      });
  });
}

// export function readPic(image: string) {
//   return new Promise<string>((resolve, reject) => {
//     T.recognize(image)
//       .then(({ data: { text } }: { data: { text: string } }) => {
//         resolve(text);
//       })
//       .catch((error: any) => {
//         reject(error);
//       });
//   });
// }