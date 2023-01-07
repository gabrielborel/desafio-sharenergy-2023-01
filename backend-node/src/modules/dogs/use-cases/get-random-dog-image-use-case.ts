import axios from "axios";

export class GetRandomDogImageUseCase {
  async execute() {
    const res = await axios.get("https://random.dog/woof?filter=mp4,webm");
    return res.data;
  }
}
