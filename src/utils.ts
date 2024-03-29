export const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const fetchWithTimeout = async (
  url: string,
  options: RequestInit = {},
  timeout: number = 1000
): Promise<Response> => {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  const response = await fetch(url, {
    ...options,
    signal: controller.signal,
  });
  clearTimeout(id);
  return response;
};

export const calcAge = (birthDate: string): number => {
  try {
    // birthDate format: YYMMDD
    const curYear = new Date().getFullYear().toString().substring(2, 4);
    const yearPost = parseInt(birthDate.substring(0, 2));
    const year =
      yearPost < parseInt(curYear) ? 2000 + yearPost : 1900 + yearPost;
    const month = parseInt(birthDate.substring(2, 4)) - 1; // Month is 0-indexed in JavaScript Date
    const day = parseInt(birthDate.substring(4, 6));

    // Create a new Date object for the birth date
    const birthDateObj = new Date(year, month, day);

    // Get the current date
    const currentDate = new Date();

    // Calculate the difference in years
    let age = currentDate.getFullYear() - birthDateObj.getFullYear();

    // Adjust the age if the current date is before the birth date
    if (
      currentDate.getMonth() < month ||
      (currentDate.getMonth() === month && currentDate.getDate() < day)
    ) {
      age--;
    }

    if (isNaN(age)) return 0;

    return age;
  } catch (e) {
    return 0;
  }
};

export const getSex = (socialNum2: string): string => {
  // socialNum2 format: 1/2/3/4
  switch (socialNum2.substring(0, 1)) {
    case "1":
    case "3":
      return "M";
    case "2":
    case "4":
      return "F";
    default:
      return "X";
  }
};

export function readFile(file: File) {
  return new Promise((resolve, reject) => {
    const fr = new FileReader();
    fr.onload = () => {
      resolve(fr.result);
    };
    fr.onerror = reject;
    fr.readAsDataURL(file);
  });
}
