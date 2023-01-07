import axios from "axios";

export class GetCatImageByStatusCodeUseCase {
  async execute(code: number) {
    const res = await axios.get(`https://http.cat/${code}`, {
      responseType: "arraybuffer",
    });

    return Buffer.from(res.data).toString("base64");
  }
}
