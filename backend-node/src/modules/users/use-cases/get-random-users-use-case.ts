import axios from "axios";

export class GetRandomUsersUseCase {
  async execute() {
    const res = await axios.get("https://randomuser.me/api/?results=52");
    return res.data;
  }
}
