import { getLocalStorage } from "@/lib/utils";

function getUser() {
  const user = getLocalStorage();
  return { user };
}

export default getUser;
