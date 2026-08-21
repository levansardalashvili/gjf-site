// ატვირთვამდე, ბრაუზერშივე ამცირებს ფოტოს — თუ ძალიან დიდია (რეზოლუციით ან ზომით),
// გარეშე სერვისების/პაკეტების გარეშე, Canvas API-ით.
// PDF/DOC/XLS და მისთ. არ ეხება — მხოლოდ ფოტოებს.
const MAX_DIMENSION = 1920; // გრძელი მხარე მაქსიმუმ ამდენი px
const QUALITY = 0.82;

export function compressImage(file) {
  return new Promise((resolve) => {
    if (!file.type.startsWith("image/") || file.type === "image/svg+xml") {
      resolve(file);
      return;
    }

    const img = new Image();
    const reader = new FileReader();

    reader.onload = (e) => {
      img.onload = () => {
        let { width, height } = img;
        if (width > MAX_DIMENSION || height > MAX_DIMENSION) {
          if (width > height) {
            height = Math.round((height * MAX_DIMENSION) / width);
            width = MAX_DIMENSION;
          } else {
            width = Math.round((width * MAX_DIMENSION) / height);
            height = MAX_DIMENSION;
          }
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (!blob || blob.size >= file.size) {
              // შემცირებამ არ გააუმჯობესა — ორიგინალი დავტოვოთ
              resolve(file);
              return;
            }
            const compressedFile = new File([blob], file.name, { type: "image/jpeg" });
            resolve(compressedFile);
          },
          "image/jpeg",
          QUALITY
        );
      };
      img.onerror = () => resolve(file); // შეცდომისას ორიგინალი ავტვირთოთ
      img.src = e.target.result;
    };
    reader.onerror = () => resolve(file);
    reader.readAsDataURL(file);
  });
}
